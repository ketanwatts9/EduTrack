// ===== useData Custom Hook =====
// Convenience hook to access the DataContext.

import { useContext } from 'react'
import { DataContext } from '../context/DataContext.jsx'

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
