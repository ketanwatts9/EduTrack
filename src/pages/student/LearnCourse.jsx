// ===== Learn Course Page =====
// Full learning interface: curriculum sidebar, video player with resume,
// sequential lesson unlocking, quiz, assignment, progress tracking,
// course completion detection, certificate generation.

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useProgress } from '../../hooks/useProgress.js'
import LessonList from '../../components/LessonList.jsx'
import QuizCard from '../../components/QuizCard.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import Button from '../../components/Button.jsx'
import Badge from '../../components/Badge.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './LearnCourse.css'

export default function LearnCourse() {
  const { courseId } = useParams()
  const { getCourseById, updateEnrollmentProgress } = useData()
  const { user } = useAuth()
  const progress = useProgress(courseId)

  const course = getCourseById(courseId)

  // Build a flat list of all items in order — useMemo
  const allItems = useMemo(() => {
    if (!course) return []
    const items = []
    course.modules.forEach((m) => {
      m.items.forEach((item) => items.push({ ...item, moduleId: m.id }))
    })
    return items
  }, [course])

  const [currentItem, setCurrentItem] = useState(null)
  const videoRef = useRef(null)
  const [showCompletionBanner, setShowCompletionBanner] = useState(false)

  // Set first uncompleted item as current on mount
  useEffect(() => {
    if (allItems.length === 0) return
    const firstUnlocked = allItems.find(
      (item) => progress.isItemCompleted(item.id) || item === allItems[0]
    )
    setCurrentItem(firstUnlocked || allItems[0])
  }, [allItems]) // eslint-disable-line

  // ---- Sequential unlocking logic ----
  const isItemUnlocked = useCallback(
    (itemId) => {
      if (allItems.length === 0) return false
      // First item is always unlocked
      if (itemId === allItems[0].id) return true
      // An item is unlocked if the previous item is completed
      const idx = allItems.findIndex((i) => i.id === itemId)
      if (idx <= 0) return true
      return progress.isItemCompleted(allItems[idx - 1].id)
    },
    [allItems, progress]
  )

  // ---- Total progress percentage ----
  const progressPercent = useMemo(() => {
    if (allItems.length === 0) return 0
    const completed = allItems.filter((i) => progress.isItemCompleted(i.id)).length
    return (completed / allItems.length) * 100
  }, [allItems, progress])

  // Update enrollment progress in data context
  useEffect(() => {
    if (course && user) {
      updateEnrollmentProgress(user.id, course.id, progressPercent)
    }
  }, [progressPercent, course, user, updateEnrollmentProgress])

  // ---- Check course completion ----
  const isCourseComplete = useMemo(() => {
    if (allItems.length === 0) return false
    return allItems.every((i) => progress.isItemCompleted(i.id))
  }, [allItems, progress])

  useEffect(() => {
    if (isCourseComplete && !showCompletionBanner) {
      setShowCompletionBanner(true)
    }
  }, [isCourseComplete, showCompletionBanner])

  // ---- Video progress tracking with useRef + useEffect ----
  useEffect(() => {
    if (!videoRef.current || !currentItem || currentItem.type !== 'lesson') return

    const video = videoRef.current

    // Restore saved position
    const savedTime = progress.getVideoPosition(currentItem.id)
    if (savedTime > 0 && video.readyState >= 1) {
      video.currentTime = savedTime
    }

    // Save position periodically
    const interval = setInterval(() => {
      if (!video.paused && video.currentTime > 0) {
        progress.saveVideoPosition(currentItem.id, video.currentTime)
      }
    }, 3000)

    // Save on pause
    const handlePause = () => {
      if (video.currentTime > 0) {
        progress.saveVideoPosition(currentItem.id, video.currentTime)
      }
    }

    video.addEventListener('pause', handlePause)

    return () => {
      clearInterval(interval)
      video.removeEventListener('pause', handlePause)
      // Save final position on unmount
      if (video.currentTime > 0) {
        progress.saveVideoPosition(currentItem.id, video.currentTime)
      }
    }
  }, [currentItem]) // eslint-disable-line

  // ---- Navigation ----
  const currentIndex = useMemo(
    () => allItems.findIndex((i) => i.id === currentItem?.id),
    [allItems, currentItem]
  )

  const goNext = useCallback(() => {
    if (currentIndex < allItems.length - 1) {
      const next = allItems[currentIndex + 1]
      if (isItemUnlocked(next.id)) {
        setCurrentItem(next)
      }
    }
  }, [currentIndex, allItems, isItemUnlocked])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentItem(allItems[currentIndex - 1])
    }
  }, [currentIndex, allItems])

  const handleMarkComplete = useCallback(() => {
    if (!currentItem) return
    progress.markItemComplete(currentItem.id)
    // Save video position if lesson
    if (currentItem.type === 'lesson' && videoRef.current) {
      progress.saveVideoPosition(currentItem.id, videoRef.current.currentTime)
    }
  }, [currentItem, progress])

  const handleSelectItem = (item) => {
    setCurrentItem(item)
    setShowCompletionBanner(false)
  }

  const handleQuizSubmit = (score, total, answers) => {
    if (currentItem) {
      progress.submitQuiz(currentItem.id, score, total, answers)
    }
  }

  if (!course) {
    return (
      <div className="page container">
        <EmptyState
          icon="&#128533;"
          title="Course not found"
          message="This course does not exist."
          action={<Link to="/courses"><Button variant="primary">Back to Courses</Button></Link>}
        />
      </div>
    )
  }

  return (
    <div className="learn-page">
      {/* Top bar with progress */}
      <div className="learn-topbar">
        <div className="learn-topbar__left">
          <Link to="/student" className="learn-topbar__back">&larr; Dashboard</Link>
          <h2 className="learn-topbar__title">{course.title}</h2>
        </div>
        <div className="learn-topbar__progress">
          <span>{Math.round(progressPercent)}%</span>
          <ProgressBar progress={progressPercent} size="sm" />
        </div>
      </div>

      <div className="learn-layout">
        {/* Sidebar: curriculum */}
        <div className="learn-sidebar">
          <LessonList
            modules={course.modules}
            completedItems={progress.completedItems}
            currentItem={currentItem}
            onSelectItem={handleSelectItem}
            isItemUnlocked={isItemUnlocked}
          />
        </div>

        {/* Main content area */}
        <div className="learn-main">
          {/* Completion banner */}
          {showCompletionBanner && (
            <div className="learn-complete-banner">
              <div className="learn-complete-banner__icon">&#127881;</div>
              <div className="learn-complete-banner__body">
                <h3>Course Completed!</h3>
                <p>Congratulations! You have completed all lessons, quizzes, and assignments.</p>
              </div>
              <Link to={`/certificate/${course.id}`}>
                <Button variant="success" size="sm">Generate Certificate</Button>
              </Link>
            </div>
          )}

          {currentItem && currentItem.type === 'lesson' && (
            <div className="learn-lesson">
              <div className="learn-video">
                <video
                  ref={videoRef}
                  src={currentItem.videoUrl}
                  controls
                  preload="metadata"
                  className="learn-video__element"
                />
              </div>
              <div className="learn-lesson__info">
                <h2 className="learn-lesson__title">{currentItem.title}</h2>
                <p className="learn-lesson__desc">{currentItem.description}</p>
                <div className="learn-lesson__meta">
                  <Badge variant="info">Lesson</Badge>
                  <span>{currentItem.duration}</span>
                </div>
              </div>
            </div>
          )}

          {currentItem && currentItem.type === 'quiz' && (
            <div className="learn-quiz">
              <QuizCard
                quiz={currentItem}
                onSubmit={handleQuizSubmit}
                previousResult={progress.getQuizResult(currentItem.id)}
              />
            </div>
          )}

          {currentItem && currentItem.type === 'assignment' && (
            <AssignmentView
              assignment={currentItem}
              previousSubmission={progress.getAssignmentSubmission(currentItem.id)}
              onSubmit={(text) => progress.submitAssignment(currentItem.id, text)}
            />
          )}

          {/* Navigation buttons */}
          {currentItem && (
            <div className="learn-nav">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={currentIndex === 0}
              >
                &larr; Previous
              </Button>

              <div className="learn-nav__center">
                {progress.isItemCompleted(currentItem.id) ? (
                  <Badge variant="success">&#10003; Completed</Badge>
                ) : (
                  <Button variant="success" onClick={handleMarkComplete}>
                    {currentItem.type === 'quiz' ? 'Submit Quiz to Complete' :
                     currentItem.type === 'assignment' ? 'Submit Assignment to Complete' :
                     'Mark as Complete'}
                  </Button>
                )}
              </div>

              <Button
                variant="primary"
                onClick={goNext}
                disabled={currentIndex >= allItems.length - 1 || !progress.isItemCompleted(currentItem.id)}
              >
                Next &rarr;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ===== Assignment sub-component =====
function AssignmentView({ assignment, previousSubmission, onSubmit }) {
  const [text, setText] = useState(previousSubmission?.text || '')
  const [submitted, setSubmitted] = useState(!!previousSubmission)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text)
    setSubmitted(true)
  }

  return (
    <div className="learn-assignment">
      <h2 className="learn-assignment__title">{assignment.title}</h2>
      <div className="learn-assignment__info">
        <Badge variant="info">Assignment</Badge>
        <span className="learn-assignment__deadline">Deadline: {assignment.deadline}</span>
      </div>
      <p className="learn-assignment__desc">{assignment.description}</p>

      {submitted ? (
        <div className="learn-assignment__submitted">
          <div className="learn-assignment__status">
            <span className="learn-assignment__check">&#10003;</span>
            <span>Assignment Submitted</span>
          </div>
          <p className="learn-assignment__submitted-text">Your submission:</p>
          <div className="learn-assignment__preview">{text}</div>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            Edit Submission
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="learn-assignment__form">
          <textarea
            className="learn-assignment__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your answer here..."
            rows={10}
            required
          />
          <Button type="submit" variant="primary" disabled={!text.trim()}>
            Submit Assignment
          </Button>
        </form>
      )}
    </div>
  )
}
