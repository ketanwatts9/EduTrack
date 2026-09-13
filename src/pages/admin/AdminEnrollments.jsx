// ===== Admin Enrollments Page =====
// View all enrollment records on the platform.

import { useState, useMemo } from 'react'
import { useData } from '../../hooks/useData.js'
import Badge from '../../components/Badge.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './AdminPages.css'

export default function AdminEnrollments() {
  const { enrollments, getCourseById, getUserById } = useData()
  const [search, setSearch] = useState('')
  const [progressFilter, setProgressFilter] = useState('All')

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enr) => {
      const student = getUserById(enr.userId)
      const course = getCourseById(enr.courseId)
      const studentName = student?.name || ''
      const courseName = course?.title || ''

      const matchesSearch =
        studentName.toLowerCase().includes(search.toLowerCase()) ||
        courseName.toLowerCase().includes(search.toLowerCase())

      const progress = enr.progress || 0
      const matchesProgress =
        progressFilter === 'All' ||
        (progressFilter === 'completed' && progress === 100) ||
        (progressFilter === 'in-progress' && progress > 0 && progress < 100) ||
        (progressFilter === 'not-started' && progress === 0)

      return matchesSearch && matchesProgress
    })
  }, [enrollments, search, progressFilter, getUserById, getCourseById])

  return (
    <div className="admin-page">
      <h1 className="page-title">Enrollments</h1>
      <p className="page-subtitle">View all student enrollments across the platform</p>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by student or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-filters__search"
        />
        <select
          value={progressFilter}
          onChange={(e) => setProgressFilter(e.target.value)}
          className="admin-filters__select"
        >
          <option value="All">All Progress</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="not-started">Not Started</option>
        </select>
      </div>

      <p className="admin-count">
        Showing <strong>{filteredEnrollments.length}</strong> enrollment{filteredEnrollments.length !== 1 ? 's' : ''}
      </p>

      {filteredEnrollments.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Enrolled Date</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enr) => {
                const student = getUserById(enr.userId)
                const course = getCourseById(enr.courseId)
                const progress = enr.progress || 0
                const status =
                  progress === 100 ? 'completed' :
                  progress > 0 ? 'in-progress' : 'not-started'
                const badgeVariant =
                  status === 'completed' ? 'success' :
                  status === 'in-progress' ? 'warning' : 'default'

                return (
                  <tr key={enr.id}>
                    <td className="admin-user-cell">
                      <img src={student?.avatar} alt="" className="admin-user-avatar" />
                      <span>{student?.name || 'Unknown'}</span>
                    </td>
                    <td>{course?.title || 'Unknown'}</td>
                    <td>{enr.enrolledDate}</td>
                    <td>
                      <div className="admin-progress-cell">
                        <div className="admin-progress-bar">
                          <div
                            className="admin-progress-fill"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span>{progress}%</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={badgeVariant}>
                        {status === 'completed' ? 'Completed' :
                         status === 'in-progress' ? 'In Progress' : 'Not Started'}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="&#128203;"
          title="No enrollments found"
          message="Try changing your search or filter."
        />
      )}
    </div>
  )
}
