import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/ContentContext'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const { content } = useContent()
  const projects = content.projects
  const secRef  = useRef(null)
  const wmarkRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      // Watermark: sağdan çapraz (sağ üsten sol alta)
      gsap.from(wmarkRef.current, {
        x: isMobile ? '30vw' : '55vw',
        y: isMobile ? 0 : '-10vh',
        opacity: 0, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 82%' },
      })

      // "Selected Work" label + "Projects" başlığı: SOL ÜST köşesinden tam ekran dışından
      gsap.from('.proj-header', {
        x: isMobile ? '-100vw' : '-120vw',
        y: isMobile ? '-5vh' : '-18vh',
        opacity: 0,
        rotation: isMobile ? -1.5 : -4.0,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
      })

      // Proje kalemleri: alternatif diagonal — tam ekran dışından geliyorlar
      projects.forEach((_, i) => {
        const fromRight = i % 2 === 0
        gsap.from(`.proj-item-${i}`, {
          x: fromRight
            ? (isMobile ? '80vw' : '100vw')
            : (isMobile ? '-80vw' : '-100vw'),
          y: isMobile ? '4vh' : '10vh',
          opacity: 0,
          rotation: isMobile
            ? (fromRight ? 1.0 : -1.0)
            : (fromRight ? 2.0 : -2.0),
          duration: 0.85, delay: i * 0.10,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.proj-item-${i}`, start: 'top 90%' },
        })
      })
    }, secRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={secRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'clamp(6rem,10vh,9rem) clamp(2rem,7vw,6rem)',
        background: 'var(--bg-section)',
        transition: 'background 0.4s',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div
        ref={wmarkRef}
        className="font-syne"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', right: '-2vw',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(7rem,20vw,20rem)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          color: 'var(--wmark)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        WORK
      </div>

      {/* Header */}
      <div className="proj-header" style={{ marginBottom: '4rem' }}>
        <span
          className="font-inter"
          style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '1.2rem' }}
        >
          Selected Work
        </span>
        <h2
          className="font-syne"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--text-primary)', transition: 'color 0.4s' }}
        >
          Projects
        </h2>
      </div>

      {/* Project list */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {projects.map((p, i) => (
          <ProjectItem key={p.num} {...p} idx={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectItem({ num, title, sub, stack, desc, idx }) {
  const itemRef = useRef(null)

  return (
    <div
      ref={itemRef}
      className={`project-item proj-item-${idx}`}
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2.2rem 0',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2.5rem' }}>
        {/* Number */}
        <span
          className="font-syne"
          style={{
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.15em', color: 'var(--text-darker)',
            paddingTop: '0.3rem', flexShrink: 0,
          }}
        >
          {num}
        </span>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3
              className="proj-title font-syne"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-muted)',
                lineHeight: 1,
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {title}
            </h3>
            <span
              className="font-inter"
              style={{ fontSize: '0.7rem', color: 'var(--text-darker)', letterSpacing: '0.1em', flexShrink: 0 }}
            >
              {stack}
            </span>
          </div>

          <p
            className="font-inter"
            style={{
              marginTop: '0.6rem',
              fontSize: '0.8rem', letterSpacing: '0.05em',
              textTransform: 'uppercase', color: 'var(--text-dim)',
            }}
          >
            {sub}
          </p>

          <p
            className="font-inter"
            style={{ marginTop: '0.9rem', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: 520 }}
          >
            {desc}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="proj-line"
        style={{ height: 1, background: 'var(--proj-line)', marginTop: '2.2rem', transition: 'opacity 0.3s, background 0.4s' }}
      />
    </div>
  )
}
