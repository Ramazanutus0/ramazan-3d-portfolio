import { createContext, useContext, useState } from 'react'
import { defaultContent } from '../content/defaultContent'

const STORAGE_KEY = 'ru_portfolio_content_v1'

const ContentContext = createContext(null)

function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultContent
    const saved = JSON.parse(raw)
    // Deep merge: eğer defaultContent'te yeni alanlar eklendiyse eksik kalmasın
    return {
      hero:     { ...defaultContent.hero,     ...saved.hero },
      about:    { ...defaultContent.about,    ...saved.about,
                  paragraphs: saved.about?.paragraphs ?? defaultContent.about.paragraphs,
                  facts:      saved.about?.facts      ?? defaultContent.about.facts },
      projects: saved.projects ?? defaultContent.projects,
      contact:  { ...defaultContent.contact,  ...saved.contact,
                  socials: saved.contact?.socials ?? defaultContent.contact.socials },
    }
  } catch {
    return defaultContent
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent)

  // Tek bir section'ı güncelle + localStorage'a kaydet
  const updateSection = (section, data) => {
    setContent(prev => {
      const next = { ...prev, [section]: data }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  // Tüm içeriği fabrika ayarlarına döndür
  const resetContent = () => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(defaultContent)
  }

  return (
    <ContentContext.Provider value={{ content, updateSection, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
