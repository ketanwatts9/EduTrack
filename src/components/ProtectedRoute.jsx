// ===== ProtectedRoute Component =====
// Wraps a route to ensure the user is logged in and (optionally) has
// one of the allowed roles. If not, redirects to /login.

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  const location = useLocation()

  // Not logged in → go to login, remembering where we were
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // Logged in but wrong role → go to their own dashboard
  if (roles && !roles.includes(user.role)) {
    const dashboards = {
      student: '/student',
      instructor: '/instructor',
      admin: '/admin',
    }
    return <Navigate to={dashboards[user.role] || '/'} replace />
  }

  return children
}
