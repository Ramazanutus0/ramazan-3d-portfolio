import { useState } from 'react'
import { useContent } from '../../../context/ContentContext'
import { Field, Textarea, SaveBtn, sectionWrap, heading, label as lbl } from '../adminUI'

export default function AboutEditor() {
  const { content, updateSection } = useContent()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(content.about)))
  const [saved, setSaved] = useState(false)

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false) }

  const setParagraph = (i, val) => {
    const p = [...form.paragraphs]
    p[i] = val
    setForm(f => ({ ...f, paragraphs: p }))
    setSaved(false)
  }

  const setFact = (i, key, val) => {
    const facts = form.facts.map((f, idx) => idx === i ? { ...f, [key]: val } : f)
    setForm(f => ({ ...f, facts }))
    setSaved(false)
  }

  const save = () => {
    updateSection('about', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div style={sectionWrap}>
      <p style={heading}>Hakkımda (About)</p>

      <Field label="Section Label" value={form.label} onChange={v => set('label', v)} />
      <Textarea label="Başlık (\\n ile satır kır)" value={form.heading} rows={2} onChange={v => set('heading', v)} />

      <p style={{ ...lbl, marginTop: '1.5rem' }}>Paragraflar</p>
      {form.paragraphs.map((p, i) => (
        <Textarea key={i} label={`Paragraf ${i + 1}`} value={p} rows={3} onChange={v => setParagraph(i, v)} />
      ))}

      <p style={{ ...lbl, marginTop: '1.5rem' }}>Bilgi Kartları (Fact Grid)</p>
      {form.facts.map((fact, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Field label={`Kart ${i + 1} — Etiket`} value={fact.label} onChange={v => setFact(i, 'label', v)} />
          <Field label={`Kart ${i + 1} — Değer`}  value={fact.value} onChange={v => setFact(i, 'value', v)} />
        </div>
      ))}

      <SaveBtn saved={saved} onClick={save} />
    </div>
  )
}
