import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HeadModel from './HeadModel'
import { useTheme } from '../../context/ThemeContext'

export default function Scene({ mousePos, scrollState }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <Canvas
      camera={{ position: [0, 0.08, 2.4], fov: 46 }}
      gl={{ antialias: true, alpha: true, toneMapping: 4 /* ACESFilmic */, toneMappingExposure: 1.2 }}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      style={{ background: 'transparent' }}
    >
      {/*
        ──────────────────────────────────────────────────────────────────
        SİNEMATİK STÜDYO IŞIĞI  —  Neon split-lighting setup
        ──────────────────────────────────────────────────────────────────
        KURAL:   beyaz ışık yok  —  sadece mor + altın + minimum fill
        HEDEF:   yüz hatları, sakal, gözlük detayları ön plana çıksın
                 kafa döndükçe ışık yansımaları gerçekçi kayışsın
        ──────────────────────────────────────────────────────────────────
      */}

      {/* Ambient: dark'ta neredeyse sıfır; light'ta artırılıyor ki model kararmısın */}
      <ambientLight intensity={isLight ? 0.55 : 0.04} />

      {/* ── SOL:  MOR / NEON MAGENTA ────────────────────────────────── */}
      {/* Key light — güçlü, yüzün sol yarısını boyuyor */}
      <pointLight
        position={[-2.0, 1.2, 2.2]}
        intensity={9}
        color="#9018e8"
        distance={9}
        decay={2}
      />
      {/* Fill — mor'u aşağıya ve saca yayıyor */}
      <pointLight
        position={[-3.2, -0.8, 1.0]}
        intensity={3.5}
        color="#6008b0"
        distance={7}
        decay={2}
      />
      {/* Hair rim — saçın üstünden vuran sert mor kenar */}
      <directionalLight
        position={[-2.5, 3.5, -0.5]}
        intensity={1.2}
        color="#c030ff"
      />

      {/* ── SAĞ:  ALTIN / NEON SARI ──────────────────────────────────── */}
      {/* Key light — sıcak altın, yüzün sağ yarısını tutuyor */}
      <pointLight
        position={[2.0, 0.8, 2.2]}
        intensity={7.5}
        color="#e09800"
        distance={9}
        decay={2}
      />
      {/* Fill — altını sakal ve boğaza yayıyor */}
      <pointLight
        position={[3.2, -0.6, 1.0]}
        intensity={3.0}
        color="#b07200"
        distance={7}
        decay={2}
      />
      {/* Directional — saçta sıcak altın parlaması */}
      <directionalLight
        position={[3.0, 2.5, 0.5]}
        intensity={0.9}
        color="#f0b000"
      />

      {/* ── Üst arka rim: silueti siyahtan ayırıyor ─────────────────── */}
      <directionalLight
        position={[0, 5, -2]}
        intensity={0.65}
        color="#d8d8ff"    /* hafif mavi-beyaz — soğuk kontrast */
      />

      {/* ── Önden çok hafif fill: tamamen siyah gitmemesi için ────────── */}
      <pointLight
        position={[0, -0.3, 4.5]}
        intensity={0.18}
        color="#ffffff"
        distance={6}
        decay={2}
      />

      <Suspense fallback={null}>
        <HeadModel mousePos={mousePos} scrollState={scrollState} />
      </Suspense>
    </Canvas>
  )
}
