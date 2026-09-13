// ===== Student Dashboard =====
// Shows enrolled courses, progress, stats, certificates, recent lessons.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useData } from '../../hooks/useData.js'
import StatCard from '../../components/StatCard.jsx'
import CourseCard from '../../components/CourseCard.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import Button from '../../components/Button.jsx'
import Badge from '../../components/Badge.jsx'
import { getProgress, getCertificates } from '../../utils/storage.js'
import './StudentDashboard.css'

export default function StudentDashboard() {
  const { user } = useAuth()
  const { getEnrollmentsByUser, getCourseById, courses } = useData()

  const enrollments = getEnrollmentsByUser(user.id)

  // Build enrolled course list with progress from localStorage
  const enrolledCourses = useMemo(() => {
    return enrollments.map((enr) => {
      const course = getCourseById(enr.courseId)
      if (!course) return null
      const progress = getProgress(user.id, enr.courseId)
      const totalItems = course.modules.reduce((s, m) => s + m.items.length, 0)
      const completedCount = progress.completedItems.length
      const percentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0
      return { ...course, enrollment: enr, percentage, completedCount, totalItems }
    }).filter(Boolean)
  }, [enrollments, getCourseById, user.id, courses])

  // Stats
  const stats = useMemo(() => {
    const completed = enrolledCourses.filter((c) => c.percentage === 100)
    const totalLessonsCompleted = enrolledCourses.reduce((s, c) => s + c.completedCount, 0)
    const certs = getCertificates(user.id)
    const certCount = Object.keys(certs).length

    // Average quiz score
    const quizResults = JSON.parse(localStorage.getItem('lms_quizResults') || '{}')
    const userQuizzes = quizResults[user.id] || {}
    const quizScores = Object.values(userQuizzes)
    const avgScore = quizScores.length > 0
      ? Math.round(quizScores.reduce((s, r) => s + r.percentage, 0) / quizScores.length)
      : 0

    return {
      enrolled: enrolledCourses.length,
      completed: completed.length,
      lessonsCompleted: totalLessonsCompleted,
      avgQuizScore: avgScore,
      certificates: certCount,
    }
  }, [enrolledCourses, user.id])

  const inProgressCourses = enrolledCourses.filter((c) => c.percentage > 0 && c.percentage < 100)
  const completedCourses = enrolledCourses.filter((c) => c.percentage === 100)
  const notStartedCourses = enrolledCourses.filter((c) => c.percentage === 0)

  // Recently accessed: in-progress courses
  const recentCourses = [...inProgressCourses].slice(0, 3)

  // Certificates
  const certificates = useMemo(() => {
    const certs = getCertificates(user.id)
    return Object.entries(certs).map(([courseId, cert]) => ({
      ...cert,
      course: getCourseById(courseId),
    }))
  }, [user.id, getCourseById, courses])

  return (
    <div className="student-dashboard">
      {/* Stats */}
      <div className="stat-grid">
        <StatCard title="Courses Enrolled" value={stats.enrolled} icon="&#128218;" color="primary" />
        <StatCard title="Courses Completed" value={stats.completed} icon="&#127942;" color="success" />
        <StatCard title="Lessons Completed" value={stats.lessonsCompleted} icon="&#128221;" color="info" />
        <StatCard title="Avg Quiz Score" value={`${stats.avgQuizScore}%`} icon="&#127919;" color="accent" />
      </div>

      {/* Continue Learning */}
      <section className="dash-section">
        <div className="dash-section__header">
          <h2>Continue Learning</h2>
          <Link to="/courses" className="dash-section__link">Browse more courses &#8594;</Link>
        </div>

        {recentCourses.length > 0 ? (
          <div className="continue-list">
            {recentCourses.map((course) => (
              <div key={course.id} className="continue-card">
                <img src={course.thumbnail} alt={course.title} className="continue-card__img" />
                <div className="continue-card__body">
                  <h3>{course.title}</h3>
                  <p className="continue-card__meta">{course.instructorName} &middot; {course.totalItems} lessons</p>
                  <div className="continue-card__progress">
                    <ProgressBar progress={course.percentage} size="sm" />
                    <span>{Math.round(course.percentage)}%</span>
                  </div>
                </div>
                <Link to={`/learn/${course.id}`}>
                  <Button variant="primary" size="sm">Continue</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="&#128218;"
            title="No courses in progress"
            message="Enroll in a course to start your learning journey."
            action={<Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>}
          />
        )}
      </section>

      {/* Enrolled courses grid */}
      <section className="dash-section">
        <h2>My Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="course-grid">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={course.percentage} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="&#128218;"
            title="No enrollments yet"
            message="Browse our course catalogue and enroll in your first course."
            action={<Link to="/courses"><Button variant="primary">Explore Courses</Button></Link>}
          />
        )}
      </section>

      {/* Completed courses + certificates */}
      {completedCourses.length > 0 && (
        <section className="dash-section">
          <h2>Completed Courses</h2>
          <div className="course-grid">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={100} />
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      <section className="dash-section">
        <h2>My Certificates</h2>
        {certificates.length > 0 ? (
          <div className="cert-list">
            {certificates.map((cert) => (
              <div key={cert.id} className="cert-item">
                <div className="cert-item__icon">&#127942;</div>
                <div className="cert-item__body">
                  <h3>{cert.course?.title || 'Course'}</h3>
                  <p>Certificate ID: {cert.id}</p>
                  <p>Completed: {cert.completionDate}</p>
                </div>
                <Link to={`/certificate/${cert.course?.id}`}>
                  <Button variant="outline" size="sm">View Certificate</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="&#127942;"
            title="No certificates yet"
            message="Complete a course to earn your first certificate."
          />
        )}
      </section>
    </div>
  )
}
