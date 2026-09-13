// ===== Instructor Dashboard =====
// Shows analytics: total courses, students, revenue, avg rating, course performance.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useData } from '../../hooks/useData.js'
import StatCard from '../../components/StatCard.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import Badge from '../../components/Badge.jsx'
import './InstructorDashboard.css'

export default function InstructorDashboard() {
  const { user } = useAuth()
  const { getInstructorCourses, getEnrollmentsByCourse, reviews } = useData()

  const myCourses = useMemo(
    () => getInstructorCourses(user.id),
    [getInstructorCourses, user.id]
  )

  // Analytics — useMemo
  const analytics = useMemo(() => {
    let totalStudents = 0
    let totalRevenue = 0
    let ratingSum = 0
    let ratingCount = 0

    myCourses.forEach((course) => {
      const enrollments = getEnrollmentsByCourse(course.id)
      totalStudents += enrollments.length
      totalRevenue += enrollments.length * course.price

      const courseReviews = reviews.filter((r) => r.courseId === course.id)
      if (courseReviews.length > 0) {
        ratingSum += courseReviews.reduce((s, r) => s + r.rating, 0)
        ratingCount += courseReviews.length
      } else if (course.rating) {
        ratingSum += course.rating
        ratingCount += 1
      }
    })

    const avgRating = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : 'N/A'

    return {
      totalCourses: myCourses.length,
      totalStudents,
      totalRevenue: totalRevenue.toFixed(2),
      avgRating,
    }
  }, [myCourses, getEnrollmentsByCourse, reviews])

  // Course performance data
  const coursePerformance = useMemo(() => {
    return myCourses.map((course) => {
      const enrollments = getEnrollmentsByCourse(course.id)
      const studentCount = enrollments.length
      const avgProgress =
        studentCount > 0
          ? Math.round(enrollments.reduce((s, e) => s + (e.progress || 0), 0) / studentCount)
          : 0
      const revenue = (studentCount * course.price).toFixed(2)
      return { ...course, studentCount, avgProgress, revenue }
    })
  }, [myCourses, getEnrollmentsByCourse])

  // Simple CSS bar chart data — find max revenue for scaling
  const maxRevenue = useMemo(() => {
    if (coursePerformance.length === 0) return 1
    return Math.max(...coursePerformance.map((c) => parseFloat(c.revenue)), 1)
  }, [coursePerformance])

  return (
    <div className="instructor-dashboard">
      {/* Stats */}
      <div className="stat-grid">
        <StatCard title="Total Courses" value={analytics.totalCourses} icon="&#128218;" color="primary" />
        <StatCard title="Total Students" value={analytics.totalStudents} icon="&#128101;" color="info" />
        <StatCard title="Total Revenue" value={`$${analytics.totalRevenue}`} icon="&#128176;" color="success" />
        <StatCard title="Avg Rating" value={analytics.avgRating} icon="&#11088;" color="accent" />
      </div>

      {/* Course performance */}
      <section className="dash-section">
        <div className="dash-section__header">
          <h2>Course Performance</h2>
          <Link to="/instructor/courses">
            <Button variant="outline" size="sm">Manage Courses</Button>
          </Link>
        </div>

        {coursePerformance.length > 0 ? (
          <div className="perf-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Students</th>
                  <th>Completion</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course) => (
                  <tr key={course.id}>
                    <td className="perf-table__title">
                      <img src={course.thumbnail} alt="" className="perf-table__thumb" />
                      <span>{course.title}</span>
                    </td>
                    <td>{course.studentCount}</td>
                    <td>
                      <div className="perf-table__progress">
                        <ProgressBar progress={course.avgProgress} size="sm" />
                        <span>{course.avgProgress}%</span>
                      </div>
                    </td>
                    <td>${course.revenue}</td>
                    <td>&#9733; {course.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon="&#128218;"
            title="No courses yet"
            message="Create your first course to see analytics here."
            action={<Link to="/instructor/courses/create"><Button variant="primary">Create Course</Button></Link>}
          />
        )}
      </section>

      {/* Revenue chart (CSS-based) */}
      {coursePerformance.length > 0 && (
        <section className="dash-section">
          <h2>Revenue by Course</h2>
          <div className="revenue-chart">
            {coursePerformance.map((course) => (
              <div key={course.id} className="revenue-chart__bar-wrap">
                <div className="revenue-chart__bar-label">${course.revenue}</div>
                <div
                  className="revenue-chart__bar"
                  style={{
                    height: `${(parseFloat(course.revenue) / maxRevenue) * 100}%`,
                  }}
                ></div>
                <div className="revenue-chart__bar-name">{course.title.split(' ').slice(0, 2).join(' ')}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
