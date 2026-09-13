// ===== StatCard Component =====
// Reusable card for displaying a statistic with title, value, and icon.

import './StatCard.css'

export default function StatCard({ title, value, icon, color = 'primary', subtitle }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">
        {icon}
      </div>
      <div className="stat-card__body">
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__title">{title}</p>
        {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
