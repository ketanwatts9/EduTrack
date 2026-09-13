// ===== EmptyState Component =====
// Shown when a list has no items.

import './EmptyState.css'

export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__msg">{message}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}
