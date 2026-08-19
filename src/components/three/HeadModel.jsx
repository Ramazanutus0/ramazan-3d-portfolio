import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MathUtils } from 'three'

useGLTF.preload('/models/head.glb')

// Hız sabitleri
const LERP_SCROLL = 0.062  // scroll hedefini takip etme hızı
const LERP_DRAG   = 0.32   // sürükleme sırasında anlık tepki
const LERP_RETURN = 0.058  // bırakıldığında sinematik açıya dönüş hızı
const LERP_POS    = 0.072  // pozisyon/scale geçiş hızı

export default function HeadModel({ mousePos, scrollState }) {
  const { scene } = useGLTF('/models/head.glb')
  const { size }  = useThree()

  const posGroup = useRef(null)   // scroll-driven position & scale
  const rotGroup = useRef(null)   // rotation (scroll + mouse + drag)

  // ── Drag orbit state ──────────────────────────────────────
  const drag = useRef({
    active:   false,
    lastX:    0,
    lastY:    0,
    extraY:   0,   // Y-ekseninde birikmiş drag rotasyonu
    extraX:   0,   // X-ekseninde birikmiş drag rotasyonu
    extraZ:   0,
  })

  // ── Smooth mouse tracking (ayrı lerp — scroll'dan bağımsız hız) ──
  const mouseSmooth = useRef({ x: 0, y: 0 })

  // ── Göz kırpma state ──────────────────────────────────────
  const blink = useRef({ next: Date.now() + blinkDelay(), phase: 0 })

  // ── Drag: window event listeners ──────────────────────────
  useEffect(() => {
    const onDown = (e) => {
      if (e.button !== 0) return
      // Buton/link/input tıklamalarında drag başlatma
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) return
      drag.current.active = true
      drag.current.lastX  = e.clientX
      drag.current.lastY  = e.clientY
      document.body.style.cursor = 'grabbing'
    }
    const onMove = (e) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.lastX
      const dy = e.clientY - drag.current.lastY
      drag.current.extraY += dx * 0.007
      drag.current.extraX += dy * 0.004
      // ±1.8 rad limitliyor — modelin kafası arkasına geçmesin
      drag.current.extraX = Math.max(-1.8, Math.min(1.8, drag.current.extraX))
      drag.current.extraY = Math.max(-2.5, Math.min(2.5, drag.current.extraY))
      drag.current.lastX = e.clientX
      drag.current.lastY = e.clientY
    }
    const onUp = () => {
      drag.current.active = false
      document.body.style.cursor = ''
    }

    // Touch
    const onTouchStart = (e) => {
      const t = e.touches[0]
      drag.current.active = true
      drag.current.lastX  = t.clientX
      drag.current.lastY  = t.clientY
    }
    const onTouchMove = (e) => {
      if (!drag.current.active || e.touches.length !== 1) return
      const t = e.touches[0]
      const dx = t.clientX - drag.current.lastX
      const dy = t.clientY - drag.current.lastY
      // Yatay drag → Y rotasyon, dikey drag → X rotasyon
      if (Math.abs(dx) > Math.abs(dy)) e.preventDefault()
      drag.current.extraY += dx * 0.007
      drag.current.extraX += dy * 0.004
      drag.current.lastX = t.clientX
      drag.current.lastY = t.clientY
    }
    const onTouchEnd = () => { drag.current.active = false }

    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('touchend',   onTouchEnd)

    // Grab cursor hint
    document.body.style.cursor = 'grab'

    return () => {
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
      document.body.style.cursor = ''
    }
  }, [])

  // ── MorphDebugger ─────────────────────────────────────────
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh && node.morphTargetDictionary) {
        console.group(`[MorphDebugger] ${node.name}`)
        console.table(node.morphTargetDictionary)
        console.groupEnd()
      }
    })
  }, [scene])

  // ── Per-frame animation loop ──────────────────────────────
  useFrame((_, delta) => {
    if (!posGroup.current || !rotGroup.current) return

    const ss = scrollState?.current ?? {}
    const mx = mousePos?.current   ?? { x: 0, y: 0 }
    const d  = drag.current

    // ── Üç kırılım noktası: phone / tablet / desktop ──────
    // Canvas z-0 olduğundan metin ALWAYS z-20'de — overlap riski yok.
    // Buradaki ayarlar modelin GÖRSEL konumunu belirliyor.
    const w = size.width
    const isPhone  = w < 640
    const isTablet = w >= 640 && w < 1024

    // ── 1. Pozisyon & Scale ───────────────────────────────
    const tX = isPhone  ? 0
             : isTablet ? 0.06
             :            (ss.modelX ?? 0.28)

    const tY = isPhone  ? 0.08   // hafif yukarı — alt kısımda metin okunabilir
             : isTablet ? 0.0
             :            (ss.modelY ?? -0.04)

    // Scale: küçük ekranlarda orantılı küçül
    const baseScale = ss.modelScale ?? 0.72
    const tS = isPhone  ? Math.max(0.20, baseScale * 0.40)
             : isTablet ? Math.max(0.28, baseScale * 0.60)
             :            baseScale

    posGroup.current.position.x = MathUtils.lerp(posGroup.current.position.x, tX, LERP_POS)
    posGroup.current.position.y = MathUtils.lerp(posGroup.current.position.y, tY, LERP_POS)
    posGroup.current.scale.setScalar(
      MathUtils.lerp(posGroup.current.scale.x, tS, LERP_POS)
    )

    // ── 2. Drag extra rotation → sıfıra dön (bırakıldığında) ──
    if (!d.active) {
      d.extraY = MathUtils.lerp(d.extraY, 0, LERP_RETURN)
      d.extraX = MathUtils.lerp(d.extraX, 0, LERP_RETURN)
      d.extraZ = MathUtils.lerp(d.extraZ, 0, LERP_RETURN)
    }

    // ── 3. Hedef rotasyon = Scroll + Mouse follow + Drag ──
    // Mouse: ayrı hızlı lerp (0.18) ile takip → scroll'un yavaş lerp'inden bağımsız
    // Drag aktifken mouse follow devre dışı
    const ms = mouseSmooth.current
    ms.x = MathUtils.lerp(ms.x, d.active ? 0 : mx.x, 0.18)
    ms.y = MathUtils.lerp(ms.y, d.active ? 0 : mx.y, 0.18)
    const mouseInfluenceY = ms.x * 0.22   // artırıldı: 0.12 → 0.22
    const mouseInfluenceX = -ms.y * 0.12  // artırıldı: 0.07 → 0.12

    const finalRotY = (ss.targetRotY ?? 0.0) + mouseInfluenceY + d.extraY
    const finalRotX = (ss.targetRotX ?? 0.0) + mouseInfluenceX + d.extraX
    const finalRotZ = (ss.targetRotZ ?? 0.0)  + d.extraZ

    // Scroll değerleri değiştiğinde hızlı lerp, mouse follow yavaş lerp
    const lf = d.active ? LERP_DRAG : LERP_SCROLL
    rotGroup.current.rotation.y = MathUtils.lerp(rotGroup.current.rotation.y, finalRotY, lf)
    rotGroup.current.rotation.x = MathUtils.lerp(rotGroup.current.rotation.x, finalRotX, lf)
    rotGroup.current.rotation.z = MathUtils.lerp(rotGroup.current.rotation.z, finalRotZ, lf)

    // ── 4. Göz kırpma ─────────────────────────────────────
    const now = Date.now()
    const bl  = blink.current
    if (bl.phase === 0 && now >= bl.next) bl.phase = 1

    if (bl.phase !== 0) {
      scene.traverse((node) => {
        if (!node.isMesh || !node.morphTargetDictionary) return
        const dict = node.morphTargetDictionary
        const inf  = node.morphTargetInfluences
        const KEYS = [
          'eyeBlinkLeft','eyeBlinkRight',
          'EyeBlinkLeft','EyeBlinkRight',
          'blink','Blink','eyeClosed','EyeClosed',
          'eye_blink_L','eye_blink_R',
        ]
        let found = false
        for (const k of KEYS) {
          if (dict[k] !== undefined) {
            found = true
            const spd = delta * 9
            if (bl.phase === 1) {
              inf[dict[k]] = Math.min(1, inf[dict[k]] + spd)
              if (inf[dict[k]] >= 1) bl.phase = 2
            } else {
              inf[dict[k]] = Math.max(0, inf[dict[k]] - spd)
              if (inf[dict[k]] <= 0) { bl.phase = 0; bl.next = Date.now() + blinkDelay() }
            }
          }
        }
        if (!found) {
          const isEye = ['eye','Eye','eyes','Eyes','eyeball']
            .some(n => node.name.toLowerCase().includes(n.toLowerCase()))
          if (isEye) {
            const target = bl.phase === 1 ? 0.04 : 1
            node.scale.y = MathUtils.lerp(node.scale.y, target, delta * 9)
            if (bl.phase === 1 && node.scale.y < 0.08) bl.phase = 2
            if (bl.phase === 2 && node.scale.y > 0.92) { bl.phase = 0; bl.next = Date.now() + blinkDelay() }
          }
        }
      })
    }
  })

  return (
    <group ref={posGroup}>
      <group ref={rotGroup}>
        <primitive object={scene} position={[0, -0.42, 0]} />
      </group>
    </group>
  )
}

function blinkDelay() {
  return 2200 + Math.random() * 3800
}
