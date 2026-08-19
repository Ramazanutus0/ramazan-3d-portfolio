import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MarqueeStrip({ items, direction = 'left' }) {
  const wrapRef = useRef(null)
  const text = items.join('  ·  ') + '  ·  '

  useEffect(() => {
    if (!wrapRef.current) return
    gsap.from(wrapRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 92%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        overflow: 'hidden',
        borderTop:    '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1.6rem 0',
        userSelect: 'none',
        transition: 'border-color 0.4s',
      }}
    >
      <div
        className={direction === 'right' ? 'marquee-rev' : 'marquee-fwd'}
        style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-syne"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--wmark-strong)',
              paddingRight: '3rem',
              lineHeight: 1,
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
