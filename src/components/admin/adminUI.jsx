// Paylaşılan admin UI primitifleri — Apple minimalist, tema-duyarlı (CSS variables)

export const label = {
  display: 'block', fontSize: '0.62rem', letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'var(--admin-text-dim)', marginBottom: '0.4rem',
  fontFamily: "'Inter', system-ui, sans-serif",
}

const inputBase = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  background: 'var(--admin-input-bg)', border: '1px solid var(--admin-input-border)',
  color: 'var(--admin-text)', fontSize: '0.88rem', fontFamily: "'Inter', system-ui, sans-serif",
  padding: '0.65rem 0.85rem', outline: 'none',
  transition: 'border-color 0.15s, background 0.4s, color 0.4s',
  marginBottom: '1.1rem',
}

export const sectionWrap = {
  maxWidth: 680, padding: '0.25rem 0',
  fontFamily: "'Inter', system-ui, sans-serif",
}

export const heading = {
  fontSize: '1rem', fontWeight: 600, color: 'var(--admin-text)',
  margin: '0 0 1.75rem',
  fontFamily: "'Syne', system-ui, sans-serif",
  letterSpacing: '-0.01em',
  transition: 'color 0.4s',
}

export function Field({ label: labelText, value, onChange, placeholder }) {
  return (
    <div>
      <span style={label}>{labelText}</span>
      <input
        style={inputBase}
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={e  => (e.target.style.borderColor = 'var(--admin-input-focus)')}
        onBlur={e   => (e.target.style.borderColor = 'var(--admin-input-border)')}
      />
    </div>
  )
}

export function Textarea({ label: labelText, value, onChange, rows = 3 }) {
  return (
    <div>
      <span style={label}>{labelText}</span>
      <textarea
        style={{ ...inputBase, resize: 'vertical', minHeight: `${rows * 1.55 + 1.3}rem` }}
        value={value ?? ''}
        rows={rows}
        onChange={e => onChange(e.target.value)}
        onFocus={e  => (e.target.style.borderColor = 'var(--admin-input-focus)')}
        onBlur={e   => (e.target.style.borderColor = 'var(--admin-input-border)')}
      />
    </div>
  )
}

export function SaveBtn({ saved, onClick, label: lbl = 'Değişiklikleri Kaydet' }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: saved ? '#1a3a1a' : 'var(--cta-bg)',
        color: saved ? '#30d158' : 'var(--cta-color)',
        border: saved ? '1px solid #30d158' : 'none',
        padding: '0.75rem 1.75rem', cursor: 'pointer',
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        fontFamily: "'Syne', system-ui, sans-serif",
        transition: 'all 0.2s',
        marginTop: '1.5rem',
      }}
      onMouseEnter={e => { if (!saved) e.currentTarget.style.background = 'var(--cta-hover)' }}
      onMouseLeave={e => { if (!saved) e.currentTarget.style.background = 'var(--cta-bg)' }}
    >
      {saved ? '✓ Kaydedildi' : lbl}
    </button>
  )
}
