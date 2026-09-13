// ===== Course Details Page =====
// Shows full course info, curriculum, requirements, and enrollment CTA.

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useData } from '../hooks/useData.js'
import { useAuth } from '../hooks/useAuth.js'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import './CourseDetails.css'

export default function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getCourseById, addEnrollment, getEnrollmentsByUser } = useData()

  const course = getCourseById(courseId)
  const [activeTab, setActiveTab] = useState('overview')

  // Total lesson count — useMemo
  const totalItems = useMemo(() => {
    if (!course) return 0
    return course.modules.reduce((sum, m) => sum + m.items.length, 0)
  }, [course])

  if (!course) {
    return (
      <div className="page container">
        <EmptyState
          icon="&#128533;"
          title="Course not found"
          message="The course you are looking for does not exist."
          action={<Link to="/courses"><Button variant="primary">Back to Courses</Button></Link>}
        />
      </div>
    )
  }

  const isFree = course.price === 0
  const enrolled = user ? getEnrollmentsByUser(user.id).some((e) => e.courseId === course.id) : false

  const handleEnroll = () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${course.id}` } })
      return
    }
    if (user.role !== 'student') {
      navigate('/login')
      return
    }
    if (isFree) {
      addEnrollment(user.id, course.id)
      navigate(`/learn/${course.id}`)
    } else {
      navigate(`/payment/${course.id}`)
    }
  }

  const handleContinue = () => {
    navigate(`/learn/${course.id}`)
  }

  return (
    <div className="course-details">
      {/* Header banner */}
      <div className="course-details__header">
        <div className="container course-details__header-inner">
          <div className="course-details__info">
            <div className="course-details__badges">
              <Badge variant="primary">{course.category}</Badge>
              <Badge variant="default">{course.level}</Badge>
              {isFree ? <Badge variant="success">Free</Badge> : <Badge variant="warning">Paid</Badge>}
            </div>
            <h1 className="course-details__title">{course.title}</h1>
            <p className="course-details__desc">{course.description}</p>
            <div className="course-details__meta">
              <span>by <strong>{course.instructorName}</strong></span>
              <span>&#9733; {course.rating} ({course.studentsCount} students)</span>
              <span>{course.duration}</span>
              <span>{totalItems} lessons</span>
            </div>
          </div>
          <div className="course-details__thumbnail">
            <img src={course.thumbnail} alt={course.title} />
          </div>
        </div>
      </div>

      <div className="container course-details__body">
        <div className="course-details__main">
          {/* Tabs */}
          <div className="course-details__tabs">
            <button
              className={`course-details__tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`course-details__tab ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`course-details__tab ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="course-details__tab-content">
              <h3>What you'll learn</h3>
              <ul className="course-details__learn-list">
                {course.whatYouWillLearn.map((item, i) => (
                  <li key={i}>
                    <span className="course-details__check">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3>Requirements</h3>
              <ul className="course-details__req-list">
                {course.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="course-details__tab-content">
              {course.modules.map((module, mIdx) => (
                <div key={module.id} className="curriculum-module">
                  <h4 className="curriculum-module__title">
                    Module {mIdx + 1}: {module.title}
                  </h4>
                  <ul className="curriculum-module__items">
                    {module.items.map((item) => (
                      <li key={item.id} className="curriculum-module__item">
                        <span className="curriculum-module__item-type">
                          {item.type === 'quiz' ? 'Quiz' : item.type === 'assignment' ? 'Assignment' : 'Lesson'}
                        </span>
                        <span>{item.title}</span>
                        {item.duration && <span className="curriculum-module__item-duration">{item.duration}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="course-details__tab-content">
              <div className="instructor-card">
                <img
                  src={`https://ui-avatars.com/api/?name=${course.instructorName}&background=2563eb&color=fff`}
                  alt={course.instructorName}
                  className="instructor-card__avatar"
                />
                <div>
                  <h3>{course.instructorName}</h3>
                  <p className="instructor-card__role">Course Instructor</p>
                  <p className="instructor-card__bio">
                    Experienced educator passionate about making programming accessible
                    to all students. Teaching with a practical, hands-on approach.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="course-details__sidebar">
          <div className="enroll-card">
            <p className="enroll-card__price">
              {isFree ? 'Free' : `$${course.price}`}
            </p>
            <p className="enroll-card__price-label">
              {isFree ? 'No cost' : 'One-time payment'}
            </p>

            {enrolled ? (
              <Button variant="success" fullWidth size="lg" onClick={handleContinue}>
                Continue Learning
              </Button>
            ) : (
              <Button variant="primary" fullWidth size="lg" onClick={handleEnroll}>
                {isFree ? 'Enroll Free' : 'Buy Course'}
              </Button>
            )}

            <ul className="enroll-card__features">
              <li>&#10003; {totalItems} lessons</li>
              <li>&#10003; {course.duration} of content</li>
              <li>&#10003; Quizzes & assignments</li>
              <li>&#10003; Certificate of completion</li>
              <li>&#10003; Lifetime access</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
