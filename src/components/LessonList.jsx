// ===== LessonList Component =====
// Renders the course curriculum in the learning interface sidebar.
// Shows lock/unlock status, completion, and current selection.

import Badge from './Badge.jsx'
import './LessonList.css'

export default function LessonList({
  modules,
  completedItems,
  currentItem,
  onSelectItem,
  isItemUnlocked,
}) {
  return (
    <div className="lesson-list">
      <h3 className="lesson-list__title">Course Curriculum</h3>
      {modules.map((module, mIdx) => (
        <div key={module.id} className="lesson-list__module">
          <h4 className="lesson-list__module-title">
            <span className="lesson-list__module-num">Module {mIdx + 1}</span>
            {module.title}
          </h4>
          <ul className="lesson-list__items">
            {module.items.map((item) => {
              const isCompleted = completedItems.includes(item.id)
              const isUnlocked = isItemUnlocked(item.id)
              const isActive = currentItem?.id === item.id
              const typeIcon =
                item.type === 'quiz' ? '?' : item.type === 'assignment' ? 'A' : 'L'

              return (
                <li key={item.id}>
                  <button
                    className={`lesson-list__item ${isActive ? 'lesson-list__item--active' : ''}`}
                    onClick={() => isUnlocked && onSelectItem(item)}
                    disabled={!isUnlocked}
                  >
                    <span className={`lesson-list__item-icon lesson-list__item-icon--${item.type}`}>
                      {typeIcon}
                    </span>
                    <div className="lesson-list__item-info">
                      <span className="lesson-list__item-title">{item.title}</span>
                      <span className="lesson-list__item-meta">
                        {item.type === 'lesson' ? `${item.duration}` : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                    <span className="lesson-list__item-status">
                      {isCompleted ? (
                        <span className="lesson-list__check">&#10003;</span>
                      ) : !isUnlocked ? (
                        <span className="lesson-list__lock">&#128274;</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
