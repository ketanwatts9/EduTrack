// ===== Badge Component =====
// Small pill-shaped label for tags, statuses, categories.

import './Badge.css'

export default function Badge({ children, variant = 'default', size = 'md' }) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {children}
    </span>
  )
}
