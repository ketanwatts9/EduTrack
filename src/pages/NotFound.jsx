// ===== 404 Not Found Page =====

import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Page Not Found</h2>
      <p className="not-found__msg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Go to Homepage</Button>
      </Link>
    </div>
  )
}
