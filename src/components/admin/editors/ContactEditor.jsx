import { useState } from 'react'
import { useContent } from '../../../context/ContentContext'
import { Field, Textarea, SaveBtn, sectionWrap, heading, label as lbl } from '../adminUI'

export default function ContactEditor() {
  const { content, updateSection } = useContent()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(content.contact)))
  const [saved, setSaved] = useState(false)

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false) }

  const setSocial = (i, key, val) => {
    const socials = form.socials.map((s, idx) => idx === i ? { ...s, [key]: val } : s)
    setForm(f => ({ ...f, socials }))
    setSaved(false)
  }

  const addSocial = () => {
    setForm(f => ({ ...f, socials: [...f.socials, { label: '', href: '' }] }))
    setSaved(false)
  }

  const removeSocial = (i) => {
    setForm(f => ({ ...f, socials: f.socials.filter((_, idx) => idx !== i) }))
    setSaved(false)
  }

  const save = () => {
    updateSection('contact', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div style={sectionWrap}>
      <p style={heading}>İletişim (Contact)</p>

      <Field label="Section Label" value={form.label} onChange={v => set('label', v)} />
      <Textarea label="Başlık (\\n ile satır kır)" value={form.heading} rows={2} onChange={v => set('heading', v)} />
      <Textarea label="Alt Metin" value={form.sub} rows={2} onChange={v => set('sub', v)} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <Field label="E-posta Adresi" value={form.email}  onChange={v => set('email', v)} />
        <Field label="Footer Metni"   value={form.footer} onChange={v => set('footer', v)} />
      </div>

      <p style={{ ...lbl, marginTop: '1.75rem' }}>Sosyal Medya Linkleri</p>

      {form.socials.map((social, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-end' }}>
          <Field label={`Platform ${i + 1}`} value={social.label} onChange={v => setSocial(i, 'label', v)} />
          <Field label="URL"                  value={social.href}  onChange={v => setSocial(i, 'href', v)} />
          <button
            onClick={() => removeSocial(i)}
            style={{
              background: 'none', border: '1px solid #3a1010', color: '#ff453a',
              padding: '0.68rem 0.75rem', cursor: 'pointer', fontSize: '0.75rem',
              marginBottom: 0,
            }}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addSocial}
        style={{
          background: 'none', border: '1px solid var(--admin-input-focus)', color: 'var(--admin-text)',
          padding: '0.55rem 1.1rem', cursor: 'pointer',
          fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          marginTop: '0.5rem',
        }}
      >
        + Platform Ekle
      </button>

      <SaveBtn saved={saved} onClick={save} />
    </div>
  )
}
