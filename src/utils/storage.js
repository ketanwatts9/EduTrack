// ===== localStorage Helpers =====
// Small wrappers around localStorage with JSON support and error safety.

const PREFIX = 'lms_'

export function getItem(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* ignore quota errors */
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* noop */
  }
}

// ---- Auth-specific helpers ----
export function getUserFromStorage() {
  return getItem('currentUser')
}

export function saveUserToStorage(user) {
  setItem('currentUser', user)
}

export function removeUserFromStorage() {
  removeItem('currentUser')
}

// ---- Progress helpers ----
export function getProgress(userId, courseId) {
  const all = getItem('progress') || {}
  return (all[userId] && all[userId][courseId]) || { completedItems: [], videoProgress: {} }
}

export function saveProgress(userId, courseId, progress) {
  const all = getItem('progress') || {}
  if (!all[userId]) all[userId] = {}
  all[userId][courseId] = progress
  setItem('progress', all)
}

// ---- Enrollment helpers ----
export function getEnrollments() {
  return getItem('enrollments') || []
}

export function saveEnrollments(enrollments) {
  setItem('enrollments', enrollments)
}

export function isEnrolled(userId, courseId) {
  const enrollments = getEnrollments()
  return enrollments.some((e) => e.userId === userId && e.courseId === courseId)
}

export function addEnrollment(userId, courseId) {
  const enrollments = getEnrollments()
  if (!enrollments.some((e) => e.userId === userId && e.courseId === courseId)) {
    enrollments.push({
      id: `enr-${Date.now()}`,
      userId,
      courseId,
      enrolledDate: new Date().toISOString().split('T')[0],
      progress: 0,
    })
    saveEnrollments(enrollments)
  }
}

// ---- Quiz results ----
export function getQuizResults(userId) {
  const all = getItem('quizResults') || {}
  return all[userId] || {}
}

export function saveQuizResult(userId, quizId, result) {
  const all = getItem('quizResults') || {}
  if (!all[userId]) all[userId] = {}
  all[userId][quizId] = result
  setItem('quizResults', all)
}

// ---- Assignment submissions ----
export function getAssignments(userId) {
  const all = getItem('assignments') || {}
  return all[userId] || {}
}

export function saveAssignment(userId, assignmentId, submission) {
  const all = getItem('assignments') || {}
  if (!all[userId]) all[userId] = {}
  all[userId][assignmentId] = submission
  setItem('assignments', all)
}

// ---- Certificates ----
export function getCertificates(userId) {
  const all = getItem('certificates') || {}
  return all[userId] || {}
}

export function saveCertificate(userId, courseId, certData) {
  const all = getItem('certificates') || {}
  if (!all[userId]) all[userId] = {}
  all[userId][courseId] = certData
  setItem('certificates', all)
}

// ---- Custom courses (created by instructors) ----
export function getCustomCourses() {
  return getItem('customCourses') || []
}

export function saveCustomCourses(courses) {
  setItem('customCourses', courses)
}

// ---- Custom users (created/removed by admin) ----
export function getCustomUsers() {
  return getItem('customUsers') || []
}

export function saveCustomUsers(users) {
  setItem('customUsers', users)
}
