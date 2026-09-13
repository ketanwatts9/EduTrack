// ===== CourseCard Component =====
// Reusable card that displays a course summary.
// Demonstrates: props, conditional rendering.

import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'
import ProgressBar from './ProgressBar.jsx'
import './CourseCard.css'

export default function CourseCard({ course, progress }) {
  const isFree = course.price === 0

  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      <div className="course-card__image">
        <img src={course.thumbnail} alt={course.title} loading="lazy" />
        <div className="course-card__badge">
          {isFree ? <Badge variant="success">Free</Badge> : <Badge variant="warning">Paid</Badge>}
        </div>
      </div>

      <div className="course-card__body">
        <div className="course-card__meta">
          <Badge variant="primary">{course.category}</Badge>
          <Badge variant="default">{course.level}</Badge>
        </div>

        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__instructor">by {course.instructorName}</p>
        <p className="course-card__desc">{course.description}</p>

        <div className="course-card__stats">
          <span className="course-card__stat">
            <strong>{course.modules?.reduce((s, m) => s + m.items.length, 0) || 0}</strong> lessons
          </span>
          <span className="course-card__stat">{course.duration}</span>
          <span className="course-card__rating">&#9733; {course.rating}</span>
        </div>

        {typeof progress === 'number' && (
          <div className="course-card__progress">
            <ProgressBar progress={progress} size="sm" />
            <span>{Math.round(progress)}% complete</span>
          </div>
        )}

        <div className="course-card__footer">
          <span className="course-card__price">
            {isFree ? 'Free' : `$${course.price}`}
          </span>
          <span className="course-card__students">{course.studentsCount} students</span>
        </div>
      </div>
    </Link>
  )
}
