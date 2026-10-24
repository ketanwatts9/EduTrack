// ===== Login Page =====
// Simulated authentication against mock user data.
// Uses the reusable useForm hook + validation strategies.

import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useData } from '../hooks/useData.js'
import { useForm } from '../hooks/useForm.js'
import { required, isEmail } from '../utils/validation.js'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import './Auth.css'

export default function Login() {
  const { login, user } = useAuth()
  const { users } = useData()
  const navigate = useNavigate()
  const location = useLocation()

  const validate = (values) => {
    const errors = {}
    const emailErr = required(values.email, 'Email')
    if (emailErr) errors.email = emailErr
    else {
      const emailValid = isEmail(values.email)
      if (emailValid) errors.email = emailValid
    }

    const passErr = required(values.password, 'Password')
    if (passErr) errors.password = passErr

    return errors
  }

  const { values, errors, handleChange, handleBlur, setFieldValue, validateAll } = useForm({
    initialValues: { email: '', password: '' },
    validate,
  })

  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      const dashboards = { student: '/student', instructor: '/instructor', admin: '/admin' }
      navigate(dashboards[user.role], { replace: true })
    }
  }, [user, navigate])

  const fillDemo = (role) => {
    const accounts = {
      student: { email: 'student@example.com', password: 'student123' },
      instructor: { email: 'instructor@example.com', password: 'instructor123' },
      admin: { email: 'admin@example.com', password: 'admin123' },
    }
    setFieldValue('email', accounts[role].email)
    setFieldValue('password', accounts[role].password)
    setFormError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!validateAll()) return

    setLoading(true)

    // Simulate auth check
    setTimeout(() => {
      const found = users.find(
        (u) => u.email === values.email.trim().toLowerCase() && u.password === values.password
      )

      if (found) {
        login(found)
        const dashboards = { student: '/student', instructor: '/instructor', admin: '/admin' }
        const from = location.state?.from
        navigate(from || dashboards[found.role], { replace: true })
      } else {
        setFormError('Invalid email or password. Try the demo accounts below.')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Login to your EduTrack account</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <InputField
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          {formError && <p className="auth-error">{formError}</p>}

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
