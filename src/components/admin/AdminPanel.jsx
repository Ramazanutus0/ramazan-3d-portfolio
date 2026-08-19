import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { useTheme } from '../../context/ThemeContext'
import HeroEditor    from './editors/HeroEditor'
import AboutEditor   from './editors/AboutEditor'
import ProjectsEditor from './editors/ProjectsEditor'
import ContactEditor  from './editors/ContactEditor'

const TABS = [
  { id: 'hero',     label: 'Hero' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
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
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M12 9.6C10.9 11.1 9.1 12 7 12C3.7 12 1 9.3 1 6C1 3.7 2.3 1.7 4.2 0.7C3.3 1.7 2.8 3 2.8 4.5C2.8 7.8 5.4 10.4 8.7 10.4C9.9 10.4 11 10 11.9 9.3L12 9.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('hero')
  const { resetContent } = useContent()
  const { theme, toggleTheme } = useTheme()

  const handleReset = () => {
    if (window.confirm('Tüm içerik varsayılan değerlere döndürülsün mü? Bu işlem geri alınamaz.')) {
      resetContent()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--admin-bg)', fontFamily: "'Inter', system-ui, sans-serif", transition: 'background 0.4s' }}>

      {/* Header */}
      <header style={{
        height: 52, borderBottom: '1px solid var(--admin-border-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', position: 'sticky', top: 0, background: 'var(--admin-bg)', zIndex: 100,
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.35em',
          textTransform: 'uppercase', color: 'var(--admin-text)',
          fontFamily: "'Syne', system-ui, sans-serif", transition: 'color 0.4s',
        }}>
          R · U  Admin
        </span>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--admin-text-dim)', display: 'flex', alignItems: 'center',
              padding: '4px', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-text-dim)')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <span style={{ color: 'var(--admin-border)' }}>|</span>
          <a
            href="/"
            style={{
              fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--admin-text-dim)', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-text-dim)')}
          >
            ← Siteye Dön
          </a>
          <span style={{ color: 'var(--admin-border)' }}>|</span>
          <button
            onClick={onLogout}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--admin-text-dim)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ff453a')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-text-dim)')}
          >
            Çıkış
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>

        {/* Sidebar */}
        <nav style={{
          width: 200, borderRight: '1px solid var(--admin-border-soft)',
          padding: '1.5rem 0', flexShrink: 0,
          position: 'sticky', top: 52, height: 'calc(100vh - 52px)',
          overflowY: 'auto', transition: 'border-color 0.4s',
        }}>
          <p style={{
            fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--admin-text-dimmer)', padding: '0 1.25rem', marginBottom: '0.75rem',
          }}>
            Bölümler
          </p>

          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: activeTab === tab.id ? 'var(--admin-active-bg)' : 'none',
                border: 'none', borderLeft: activeTab === tab.id ? '2px solid var(--admin-text)' : '2px solid transparent',
                padding: '0.7rem 1.25rem',
                color: activeTab === tab.id ? 'var(--admin-text)' : 'var(--admin-text-dim)',
                fontSize: '0.78rem', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--admin-hover)' }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--admin-text-dim)' }}
            >
              {tab.label}
            </button>
          ))}

          <div style={{ marginTop: '2rem', padding: '1.5rem 1.25rem 0', borderTop: '1px solid var(--admin-border-soft)' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'none', border: '1px solid #2a1010', color: '#ff453a',
                padding: '0.5rem 0.75rem', cursor: 'pointer', width: '100%',
                fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}
            >
              Varsayılana Sıfırla
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: '2.5rem 2.75rem', overflowY: 'auto' }}>
          {activeTab === 'hero'     && <HeroEditor />}
          {activeTab === 'about'    && <AboutEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'contact'  && <ContactEditor />}
        </main>
      </div>
    </div>
  )
}
