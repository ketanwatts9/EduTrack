// ===== About Page =====

import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import './About.css'

export default function About() {
  return (
    <div className="page about-page">
      <div className="container">
        <h1 className="page-title">About EduTrack LMS</h1>
        <p className="page-subtitle">A modern learning management system built for students, by students.</p>

        <div className="about-hero">
          <img
            src="https://images.pexels.com/photos/5905945/pexels-photo-5905945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Online learning"
          />
        </div>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            EduTrack LMS was created to make learning programming and technology skills
            accessible, structured, and trackable. We believe that everyone should have
            the tools to learn at their own pace while seeing their progress in real-time.
            Our platform combines structured curricula, video lessons, interactive quizzes,
            and hands-on assignments to create a complete learning experience.
          </p>
        </section>

        <section className="about-section">
          <h2>What Makes Us Different</h2>
          <div className="about-features">
            <div className="about-feature">
              <h3>&#127919; Goal-Oriented Learning</h3>
              <p>Every course has clear learning outcomes and a structured path from start to finish.</p>
            </div>
            <div className="about-feature">
              <h3>&#128202; Live Progress Tracking</h3>
              <p>See exactly how far you've come with real-time progress bars and completion statistics.</p>
            </div>
            <div className="about-feature">
              <h3>&#128274; Sequential Unlocking</h3>
              <p>Lessons unlock one at a time so you never skip ahead and miss foundational concepts.</p>
            </div>
            <div className="about-feature">
              <h3>&#127909; Resume Anytime</h3>
              <p>Your video progress is saved automatically. Come back and pick up right where you left off.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>For Everyone</h2>
          <div className="about-roles">
            <div className="about-role">
              <h3>Students</h3>
              <p>Browse courses, enroll, learn at your pace, take quizzes, submit assignments, and earn certificates.</p>
            </div>
            <div className="about-role">
              <h3>Instructors</h3>
              <p>Create courses, build curricula with modules and lessons, track student progress, and view analytics.</p>
            </div>
            <div className="about-role">
              <h3>Admins</h3>
              <p>Manage users, oversee courses, monitor enrollments, and keep the platform running smoothly.</p>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Start Learning Today</h2>
          <p>Join EduTrack and take your first step towards mastering new skills.</p>
          <div className="about-cta__actions">
            <Link to="/courses"><Button variant="primary" size="lg">Browse Courses</Button></Link>
            <Link to="/register"><Button variant="outline" size="lg">Register Now</Button></Link>
          </div>
        </section>
      </div>
    </div>
  )
}
