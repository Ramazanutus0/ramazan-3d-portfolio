import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/ContentContext'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { content } = useContent()
  const ab = content.about
  const secRef   = useRef(null)
  const labelRef = useRef(null)
  const h2Ref    = useRef(null)
  const bodyRef  = useRef(null)
  const factsRef = useRef(null)
  // Watermark fly-in
  const wmarkRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      const trigger72 = { trigger: secRef.current, start: 'top 72%' }
      const trigger68 = { trigger: secRef.current, start: 'top 68%' }

      // Watermark: sağdan çapraz olarak giriyor (sol üstten sağ alta)
      gsap.from(wmarkRef.current, {
        x: isMobile ? '-30vw' : '-55vw',
        y: isMobile ? 0 : '-8vh',
        opacity: 0, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 82%' },
      })

      // "About" label: sağ üstten çapraz fırlıyor
      gsap.from(labelRef.current, {
        x: isMobile ? '70vw' : '90vw',
        y: isMobile ? '-4vh' : '-12vh',
        opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 80%' },
      })

      // Ana başlık: SAĞ ÜST köşesinden sol alta tam ekran dışından fırlıyor
      gsap.from(h2Ref.current, {
        x: isMobile ? '100vw' : '115vw',
        y: isMobile ? '-6vh' : '-20vh',
        opacity: 0,
        rotation: isMobile ? 1.5 : 4.0,
        duration: 1.1, delay: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
      })

      // Body paragraflar: basit aşağıdan yukarı
      gsap.from(bodyRef.current, {
        y: 28, opacity: 0, duration: 0.85, delay: 0.22, ease: 'power3.out',
        scrollTrigger: trigger72,
      })

      // Fact grid: staggered aşağıdan
      gsap.from(factsRef.current?.children ?? [], {
        y: 22, opacity: 0, stagger: 0.1, duration: 0.7, delay: 0.35, ease: 'power3.out',
        scrollTrigger: trigger68,
      })
    }, secRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={secRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(6rem,10vh,9rem) clamp(2rem,7vw,6rem)',
        background: 'var(--bg-section)',
        overflow: 'hidden',
        transition: 'background 0.4s',
      }}
    >
      {/* Watermark background text */}
      <div
        ref={wmarkRef}
        className="font-syne"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', left: '-2vw',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem,22vw,22rem)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          color: 'var(--wmark)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        ABOUT
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540 }}>
        <span
          ref={labelRef}
          className="font-inter"
          style={{
            fontSize: '0.65rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            display: 'block', marginBottom: '1.5rem',
          }}
        >
          {ab.label}
        </span>

        <h2
          ref={h2Ref}
          className="font-syne"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line',
            transition: 'color 0.4s',
          }}
        >
          {ab.heading}
        </h2>

        <div
          ref={bodyRef}
          className="font-inter"
          style={{
            marginTop: '2rem',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.75,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: 420,
          }}
        >
          {ab.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Fact grid */}
        <div
          ref={factsRef}
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem 3rem',
          }}
        >
          {ab.facts.map(({ label, value }) => (
            <div key={label} style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', transition: 'border-color 0.4s' }}>
              <p className="font-inter"
                 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                {label}
              </p>
              <p className="font-syne"
                 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', transition: 'color 0.4s' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
