// ===== Admin Dashboard =====
// Platform-wide analytics and overview.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import StatCard from '../../components/StatCard.jsx'
import Button from '../../components/Button.jsx'
import Badge from '../../components/Badge.jsx'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const { stats, courses, users, enrollments, getCourseById, getUserById } = useData()

  const recentEnrollments = useMemo(
    () => enrollments.slice(-5).reverse(),
    [enrollments]
  )

  const topCourses = useMemo(() => {
    const counts = {}
    enrollments.forEach((e) => {
      counts[e.courseId] = (counts[e.courseId] || 0) + 1
    })
    return Object.entries(counts)
      .map(([courseId, count]) => ({ course: getCourseById(courseId), count }))
      .filter((item) => item.course)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [enrollments, getCourseById])

  return (
    <div className="admin-dashboard">
      <div className="stat-grid">
        <StatCard title="Total Users" value={stats.totalUsers} icon="&#128101;" color="primary" />
        <StatCard title="Total Students" value={stats.totalStudents} icon="&#127891;" color="info" />
        <StatCard title="Total Instructors" value={stats.totalInstructors} icon="&#128218;" color="secondary" />
        <StatCard title="Total Courses" value={stats.totalCourses} icon="&#128221;" color="accent" />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} icon="&#128203;" color="success" />
        <StatCard title="Platform Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="&#128176;" color="error" />
      </div>

      <div className="admin-dashboard__grid">
        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Recent Enrollments</h2>
            <Link to="/admin/enrollments"><Button variant="ghost" size="sm">View All</Button></Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Date</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((enr) => {
                const student = getUserById(enr.userId)
                const course = getCourseById(enr.courseId)
                return (
                  <tr key={enr.id}>
                    <td>{student?.name || 'Unknown'}</td>
                    <td>{course?.title || 'Unknown'}</td>
                    <td>{enr.enrolledDate}</td>
                    <td>{enr.progress || 0}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Top Courses</h2>
            <Link to="/admin/courses"><Button variant="ghost" size="sm">View All</Button></Link>
          </div>
          <div className="admin-top-courses">
            {topCourses.map((item, idx) => (
              <div key={item.course.id} className="admin-top-course">
                <span className="admin-top-course__rank">#{idx + 1}</span>
                <img src={item.course.thumbnail} alt="" className="admin-top-course__img" />
                <div className="admin-top-course__info">
                  <h4>{item.course.title}</h4>
                  <p>{item.count} enrollments</p>
                </div>
                <Badge variant="success">${(item.count * item.course.price).toFixed(2)}</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="admin-section">
        <h2>Quick Actions</h2>
        <div className="admin-actions">
          <Link to="/admin/users"><Button variant="outline">Manage Users</Button></Link>
          <Link to="/admin/courses"><Button variant="outline">Manage Courses</Button></Link>
          <Link to="/admin/enrollments"><Button variant="outline">View Enrollments</Button></Link>
        </div>
      </section>
    </div>
  )
}
