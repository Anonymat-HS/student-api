import { useState } from 'react'
import Login from './components/Login'
import StudentList from './components/StudentList'
import './App.css'

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  function handleLogin(newToken: string) {
    setToken(newToken)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student API</h1>
        <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
      </header>
      <StudentList />
    </div>
  )
}

export default App
