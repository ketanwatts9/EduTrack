// ===== Admin Users Page =====
// View and remove users from the platform.

import { useState, useMemo } from 'react'
import { useData } from '../../hooks/useData.js'
import Badge from '../../components/Badge.jsx'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './AdminPages.css'

export default function AdminUsers() {
  const { users, removeUser } = useData()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === 'All' || u.role === roleFilter
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      return matchesRole && matchesSearch
    })
  }, [users, search, roleFilter])

  const handleDelete = () => {
    if (deleteTarget) {
      removeUser(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  const roleBadge = (role) => {
    const variants = { admin: 'error', instructor: 'primary', student: 'success' }
    return <Badge variant={variants[role] || 'default'}>{role}</Badge>
  }

  return (
    <div className="admin-page">
      <h1 className="page-title">User Management</h1>
      <p className="page-subtitle">View and manage all platform users</p>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-filters__search"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="admin-filters__select"
        >
          <option value="All">All Roles</option>
          <option value="student">Students</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <p className="admin-count">
        Showing <strong>{filteredUsers.length}</strong> user{filteredUsers.length !== 1 ? 's' : ''}
      </p>

      {filteredUsers.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="admin-user-cell">
                    <img src={u.avatar} alt={u.name} className="admin-user-avatar" />
                    <span>{u.name}</span>
                  </td>
                  <td>{u.email}</td>
                  <td>{roleBadge(u.role)}</td>
                  <td>{u.joinedDate}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setDeleteTarget(u)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="&#128100;"
          title="No users found"
          message="Try changing your search or filter."
        />
      )}

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove User"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>Remove User</Button>
          </>
        }
      >
        <p>
          Are you sure you want to remove <strong>{deleteTarget?.name}</strong>?
          This will also remove all their enrollments. This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
