import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/ContentContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { content } = useContent()
  const ct = content.contact
  const secRef   = useRef(null)
  const labelRef = useRef(null)
  const h2Ref    = useRef(null)
  const subRef   = useRef(null)
  const ctaRef   = useRef(null)
  const socialRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      const t80 = { trigger: secRef.current, start: 'top 80%' }
      const t75 = { trigger: secRef.current, start: 'top 75%' }
      const t70 = { trigger: secRef.current, start: 'top 70%' }

      // Label: sol üst köşesinden tam ekran dışından
      gsap.from(labelRef.current, {
        x: isMobile ? '-70vw' : '-90vw',
        y: isMobile ? '-3vh' : '-10vh',
        opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: t80,
      })

      // Başlık: SOL ÜST köşesinden tam ekran dışından — en dramatik
      gsap.from(h2Ref.current, {
        x: isMobile ? '-100vw' : '-120vw',
        y: isMobile ? '-8vh' : '-22vh',
        opacity: 0,
        rotation: isMobile ? -1.5 : -3.5,
        duration: 1.15, delay: 0.06, ease: 'power3.out',
        scrollTrigger: t80,
      })

      // Alt metin: aşağıdan basit
      gsap.from(subRef.current, {
        y: 30, opacity: 0, duration: 0.8, delay: 0.18, ease: 'power3.out',
        scrollTrigger: t75,
      })

      // CTA: sağ üstten ekran dışından
      gsap.from(ctaRef.current, {
        x: isMobile ? '70vw' : '90vw',
        y: isMobile ? '-4vh' : '-8vh',
        opacity: 0, duration: 0.85, delay: 0.24, ease: 'power3.out',
        scrollTrigger: t75,
      })

      // Social + footer: basit aşağıdan
      gsap.from([socialRef.current, footerRef.current], {
        y: 22, opacity: 0, stagger: 0.1, duration: 0.7, delay: 0.35, ease: 'power3.out',
        scrollTrigger: t70,
      })
    }, secRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={secRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(6rem,10vh,9rem) clamp(2rem,7vw,6rem)',
        background: 'var(--bg-section-deep)',
        transition: 'background 0.4s',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow — very subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 45% at 50% 50%, var(--radial-glow) 0%, transparent 70%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
        <span
          ref={labelRef}
          className="font-inter"
          style={{
            fontSize: '0.65rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            display: 'block', marginBottom: '2rem',
          }}
        >
          {ct.label}
        </span>

        <h2
          ref={h2Ref}
          className="font-syne"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.04em', color: 'var(--text-primary)',
            whiteSpace: 'pre-line', transition: 'color 0.4s',
          }}
        >
          {ct.heading}
        </h2>

        <p
          ref={subRef}
          className="font-inter"
          style={{
            marginTop: '1.75rem', fontSize: '0.95rem',
            fontWeight: 300, lineHeight: 1.7, color: 'var(--text-muted)',
          }}
        >
          {ct.sub}
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginTop: '2.5rem' }}>
          <a
            href={`mailto:${ct.email}`}
            className="font-syne"
            style={{
              display: 'inline-block',
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--cta-color)', background: 'var(--cta-bg)',
              padding: '0.9rem 2.4rem',
              textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cta-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--cta-bg)' }}
          >
            {ct.email}
          </a>
        </div>

        {/* Social */}
        <div
          ref={socialRef}
          style={{
            marginTop: '3.5rem', display: 'flex',
            justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap',
          }}
        >
          {ct.socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-inter"
              style={{
                fontSize: '0.72rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--text-darker)',
                textDecoration: 'none', transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-darker)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p
          ref={footerRef}
          className="font-inter"
          style={{
            marginTop: '5rem', fontSize: '0.65rem',
            letterSpacing: '0.12em', color: 'var(--text-darkest)',
          }}
        >
          {ct.footer}
        </p>
      </div>
    </section>
  )
}
