import { useState } from 'react'
import AdminLogin from '../components/admin/AdminLogin'
import AdminPanel from '../components/admin/AdminPanel'

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('ru_admin_authed') === '1'
  )

  const handleLogout = () => {
    sessionStorage.removeItem('ru_admin_authed')
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
  return <AdminPanel onLogout={handleLogout} />
}
