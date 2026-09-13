// ===== Data Context =====
// Provides courses, users, enrollments, and reviews to all pages.
// Reads from mockData + localStorage so instructor-created courses and
// admin changes persist across reloads.

import { useState, useEffect, useCallback, useMemo, createContext } from 'react'
import {
  mockCourses,
  mockUsers,
  mockEnrollments,
  mockReviews,
} from '../data/mockData.js'
import {
  getCustomCourses,
  saveCustomCourses,
  getCustomUsers,
  saveCustomUsers,
  getEnrollments,
  saveEnrollments,
} from '../utils/storage.js'

export const DataContext = createContext(null)

export function DataProvider({ children }) {
  // Merge mock courses with any instructor-created courses from localStorage
  const [courses, setCourses] = useState(() => {
    const custom = getCustomCourses()
    return [...custom, ...mockCourses]
  })

  // Merge mock users with any admin-created users
  const [users, setUsers] = useState(() => {
    const custom = getCustomUsers()
    return [...custom, ...mockUsers]
  })

  const [enrollments, setEnrollments] = useState(() => {
    const stored = getEnrollments()
    // Merge: include stored enrollments plus mock enrollments (avoid duplicates)
    const merged = [...mockEnrollments]
    stored.forEach((se) => {
      if (!merged.some((me) => me.userId === se.userId && me.courseId === se.courseId)) {
        merged.push(se)
      }
    })
    return merged
  })

  const [reviews] = useState(mockReviews)

  // ---- Persist when changes happen ----
  useEffect(() => {
    const custom = courses.filter((c) => !mockCourses.some((mc) => mc.id === c.id))
    saveCustomCourses(custom)
  }, [courses])

  useEffect(() => {
    const custom = users.filter((u) => !mockUsers.some((mu) => mu.id === u.id))
    saveCustomUsers(custom)
  }, [users])

  useEffect(() => {
    const stored = getEnrollments()
    // Only save student-made enrollments that aren't in mock data
    const customOnly = enrollments.filter(
      (e) => !mockEnrollments.some((me) => me.userId === e.userId && me.courseId === e.courseId)
    )
    // Merge with existing stored to avoid losing any
    const merged = [...stored]
    customOnly.forEach((ce) => {
      if (!merged.some((me) => me.userId === ce.userId && me.courseId === ce.courseId)) {
        merged.push(ce)
      }
    })
    saveEnrollments(merged)
  }, [enrollments])

  // ---- Actions ----
  const addCourse = useCallback((course) => {
    setCourses((prev) => [course, ...prev])
  }, [])

  const updateCourse = useCallback((courseId, updates) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c)))
  }, [])

  const removeCourse = useCallback((courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId))
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId))
  }, [])

  const addUser = useCallback((user) => {
    setUsers((prev) => [...prev, user])
  }, [])

  const removeUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
    setEnrollments((prev) => prev.filter((e) => e.userId !== userId))
  }, [])

  const addEnrollment = useCallback((userId, courseId) => {
    setEnrollments((prev) => {
      if (prev.some((e) => e.userId === userId && e.courseId === courseId)) return prev
      return [
        ...prev,
        {
          id: `enr-${Date.now()}`,
          userId,
          courseId,
          enrolledDate: new Date().toISOString().split('T')[0],
          progress: 0,
        },
      ]
    })
  }, [])

  const updateEnrollmentProgress = useCallback((userId, courseId, progress) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.userId === userId && e.courseId === courseId ? { ...e, progress } : e
      )
    )
  }, [])

  // ---- Derived data via useMemo ----
  const getCourseById = useCallback(
    (courseId) => courses.find((c) => c.id === courseId),
    [courses]
  )

  const getUserById = useCallback(
    (userId) => users.find((u) => u.id === userId),
    [users]
  )

  const getEnrollmentsByUser = useCallback(
    (userId) => enrollments.filter((e) => e.userId === userId),
    [enrollments]
  )

  const getEnrollmentsByCourse = useCallback(
    (courseId) => enrollments.filter((e) => e.courseId === courseId),
    [enrollments]
  )

  const getInstructorCourses = useCallback(
    (instructorId) => courses.filter((c) => c.instructorId === instructorId),
    [courses]
  )

  const stats = useMemo(() => {
    const totalStudents = users.filter((u) => u.role === 'student').length
    const totalInstructors = users.filter((u) => u.role === 'instructor').length
    const totalRevenue = enrollments.reduce((sum, e) => {
      const course = courses.find((c) => c.id === e.courseId)
      return sum + (course ? course.price : 0)
    }, 0)
    return {
      totalUsers: users.length,
      totalStudents,
      totalInstructors,
      totalCourses: courses.length,
      totalEnrollments: enrollments.length,
      totalRevenue,
    }
  }, [users, courses, enrollments])

  const value = useMemo(
    () => ({
      courses,
      users,
      enrollments,
      reviews,
      stats,
      addCourse,
      updateCourse,
      removeCourse,
      addUser,
      removeUser,
      addEnrollment,
      updateEnrollmentProgress,
      getCourseById,
      getUserById,
      getEnrollmentsByUser,
      getEnrollmentsByCourse,
      getInstructorCourses,
    }),
    [
      courses, users, enrollments, reviews, stats,
      addCourse, updateCourse, removeCourse, addUser, removeUser,
      addEnrollment, updateEnrollmentProgress,
      getCourseById, getUserById, getEnrollmentsByUser, getEnrollmentsByCourse,
      getInstructorCourses,
    ]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
