import { useRef, useState, Suspense, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMouseTracker } from './hooks/useMouseTracker'
import Scene from './components/three/Scene'
import Preloader from './components/ui/Preloader'
import Navbar from './components/ui/Navbar'
import MarqueeStrip from './components/ui/MarqueeStrip'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

gsap.registerPlugin(ScrollTrigger)

// ─── Shared mutable state ─────────────────────────────────────────────────
// GSAP scrub her frame'de mutate eder → useFrame okur
export const scrollState = {
  modelX:      0.28,
  modelY:     -0.04,
  modelScale:  0.72,
  // Hero başlangıç: kafa kameraya dönük (0,0,0)
  // Fine-tune: eğer gerçek tarayıcıda hâlâ yan bakıyorsa
  // targetRotY'yi ±0.1 adımlarla ayarla (- sola, + sağa döndürür)
  targetRotX:  0.0,
  targetRotY:  0.0,
  targetRotZ:  0.0,
}

export default function App() {
  const mousePos = useMouseTracker()
  const scrollRef = useRef(scrollState)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    ScrollTrigger.refresh()

    const ss = scrollRef.current

    // ── Hero → About ─────────────────────────────────────────────────────
    // Sağ profil + yukarı bakış  (Y: 0 → 1.55 ≈ 89°)
    gsap.fromTo(ss,
      { targetRotY:  0.0,  targetRotX:  0.0,  targetRotZ:  0.0,
        modelX: 0.28, modelScale: 0.72 },
      { targetRotY:  1.55, targetRotX: -0.55, targetRotZ:  0.22,
        modelX: 0.42, modelScale: 0.62,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top 85%', end: 'top 10%', scrub: true },
      }
    )

    // ── About → Projects ─────────────────────────────────────────────────
    // Sol taklası — toplamda ~183° Y dönüşü (sinematik somersault)
    gsap.fromTo(ss,
      { targetRotY:  1.55, targetRotX: -0.55, targetRotZ:  0.22,
        modelX: 0.42, modelScale: 0.62 },
      { targetRotY: -1.48, targetRotX:  0.38, targetRotZ: -0.30,
        modelX: -0.12, modelScale: 0.52,
        ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top 85%', end: 'top 10%', scrub: true },
      }
    )

    // ── Projects → Contact ───────────────────────────────────────────────
    // Merkeze döner, güçlü yukarı bakış
    gsap.fromTo(ss,
      { targetRotY: -1.48, targetRotX:  0.38, targetRotZ: -0.30,
        modelX: -0.12, modelScale: 0.52 },
      { targetRotY:  0.18, targetRotX: -0.72, targetRotZ:  0.16,
        modelX:  0.04, modelScale: 0.42,
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 10%', scrub: true },
      }
    )

    return () => ScrollTrigger.killAll()
  }, [loaded])

  return (
    <>
      {/* ── Preloader ─────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <Preloader onLoaded={() => setLoaded(true)} />
      </Suspense>

      {/* ── 3D Canvas — ARKA PLAN (z-0) ──────────────────────────────
          Metin katmanı z-20'de olduğu için metin HER ZAMAN önde.
          Hero section'da bg yok → model canvas'tan görünür (editorial).
          Diğer sectionlarda rgba bg → model arkada hafifçe hissedilir.
          pointer-events:none → tüm click/scroll içerik katmanına geçer.
          Drag: window listener'lar ile HeadModel.jsx'te yakalanıyor.
      ──────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <Scene mousePos={mousePos} scrollState={scrollRef} />
        </Suspense>
      </div>

      {/* ── Navbar — tüm katmanların üzerinde (z-80) ─────────────── */}
      <Navbar visible={loaded} />

      {/* ── Scrollable content — ÖN PLAN (z-20) ─────────────────── */}
      <main style={{ position: 'relative', zIndex: 20 }}>
        <Hero visible={loaded} />

        <MarqueeStrip
          items={['SOFTWARE DEVELOPER', '42 ÉCOLE', 'TECH ENTREPRENEUR', 'FULL STACK']}
          direction="left"
        />

        <About />

        <MarqueeStrip
          items={['SAFIR STORE', 'RANDEVOPRO', 'JEWELRY E-COMMERCE', 'OPEN SOURCE']}
          direction="right"
        />

        <Projects />
        <Contact />
      </main>
    </>
  )
}
