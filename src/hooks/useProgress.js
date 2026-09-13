// ===== useProgress Custom Hook =====
// Manages course progress for the logged-in student.
// Handles: completed items, video resume positions, quiz results, assignments.
// Demonstrates: useState, useEffect, useCallback, useMemo, useRef (via caller).

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from './useAuth.js'
import {
  getProgress,
  saveProgress,
  getQuizResults,
  saveQuizResult,
  getAssignments,
  saveAssignment,
  getCertificates,
  saveCertificate,
} from '../utils/storage.js'

export function useProgress(courseId) {
  const { user } = useAuth()
  const userId = user?.id

  const [completedItems, setCompletedItems] = useState([])
  const [videoProgress, setVideoProgress] = useState({})

  // Load progress from localStorage on mount / when course changes
  useEffect(() => {
    if (!userId || !courseId) return
    const data = getProgress(userId, courseId)
    setCompletedItems(data.completedItems || [])
    setVideoProgress(data.videoProgress || {})
  }, [userId, courseId])

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    if (!userId || !courseId) return
    saveProgress(userId, courseId, { completedItems, videoProgress })
  }, [userId, courseId, completedItems, videoProgress])

  // ---- Actions ----
  const markItemComplete = useCallback((itemId) => {
    setCompletedItems((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]))
  }, [])

  const isItemCompleted = useCallback(
    (itemId) => completedItems.includes(itemId),
    [completedItems]
  )

  const saveVideoPosition = useCallback(
    (itemId, time) => {
      setVideoProgress((prev) => ({ ...prev, [itemId]: time }))
    },
    []
  )

  const getVideoPosition = useCallback(
    (itemId) => videoProgress[itemId] || 0,
    [videoProgress]
  )

  // ---- Quiz ----
  const submitQuiz = useCallback(
    (quizId, score, totalQuestions, answers) => {
      if (!userId) return
      const result = {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        answers,
        submittedAt: new Date().toISOString(),
      }
      saveQuizResult(userId, quizId, result)
      markItemComplete(quizId)
      return result
    },
    [userId, markItemComplete]
  )

  const getQuizResult = useCallback(
    (quizId) => {
      if (!userId) return null
      return getQuizResults(userId)[quizId] || null
    },
    [userId]
  )

  // ---- Assignment ----
  const submitAssignment = useCallback(
    (assignmentId, text) => {
      if (!userId) return
      const submission = {
        text,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
      }
      saveAssignment(userId, assignmentId, submission)
      markItemComplete(assignmentId)
      return submission
    },
    [userId, markItemComplete]
  )

  const getAssignmentSubmission = useCallback(
    (assignmentId) => {
      if (!userId) return null
      return getAssignments(userId)[assignmentId] || null
    },
    [userId]
  )

  // ---- Certificate ----
  const generateCertificate = useCallback(
    (courseTitle, instructorName) => {
      if (!userId) return null
      const certId = `CERT-${userId.slice(-4)}-${courseId.slice(-3)}-${Date.now().toString(36).toUpperCase()}`
      const certData = {
        id: certId,
        studentName: user.name,
        courseTitle,
        instructorName,
        completionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }
      saveCertificate(userId, courseId, certData)
      return certData
    },
    [userId, courseId, user]
  )

  const getCertificate = useCallback(() => {
    if (!userId) return null
    return getCertificates(userId)[courseId] || null
  }, [userId, courseId])

  // ---- Derived progress percentage (useMemo) ----
  const progressPercentage = useMemo(() => {
    const total = completedItems.length
    // Will be calculated by caller who knows totalItems
    return total
  }, [completedItems])

  return {
    completedItems,
    markItemComplete,
    isItemCompleted,
    saveVideoPosition,
    getVideoPosition,
    submitQuiz,
    getQuizResult,
    submitAssignment,
    getAssignmentSubmission,
    generateCertificate,
    getCertificate,
    completedCount: progressPercentage,
  }
}
