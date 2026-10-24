// ===== Register Page =====
// Simulated registration — creates a student account in localStorage.
// Uses the reusable useForm hook + validation strategies.

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useData } from '../hooks/useData.js'
import { useForm } from '../hooks/useForm.js'
import { required, isEmail, minLength, matches } from '../utils/validation.js'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import './Auth.css'

export default function Register() {
  const { login, user } = useAuth()
  const { users, addUser } = useData()
  const navigate = useNavigate()

  const validate = (values) => {
    const errors = {}
    const nameErr = required(values.name, 'Full name')
    if (nameErr) errors.name = nameErr
    else if (values.name.trim().length < 2) errors.name = 'Enter your full name'

    const emailErr = required(values.email, 'Email')
    if (emailErr) errors.email = emailErr
    else {
      const emailValid = isEmail(values.email)
      if (emailValid) errors.email = emailValid
    }

    const passErr = required(values.password, 'Password')
    if (passErr) errors.password = passErr
    else {
      const passLen = minLength(values.password, 6, 'Password')
      if (passLen) errors.password = passLen
    }

    const confirmErr = required(values.confirmPassword, 'Confirm password')
    if (confirmErr) errors.confirmPassword = confirmErr
    else {
      const matchErr = matches(values.password, values.confirmPassword, 'Passwords')
      if (matchErr) errors.confirmPassword = matchErr
    }

    return errors
  }

  const { values, errors, handleChange, handleBlur, validateAll } = useForm({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validate,
  })

  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/student', { replace: true })
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!validateAll()) return

    const emailLower = values.email.trim().toLowerCase()
    if (users.some((u) => u.email === emailLower)) {
      setFormError('An account with this email already exists.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const newUser = {
        id: `u-stu-${Date.now()}`,
        name: values.name.trim(),
        email: emailLower,
        password: values.password,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&background=2563eb&color=fff`,
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

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <InputField
            label="Full Name"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
            placeholder="John Doe"
            required
          />
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
            placeholder="At least 6 characters"
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            placeholder="Re-enter password"
            required
          />

          {formError && <p className="auth-error">{formError}</p>}

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
