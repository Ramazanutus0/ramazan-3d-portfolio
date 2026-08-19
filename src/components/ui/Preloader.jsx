import { useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onLoaded }) {
  const { progress, active } = useProgress()
  const containerRef    = useRef(null)
  const barRef          = useRef(null)
  const pctRef          = useRef(null)
  const didHide         = useRef(false)

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { width: `${progress}%`, duration: 0.35, ease: 'power2.out' })
    }
    if (pctRef.current) pctRef.current.textContent = `${Math.round(progress)}`
  }, [progress])

  useEffect(() => {
    if (!active && progress === 100 && !didHide.current) {
      didHide.current = true
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.7,
        delay: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = 'none'
          onLoaded?.()
        },
      })
    }
  }, [active, progress, onLoaded])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-body)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Logo mark */}
      <p
        className="font-syne"
        style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: 'var(--text-darker)', marginBottom: '3rem', textTransform: 'uppercase' }}
      >
        Ramazan Utuş
      </p>

      {/* Progress track */}
      <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div
            ref={barRef}
            style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: 0,
              background: 'var(--text-primary)',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-inter" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--text-darker)', textTransform: 'uppercase' }}>
            Loading
          </span>
          <span className="font-syne" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span ref={pctRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  )
}
