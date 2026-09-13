// ===== Instructor Courses Page =====
// Lists instructor's courses with management options.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useData } from '../../hooks/useData.js'
import Button from '../../components/Button.jsx'
import Badge from '../../components/Badge.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './InstructorCourses.css'

export default function InstructorCourses() {
  const { user } = useAuth()
  const { getInstructorCourses, getEnrollmentsByCourse } = useData()

  const myCourses = useMemo(
    () => getInstructorCourses(user.id),
    [getInstructorCourses, user.id]
  )

  return (
    <div className="instructor-courses">
      <div className="instructor-courses__header">
        <div>
          <h1 className="page-title">My Courses</h1>
          <p className="page-subtitle">Manage your courses and curriculum</p>
        </div>
        <Link to="/instructor/courses/create">
          <Button variant="primary">+ Create New Course</Button>
        </Link>
      </div>

      {myCourses.length > 0 ? (
        <div className="inst-course-list">
          {myCourses.map((course) => {
            const enrollments = getEnrollmentsByCourse(course.id)
            const studentCount = enrollments.length
            const avgProgress =
              studentCount > 0
                ? Math.round(enrollments.reduce((s, e) => s + (e.progress || 0), 0) / studentCount)
                : 0
            const revenue = (studentCount * course.price).toFixed(2)
            const totalItems = course.modules?.reduce((s, m) => s + m.items.length, 0) || 0

            return (
              <div key={course.id} className="inst-course-card">
                <img src={course.thumbnail} alt={course.title} className="inst-course-card__img" />
                <div className="inst-course-card__body">
                  <div className="inst-course-card__top">
                    <h3>{course.title}</h3>
                    <div className="inst-course-card__badges">
                      <Badge variant="primary">{course.category}</Badge>
                      <Badge variant="default">{course.level}</Badge>
                      {course.price === 0 ? <Badge variant="success">Free</Badge> : <Badge variant="warning">${course.price}</Badge>}
                    </div>
                  </div>
                  <p className="inst-course-card__desc">{course.description}</p>
                  <div className="inst-course-card__stats">
                    <div className="inst-course-card__stat">
                      <strong>{studentCount}</strong>
                      <span>Students</span>
                    </div>
                    <div className="inst-course-card__stat">
                      <strong>{totalItems}</strong>
                      <span>Lessons</span>
                    </div>
                    <div className="inst-course-card__stat">
                      <strong>{avgProgress}%</strong>
                      <span>Avg Completion</span>
                    </div>
                    <div className="inst-course-card__stat">
                      <strong>&#9733; {course.rating}</strong>
                      <span>Rating</span>
                    </div>
                    <div className="inst-course-card__stat">
                      <strong>${revenue}</strong>
                      <span>Revenue</span>
                    </div>
                  </div>
                </div>
                <div className="inst-course-card__actions">
                  <Link to={`/courses/${course.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                  <Link to={`/instructor/courses/${course.id}/curriculum`}>
                    <Button variant="primary" size="sm">Curriculum</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon="&#128218;"
          title="No courses yet"
          message="Create your first course to get started as an instructor."
          action={<Link to="/instructor/courses/create"><Button variant="primary">Create Course</Button></Link>}
        />
      )}
    </div>
  )
}
