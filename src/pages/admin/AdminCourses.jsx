// ===== Admin Courses Page =====
// View and remove courses from the platform.

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import Badge from '../../components/Badge.jsx'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './AdminPages.css'

export default function AdminCourses() {
  const { courses, removeCourse, getEnrollmentsByCourse } = useData()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredCourses = useMemo(() => {
    return courses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [courses, search])

  const handleDelete = () => {
    if (deleteTarget) {
      removeCourse(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="admin-page">
      <h1 className="page-title">Course Management</h1>
      <p className="page-subtitle">View and manage all platform courses</p>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-filters__search"
        />
      </div>

      <p className="admin-count">
        Showing <strong>{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? 's' : ''}
      </p>

      {filteredCourses.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Price</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => {
                const studentCount = getEnrollmentsByCourse(c.id).length
                return (
                  <tr key={c.id}>
                    <td className="admin-course-cell">
                      <img src={c.thumbnail} alt={c.title} className="admin-course-thumb" />
                      <span>{c.title}</span>
                    </td>
                    <td>{c.instructorName}</td>
                    <td><Badge variant="primary">{c.category}</Badge></td>
                    <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                    <td>{studentCount}</td>
                    <td>&#9733; {c.rating}</td>
                    <td>
                      <div className="admin-action-group">
                        <Link to={`/courses/${c.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(c)}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="&#128218;"
          title="No courses found"
          message="Try changing your search."
        />
      )}

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove Course"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>Remove Course</Button>
          </>
        }
      >
        <p>
          Are you sure you want to remove <strong>{deleteTarget?.title}</strong>?
          All enrollments for this course will also be removed.
        </p>
      </Modal>
    </div>
  )
}
