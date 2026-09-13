// ===== useLocalStorage Custom Hook =====
// A reusable hook that syncs a piece of React state to localStorage.
// Demonstrates: useState, useEffect, useCallback.

import { useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage.js'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = getItem(key)
    return stored !== null ? stored : initialValue
  })

  useEffect(() => {
    setItem(key, value)
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
