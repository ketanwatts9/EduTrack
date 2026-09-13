// ===== Auth Context =====
// A simple context that holds the logged-in user.
// Created with createContext — the only acceptable use per project rules,
// since it replaces what would otherwise be heavy prop drilling for auth state.

import { createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})
