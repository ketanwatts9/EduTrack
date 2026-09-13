// ===== Footer Component =====

import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__col footer__col--brand">
          <h3 className="footer__logo">EduTrack LMS</h3>
          <p className="footer__desc">
            A modern learning management system with live progress tracking.
            Learn at your pace, track your growth, earn certificates.
          </p>
        </div>

        <div className="footer__col">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>For Students</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/courses">Browse Courses</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>support@edutrack.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Education St, Learning City</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} EduTrack LMS. Built as a college React project.</p>
      </div>
    </footer>
  )
}
