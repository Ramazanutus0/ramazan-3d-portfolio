import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import App from './App.jsx'
import AdminPage from './pages/AdminPage.jsx'

const isAdmin = window.location.pathname === '/admin' ||
                window.location.pathname.startsWith('/admin/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ContentProvider>
        {isAdmin ? <AdminPage /> : <App />}
      </ContentProvider>
    </ThemeProvider>
  </StrictMode>,
)
