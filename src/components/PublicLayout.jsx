// ===== PublicLayout Component =====
// Wraps public pages with Navbar + Footer.
// Demonstrates: component composition + Outlet for nested routes.

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
