// ===== Login Page =====
// Simulated authentication against mock user data.

import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useData } from '../hooks/useData.js'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import './Auth.css'

export default function Login() {
  const { login, user } = useAuth()
  const { users } = useData()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      const dashboards = { student: '/student', instructor: '/instructor', admin: '/admin' }
      navigate(dashboards[user.role], { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate auth check
    setTimeout(() => {
      const found = users.find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
      )

      if (found) {
        login(found)
        const dashboards = { student: '/student', instructor: '/instructor', admin: '/admin' }
        const from = location.state?.from
        navigate(from || dashboards[found.role], { replace: true })
      } else {
        setError('Invalid email or password. Try the demo accounts below.')
      }
      setLoading(false)
    }, 500)
  }

  const fillDemo = (role) => {
    const accounts = {
      student: { email: 'student@example.com', password: 'student123' },
      instructor: { email: 'instructor@example.com', password: 'instructor123' },
      admin: { email: 'admin@example.com', password: 'admin123' },
    }
    setEmail(accounts[role].email)
    setPassword(accounts[role].password)
    setError('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Login to your EduTrack account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="auth-demo">
          <p className="auth-demo__label">Quick login (demo accounts):</p>
          <div className="auth-demo__buttons">
            <button className="auth-demo__btn auth-demo__btn--student" onClick={() => fillDemo('student')}>
              Student
            </button>
            <button className="auth-demo__btn auth-demo__btn--instructor" onClick={() => fillDemo('instructor')}>
              Instructor
            </button>
            <button className="auth-demo__btn auth-demo__btn--admin" onClick={() => fillDemo('admin')}>
              Admin
            </button>
          </div>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}
