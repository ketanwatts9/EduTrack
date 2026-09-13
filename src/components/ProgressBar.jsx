// ===== ProgressBar Component =====
// Animated progress bar that shows a percentage.

import './ProgressBar.css'

export default function ProgressBar({ progress = 0, label = false, size = 'md' }) {
  const clamped = Math.min(100, Math.max(0, progress))
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      {label && (
        <div className="progress-bar__label">
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
