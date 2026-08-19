import { useState } from 'react'
import { useContent } from '../../../context/ContentContext'
import { Field, Textarea, SaveBtn, sectionWrap, heading } from '../adminUI'

const emptyProject = () => ({
  id:    Date.now().toString(),
  num:   '',
  title: '',
  sub:   '',
  stack: '',
  desc:  '',
  link:  '',
})

export default function ProjectsEditor() {
  const { content, updateSection } = useContent()
  const [projects, setProjects] = useState(JSON.parse(JSON.stringify(content.projects)))
  const [editIdx, setEditIdx]   = useState(null)   // null = list view, number = edit view
  const [editForm, setEditForm] = useState(null)
  const [saved, setSaved]       = useState(false)

  const saveAll = (list) => {
    // num alanlarını sıraya göre güncelle
    const numbered = list.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }))
    setProjects(numbered)
    updateSection('projects', numbered)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const openEdit = (idx) => {
    setEditIdx(idx)
    setEditForm({ ...(idx === 'new' ? emptyProject() : projects[idx]) })
  }

  const cancelEdit = () => { setEditIdx(null); setEditForm(null) }

  const saveEdit = () => {
    if (editIdx === 'new') {
      saveAll([...projects, editForm])
    } else {
      const next = projects.map((p, i) => i === editIdx ? editForm : p)
      saveAll(next)
    }
    cancelEdit()
  }

  const deleteProject = (idx) => {
    if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) return
    saveAll(projects.filter((_, i) => i !== idx))
  }

  const setField = (key, val) => setEditForm(f => ({ ...f, [key]: val }))

  // ── Edit form ──
  if (editIdx !== null) return (
    <div style={sectionWrap}>
      <p style={heading}>{editIdx === 'new' ? 'Yeni Proje Ekle' : 'Projeyi Düzenle'}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <Field label="Proje Adı"  value={editForm.title} onChange={v => setField('title', v)} />
        <Field label="Alt Başlık" value={editForm.sub}   onChange={v => setField('sub', v)} />
      </div>
      <Field   label="Teknoloji Stack (· ile ayır)" value={editForm.stack} onChange={v => setField('stack', v)} />
      <Textarea label="Açıklama" value={editForm.desc} rows={3} onChange={v => setField('desc', v)} />
      <Field   label="Proje Linki (opsiyonel)" value={editForm.link} onChange={v => setField('link', v)} />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <SaveBtn saved={false} onClick={saveEdit} label="Kaydet" />
        <button
          onClick={cancelEdit}
          style={{
            background: 'none', border: '1px solid var(--admin-input-border)', color: 'var(--admin-text-dim)',
            padding: '0.7rem 1.4rem', cursor: 'pointer', fontSize: '0.72rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}
        >
          İptal
        </button>
      </div>
    </div>
  )

  // ── Project list ──
  return (
    <div style={sectionWrap}>
      <p style={heading}>Projeler (Work)</p>

      {projects.map((p, i) => (
        <div
          key={p.id}
          style={{
            borderTop: '1px solid var(--admin-border)', padding: '1.1rem 0',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
          }}
        >
          <span style={{ color: 'var(--admin-text-dimmer)', fontSize: '0.72rem', paddingTop: '0.15rem', minWidth: 22 }}>{p.num}</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--admin-text)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{p.title}</p>
            <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.78rem', margin: '0.2rem 0 0' }}>{p.sub}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <ActionBtn label="Düzenle" onClick={() => openEdit(i)} />
            <ActionBtn label="Sil" danger onClick={() => deleteProject(i)} />
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => openEdit('new')}
          style={{
            background: 'none', border: '1px solid var(--admin-input-focus)', color: 'var(--admin-text)',
            padding: '0.65rem 1.4rem', cursor: 'pointer',
            fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}
        >
          + Yeni Proje Ekle
        </button>
      </div>

      {saved && <p style={{ color: '#30d158', fontSize: '0.78rem', marginTop: '1rem' }}>✓ Kaydedildi</p>}
    </div>
  )
}

function ActionBtn({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: `1px solid ${danger ? '#3a1010' : 'var(--admin-input-border)'}`,
        color: danger ? '#ff453a' : 'var(--admin-text-dim)',
        padding: '0.35rem 0.75rem', cursor: 'pointer',
        fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = danger ? '#ff453a' : 'var(--admin-input-focus)'; e.currentTarget.style.color = danger ? '#ff6b6b' : 'var(--admin-text)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = danger ? '#3a1010' : 'var(--admin-input-border)'; e.currentTarget.style.color = danger ? '#ff453a' : 'var(--admin-text-dim)' }}
    >
      {label}
    </button>
  )
}
