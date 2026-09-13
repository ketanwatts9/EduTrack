// ===== Home Page =====
// Landing page with hero, featured courses, stats, features, CTA.

import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useData } from '../hooks/useData.js'
import CourseCard from '../components/CourseCard.jsx'
import Button from '../components/Button.jsx'
import './Home.css'

export default function Home() {
  const { courses, stats } = useData()

  // Derived lists — useMemo avoids recompute
  const featuredCourses = useMemo(
    () => courses.filter((c) => c.isFeatured).slice(0, 3),
    [courses]
  )
  const popularCourses = useMemo(
    () => courses.filter((c) => c.isPopular).slice(0, 3),
    [courses]
  )

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <span className="hero__badge">Live Progress Tracking</span>
            <h1 className="hero__title">
              Learn Smarter, <span className="hero__title-accent">Track Progress</span>, Achieve More
            </h1>
            <p className="hero__desc">
              EduTrack is a modern learning management system that helps you master
              new skills with structured courses, video lessons, quizzes, and
              real-time progress tracking. Start your learning journey today.
            </p>
            <div className="hero__actions">
              <Link to="/courses">
                <Button variant="primary" size="lg">Explore Courses</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">Get Started Free</Button>
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <strong>{stats.totalCourses}+</strong>
                <span>Courses</span>
              </div>
              <div className="hero__stat">
                <strong>{stats.totalStudents}+</strong>
                <span>Students</span>
              </div>
              <div className="hero__stat">
                <strong>{stats.totalInstructors}+</strong>
                <span>Instructors</span>
              </div>
            </div>
          </div>
          <div className="hero__image">
            <img
              src="https://images.pexels.com/photos/4314216/pexels-photo-4314216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Student learning online"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <div className="container stats-bar__grid">
          <div className="stats-bar__item">
            <span className="stats-bar__num">{stats.totalEnrollments}+</span>
            <span className="stats-bar__label">Enrollments</span>
          </div>
          <div className="stats-bar__item">
            <span className="stats-bar__num">15+</span>
            <span className="stats-bar__label">Video Lessons</span>
          </div>
          <div className="stats-bar__item">
            <span className="stats-bar__num">100%</span>
            <span className="stats-bar__label">Completion Certificates</span>
          </div>
          <div className="stats-bar__item">
            <span className="stats-bar__num">4.8&#9733;</span>
            <span className="stats-bar__label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title">Featured Courses</h2>
              <p className="section__subtitle">Hand-picked courses to accelerate your learning</p>
            </div>
            <Link to="/courses" className="section__link">View All &#8594;</Link>
          </div>
          <div className="course-grid">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title text-center">Why Choose EduTrack?</h2>
          <p className="section__subtitle text-center">Everything you need for a complete learning experience</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-card__icon">&#128279;</div>
              <h3>Sequential Learning</h3>
              <p>Lessons unlock one by one so you build knowledge step by step, never feeling overwhelmed.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">&#127909;</div>
              <h3>Resume Anywhere</h3>
              <p>Video progress is saved automatically. Pick up exactly where you left off, on any device.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">&#128202;</div>
              <h3>Live Progress Tracking</h3>
              <p>Watch your progress bar fill up in real-time as you complete lessons, quizzes, and assignments.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">&#127942;</div>
              <h3>Earn Certificates</h3>
              <p>Complete courses and generate certificates to showcase your achievements.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">&#128221;</div>
              <h3>Quizzes & Assignments</h3>
              <p>Test your knowledge with interactive quizzes and hands-on assignments after each module.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">&#128104;&#8205;&#128187;</div>
              <h3>Learn from Experts</h3>
              <p>Courses created by experienced instructors with real-world industry and academic knowledge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title">Popular Courses</h2>
              <p className="section__subtitle">Most enrolled courses by our community</p>
            </div>
            <Link to="/courses" className="section__link">View All &#8594;</Link>
          </div>
          <div className="course-grid">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__title">Ready to Start Learning?</h2>
          <p className="cta__desc">
            Join thousands of students already learning on EduTrack. It is free to start.
          </p>
          <div className="cta__actions">
            <Link to="/register">
              <Button variant="secondary" size="lg">Create Free Account</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
