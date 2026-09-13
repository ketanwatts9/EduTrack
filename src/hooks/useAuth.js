// ===== useAuth Custom Hook =====
// Convenience hook to access the AuthContext without importing it
// everywhere. Demonstrates: useContext.

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthContext.Provider')
  }
  return context
}
