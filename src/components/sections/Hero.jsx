import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useContent } from '../../context/ContentContext'

export default function Hero({ visible }) {
  const { content } = useContent()
  const h = content.hero
  const lineRef     = useRef(null)
  const nameRef     = useRef(null)
  const titleRef    = useRef(null)
  const taglineRef  = useRef(null)
  const ctaRef      = useRef(null)
  const hintRef     = useRef(null)
  const dragHintRef = useRef(null)

  const [isSmall, setIsSmall] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsSmall(window.innerWidth < 768)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    if (!visible) return

    const tl = gsap.timeline({ delay: 0.7 })

    tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.65, ease: 'power2.inOut' }
      )
      .fromTo(nameRef.current,
        { x: isSmall ? -80 : -65, y: isSmall ? 30 : 90, opacity: 0, rotation: -2.5 },
        { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(titleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(taglineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.55'
      )
      .fromTo(ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.45'
      )

    if (!isSmall) {
      tl.fromTo(hintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.2'
        )
        .fromTo(dragHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.6'
        )

      gsap.to(hintRef.current, {
        y: 7, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', delay: 2.8,
      })
    }
  }, [visible, isSmall])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 7vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'min(540px, 100%)' }}>
        {/* Thin horizontal rule */}
        <div
          ref={lineRef}
          style={{ height: 1, width: 48, background: 'var(--text-primary)', marginBottom: '1.5rem', opacity: 0.3, transition: 'background 0.4s' }}
        />

        {/* Ad */}
        <h1
          ref={nameRef}
          className="font-syne"
          style={{
            fontSize: 'clamp(2.6rem, 7.5vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.90,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            opacity: 0,
            transition: 'color 0.4s',
          }}
        >
          {h.name}
          <br />
          {h.surname}
        </h1>

        {/* Unvan */}
        <p
          ref={titleRef}
          className="font-syne"
          style={{
            marginTop: '1.25rem',
            fontSize: 'clamp(0.62rem, 1.1vw, 0.85rem)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            opacity: 0,
            transition: 'color 0.4s',
          }}
        >
          {h.title}
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-inter"
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'var(--text-dim)',
            maxWidth: 380,
            opacity: 0,
            transition: 'color 0.4s',
          }}
        >
          {h.tagline}
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            marginTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <a
            href="#projects"
            onClick={scrollTo('#projects')}
            className="font-syne"
            style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--cta-color)', background: 'var(--cta-bg)',
              padding: '0.7rem 1.6rem', textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cta-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--cta-bg)' }}
          >
            {h.ctaPrimary}
          </a>

          <a
            href="#about"
            onClick={scrollTo('#about')}
            className="font-inter"
            style={{
              fontSize: '0.72rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-dim)',
              textDecoration: 'none', transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            {h.ctaSecondary} ↓
          </a>
        </div>
      </div>

      {/* Drag hint */}
      {!isSmall && (
        <div
          ref={dragHintRef}
          style={{
            position: 'absolute', right: '3rem', bottom: '2.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            opacity: 0,
          }}
        >
          <span
            className="font-inter"
            style={{
              fontSize: '0.58rem', letterSpacing: '0.3em', color: 'var(--text-darker)',
              textTransform: 'uppercase', writingMode: 'vertical-rl',
              transition: 'color 0.4s',
            }}
          >
            Drag to orbit
          </span>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(var(--text-darker), transparent)' }} />
        </div>
      )}

      {/* Scroll hint */}
      {!isSmall && (
        <div
          ref={hintRef}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            opacity: 0,
          }}
        >
          <span
            className="font-inter"
            style={{
              fontSize: '0.58rem', letterSpacing: '0.35em',
              color: 'var(--text-darker)', textTransform: 'uppercase',
              transition: 'color 0.4s',
            }}
          >
            Scroll
          </span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(var(--text-darker), transparent)' }} />
        </div>
      )}
    </section>
  )
}
