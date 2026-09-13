// ===== Courses Page =====
// Course catalogue with category filtering and search.

import { useState, useMemo } from 'react'
import { useData } from '../hooks/useData.js'
import CourseCard from '../components/CourseCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { courseCategories } from '../data/mockData.js'
import './Courses.css'

export default function Courses() {
  const { courses } = useData()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('All')

  // Derived filtered list — useMemo prevents recompute on unrelated renders
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory
      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesLevel && matchesSearch
    })
  }, [courses, selectedCategory, selectedLevel, searchQuery])

  return (
    <div className="page courses-page">
      <div className="container">
        <h1 className="page-title">Course Catalogue</h1>
        <p className="page-subtitle">
          Browse our collection of courses. Filter by category or search to find what fits you.
        </p>

        {/* Search bar */}
        <div className="courses-search">
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="courses-search__input"
          />
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="courses-filters__group">
            <label>Category:</label>
            <div className="filter-chips">
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${selectedCategory === cat ? 'filter-chip--active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="courses-filters__group">
            <label>Level:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="courses-filters__select"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <p className="courses-count">
          Showing <strong>{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? 's' : ''}
        </p>

        {/* Course grid */}
        {filteredCourses.length > 0 ? (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="&#128270;"
            title="No courses found"
            message="Try changing your filters or search query to find what you are looking for."
          />
        )}
      </div>
    </div>
  )
}
