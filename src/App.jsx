import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'

// Public pages
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import Payment from './pages/student/Payment.jsx'
import LearnCourse from './pages/student/LearnCourse.jsx'
import Certificate from './pages/student/Certificate.jsx'

// Instructor pages
import InstructorDashboard from './pages/instructor/InstructorDashboard.jsx'
import InstructorCourses from './pages/instructor/InstructorCourses.jsx'
import CreateCourse from './pages/instructor/CreateCourse.jsx'
import CurriculumBuilder from './pages/instructor/CurriculumBuilder.jsx'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminCourses from './pages/admin/AdminCourses.jsx'
import AdminEnrollments from './pages/admin/AdminEnrollments.jsx'

// Layout & protection
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'

import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from './utils/storage.js'

function App() {
  const [user, setUser] = useState(() => getUserFromStorage())

  const login = useCallback((userData) => {
    setUser(userData)
    saveUserToStorage(userData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    removeUserFromStorage()
  }, [])

  // Sync across tabs
  useEffect(() => {
    const handler = () => setUser(getUserFromStorage())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const authValue = { user, login, logout }

  return (
    <AuthContext.Provider value={authValue}>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Student routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute roles={['student']}>
                  <DashboardLayout role="student" />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentDashboard />} />
            </Route>
            <Route
              path="/payment/:courseId"
              element={
                <ProtectedRoute roles={['student']}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:courseId"
              element={
                <ProtectedRoute roles={['student']}>
                  <LearnCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/certificate/:courseId"
              element={
                <ProtectedRoute roles={['student']}>
                  <Certificate />
                </ProtectedRoute>
              }
            />

            {/* Instructor routes */}
            <Route
              path="/instructor"
              element={
                <ProtectedRoute roles={['instructor']}>
                  <DashboardLayout role="instructor" />
                </ProtectedRoute>
              }
            >
              <Route index element={<InstructorDashboard />} />
              <Route path="courses" element={<InstructorCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route path="courses/:courseId/curriculum" element={<CurriculumBuilder />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <DashboardLayout role="admin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="enrollments" element={<AdminEnrollments />} />
            </Route>

            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthContext.Provider>
  )
}

export default App
