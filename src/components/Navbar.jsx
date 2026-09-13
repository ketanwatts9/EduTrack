// ===== Navbar Component =====
// Displays the top navigation bar.
// Shows different links depending on auth state and role.

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Determine dashboard link based on role
  const dashboardLink = user
    ? user.role === 'student'
      ? '/student'
      : user.role === 'instructor'
        ? '/instructor'
        : '/admin'
    : null

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">E</span>
          <span className="navbar__logo-text">EduTrack</span>
        </Link>

        {/* Hamburger toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`navbar__toggle-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`navbar__toggle-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`navbar__toggle-bar ${menuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Links */}
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className={location.pathname.startsWith('/courses') ? 'active' : ''}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to={dashboardLink} className="navbar__dashboard-link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar__user">
                <img src={user.avatar} alt={user.name} className="navbar__avatar" />
                <span className="navbar__username">{user.name.split(' ')[0]}</span>
              </li>
              <li>
                <button className="navbar__logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar__login-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar__register-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
