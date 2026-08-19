import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { label: 'About',   href: '#about'    },
  { label: 'Work',    href: '#projects' },
  { label: 'Contact', href: '#contact'  },
]

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.35"/>
      <line x1="7.5" y1="0.5"  x2="7.5"  y2="2.8"  stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="7.5" y1="12.2" x2="7.5"  y2="14.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="0.5" y1="7.5"  x2="2.8"  y2="7.5"  stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="12.2" y1="7.5" x2="14.5" y2="7.5"  stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="2.7"  y1="2.7"  x2="4.4"  y2="4.4"  stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="10.6" y1="10.6" x2="12.3" y2="12.3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="12.3" y1="2.7"  x2="10.6" y2="4.4"  stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <line x1="4.4"  y1="10.6" x2="2.7"  y2="12.3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M12 9.6C10.9 11.1 9.1 12 7 12C3.7 12 1 9.3 1 6C1 3.7 2.3 1.7 4.2 0.7C3.3 1.7 2.8 3 2.8 4.5C2.8 7.8 5.4 10.4 8.7 10.4C9.9 10.4 11 10 11.9 9.3L12 9.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Navbar({ visible }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!visible) return
    gsap.fromTo(navRef.current,
      { y: -48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, delay: 0.6, ease: 'power3.out' }
    )
  }, [visible])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem clamp(1.5rem, 4vw, 3rem)',
        opacity: 0,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : 'none',
        transition: 'background 0.4s, border-bottom 0.4s',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-syne"
        style={{
          fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--text-primary)', textDecoration: 'none',
          transition: 'color 0.4s',
        }}
      >
        R·U
      </a>

      {/* Nav links + theme toggle */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0 }}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => go(e, href)}
                className="font-inter"
                style={{
                  fontSize: '0.72rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 0.22s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle — güneş (dark→light) / ay (light→dark) */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
          style={{
            marginLeft: '2rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px', lineHeight: 1,
            transition: 'color 0.22s, transform 0.35s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.transform = 'rotate(18deg) scale(1.18)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  )
}
