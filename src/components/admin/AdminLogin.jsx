import { useState } from 'react'

// Güvenlik notu: Bu şifre production'da environment variable'a taşınmalı
const CREDENTIALS = { username: 'ramazan', password: 'rU.admin2026' }

const s = {
  page: {
    minHeight: '100vh', background: 'var(--admin-bg)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: 'background 0.4s',
  },
  card: {
    width: '100%', maxWidth: 360,
    background: 'var(--admin-card)', border: '1px solid var(--admin-border)',
    padding: '2.5rem',
    transition: 'background 0.4s, border-color 0.4s',
  },
  logo: {
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.35em',
    textTransform: 'uppercase', color: 'var(--admin-text)',
    marginBottom: '2.5rem', display: 'block',
    fontFamily: "'Syne', system-ui, sans-serif",
  },
  label: {
    display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em',
    textTransform: 'uppercase', color: 'var(--admin-text-dim)', marginBottom: '0.5rem',
  },
  input: {
    display: 'block', width: '100%', boxSizing: 'border-box',
    background: 'var(--admin-input-bg)', border: '1px solid var(--admin-input-border)',
    color: 'var(--admin-text)', fontSize: '0.9rem',
    padding: '0.7rem 0.9rem', marginBottom: '1.25rem',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%', background: 'var(--cta-bg)', color: 'var(--cta-color)',
    border: 'none', padding: '0.8rem', cursor: 'pointer',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em',
    textTransform: 'uppercase',
    fontFamily: "'Syne', system-ui, sans-serif",
    transition: 'background 0.2s',
  },
  err: {
    fontSize: '0.75rem', color: '#ff453a', marginTop: '1rem', textAlign: 'center',
  },
}

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      form.username.trim() === CREDENTIALS.username &&
      form.password === CREDENTIALS.password
    ) {
      sessionStorage.setItem('ru_admin_authed', '1')
      onLogin()
    } else {
      setError('Kullanıcı adı veya şifre hatalı.')
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <span style={s.logo}>R · U  Admin</span>
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Kullanıcı Adı</label>
          <input
            style={s.input}
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            onFocus={e => (e.target.style.borderColor = 'var(--admin-input-focus)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--admin-input-border)')}
          />
          <label style={s.label}>Şifre</label>
          <input
            style={s.input}
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={e => (e.target.style.borderColor = 'var(--admin-input-focus)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--admin-input-border)')}
          />
          <button
            style={s.btn}
            type="submit"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--cta-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--cta-bg)')}
          >
            Giriş Yap
          </button>
          {error && <p style={s.err}>{error}</p>}
        </form>
      </div>
    </div>
  )
}
