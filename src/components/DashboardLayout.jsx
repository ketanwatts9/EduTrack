// ===== DashboardLayout Component =====
// Wraps dashboard pages with Navbar + Sidebar + content area.
// Demonstrates: component composition.

import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import { useAuth } from '../hooks/useAuth.js'
import './DashboardLayout.css'

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-layout__body">
        <Sidebar role={role} onNavigate={() => setMobileSidebarOpen(false)} />
        <main className="dashboard-layout__main">
          <div className="dashboard-layout__topbar">
            <div>
              <h1 className="dashboard-layout__welcome">
                Welcome, {user?.name?.split(' ')[0] || 'User'}
              </h1>
              <p className="dashboard-layout__role">
                {role.charAt(0).toUpperCase() + role.slice(1)} Panel
              </p>
            </div>
            <button className="dashboard-layout__logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="dashboard-layout__content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
