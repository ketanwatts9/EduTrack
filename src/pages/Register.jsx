// ===== Register Page =====
// Simulated registration — creates a student account in localStorage.

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useData } from '../hooks/useData.js'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import './Auth.css'

export default function Register() {
  const { login, user } = useAuth()
  const { users, addUser } = useData()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/student', { replace: true })
  }, [user, navigate])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const emailLower = form.email.trim().toLowerCase()
    if (users.some((u) => u.email === emailLower)) {
      setError('An account with this email already exists.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const newUser = {
        id: `u-stu-${Date.now()}`,
        name: form.name.trim(),
        email: emailLower,
        password: form.password,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=2563eb&color=fff`,
        joinedDate: new Date().toISOString().split('T')[0],
      }
      addUser(newUser)
      login(newUser)
      navigate('/student', { replace: true })
      setLoading(false)
    }, 500)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join EduTrack and start learning today</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            label="Full Name"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="At least 6 characters"
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Re-enter password"
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}
