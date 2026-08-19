import { useState } from 'react'
import { useContent } from '../../../context/ContentContext'
import { Field, Textarea, SaveBtn, sectionWrap, heading } from '../adminUI'

export default function HeroEditor() {
  const { content, updateSection } = useContent()
  const [form, setForm] = useState({ ...content.hero })
  const [saved, setSaved] = useState(false)

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setSaved(false)
  }

  const save = () => {
    updateSection('hero', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div style={sectionWrap}>
      <p style={heading}>Ana Sayfa (Hero)</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <Field label="Ad" value={form.name}    onChange={v => set('name', v)} />
        <Field label="Soyad" value={form.surname} onChange={v => set('surname', v)} />
      </div>

      <Field label="Unvan / Title" value={form.title} onChange={v => set('title', v)} />
      <Textarea label="Tagline (açıklama)" value={form.tagline} rows={3} onChange={v => set('tagline', v)} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <Field label="Birincil Buton" value={form.ctaPrimary}   onChange={v => set('ctaPrimary', v)} />
        <Field label="İkincil Buton"  value={form.ctaSecondary} onChange={v => set('ctaSecondary', v)} />
      </div>

      <SaveBtn saved={saved} onClick={save} />
    </div>
  )
}
