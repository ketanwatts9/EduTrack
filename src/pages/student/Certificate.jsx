// ===== Certificate Page =====
// Displays a visually attractive certificate and allows printing.
// Generates a certificate ID if one doesn't exist yet.

import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import { useProgress } from '../../hooks/useProgress.js'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './Certificate.css'

export default function Certificate() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { getCourseById } = useData()
  const progress = useProgress(courseId)

  const course = getCourseById(courseId)

  // Check if all items are completed
  const allItems = useMemo(() => {
    if (!course) return []
    const items = []
    course.modules.forEach((m) => m.items.forEach((i) => items.push(i)))
    return items
  }, [course])

  const isComplete = useMemo(() => {
    if (allItems.length === 0) return false
    return allItems.every((i) => progress.isItemCompleted(i.id))
  }, [allItems, progress])

  const [certData, setCertData] = useState(null)

  useEffect(() => {
    const existing = progress.getCertificate()
    if (existing) {
      setCertData(existing)
    } else if (isComplete && course) {
      const generated = progress.generateCertificate(course.title, course.instructorName)
      setCertData(generated)
    }
  }, [isComplete, course]) // eslint-disable-line

  if (!course) {
    return (
      <div className="page container">
        <EmptyState
          icon="&#128533;"
          title="Course not found"
          message="This course does not exist."
          action={<Link to="/student"><Button variant="primary">Back to Dashboard</Button></Link>}
        />
      </div>
    )
  }

  if (!isComplete && !certData) {
    return (
      <div className="page container cert-incomplete">
        <EmptyState
          icon="&#128218;"
          title="Course Not Completed Yet"
          message="You need to complete all lessons, quizzes, and assignments before you can generate a certificate."
          action={
            <div className="cert-incomplete__actions">
              <Link to={`/learn/${course.id}`}>
                <Button variant="primary">Continue Learning</Button>
              </Link>
              <Link to="/student">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          }
        />
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="cert-page">
      <div className="cert-page__actions no-print">
        <Link to="/student">
          <Button variant="ghost" size="sm">&larr; Back to Dashboard</Button>
        </Link>
        <Button variant="primary" size="sm" onClick={handlePrint}>
          Download / Print Certificate
        </Button>
      </div>

      {certData && (
        <div className="certificate">
          <div className="certificate__border">
            <div className="certificate__inner">
              <div className="certificate__header">
                <div className="certificate__logo">EduTrack</div>
                <p className="certificate__org">Learning Management System</p>
              </div>

              <div className="certificate__body">
                <p className="certificate__label">Certificate of Completion</p>
                <p className="certificate__intro">This is proudly presented to</p>
                <h2 className="certificate__name">{certData.studentName}</h2>
                <p className="certificate__intro">for successfully completing the course</p>
                <h3 className="certificate__course">{certData.courseTitle}</h3>

                <div className="certificate__details">
                  <div className="certificate__detail">
                    <span className="certificate__detail-label">Instructor</span>
                    <span className="certificate__detail-value">{certData.instructorName}</span>
                  </div>
                  <div className="certificate__detail">
                    <span className="certificate__detail-label">Completion Date</span>
                    <span className="certificate__detail-value">{certData.completionDate}</span>
                  </div>
                  <div className="certificate__detail">
                    <span className="certificate__detail-label">Certificate ID</span>
                    <span className="certificate__detail-value certificate__detail-id">{certData.id}</span>
                  </div>
                </div>
              </div>

              <div className="certificate__footer">
                <div className="certificate__sign">
                  <div className="certificate__sign-line"></div>
                  <p>Authorized Signature</p>
                </div>
                <div className="certificate__seal">&#127942;</div>
                <div className="certificate__sign">
                  <div className="certificate__sign-line"></div>
                  <p>EduTrack LMS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
