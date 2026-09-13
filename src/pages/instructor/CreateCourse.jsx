// ===== Create Course Page =====
// Form for instructors to create a new course.
// Uses controlled components with useState.

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useData } from '../../hooks/useData.js'
import InputField from '../../components/InputField.jsx'
import Button from '../../components/Button.jsx'
import { courseCategories } from '../../data/mockData.js'
import './CreateCourse.css'

export default function CreateCourse() {
  const { user } = useAuth()
  const { addCourse } = useData()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    price: '0',
    thumbnail: '',
    requirements: '',
    whatYouWillLearn: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    if (!form.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required'
    if (parseFloat(form.price) < 0) newErrors.price = 'Price cannot be negative'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    const newCourse = {
      id: `course-custom-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      instructorId: user.id,
      instructorName: user.name,
      category: form.category,
      level: form.level,
      duration: 'Self-paced',
      price: parseFloat(form.price) || 0,
      rating: 0,
      studentsCount: 0,
      thumbnail: form.thumbnail.trim(),
      requirements: form.requirements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      whatYouWillLearn: form.whatYouWillLearn
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      isFeatured: false,
      isPopular: false,
      modules: [],
    }

    addCourse(newCourse)

    setTimeout(() => {
      setSubmitting(false)
      navigate(`/instructor/courses/${newCourse.id}/curriculum`)
    }, 600)
  }

  return (
    <div className="create-course">
      <h1 className="page-title">Create New Course</h1>
      <p className="page-subtitle">Fill in the details below to create your course</p>

      <form onSubmit={handleSubmit} className="create-course__form">
        <div className="create-course__section">
          <h3 className="create-course__section-title">Basic Information</h3>

          <InputField
            label="Course Title"
            value={form.title}
            onChange={handleChange('title')}
            placeholder="e.g. Introduction to Web Development"
            error={errors.title}
            required
          />

          <InputField
            label="Description"
            textarea
            rows={4}
            value={form.description}
            onChange={handleChange('description')}
            placeholder="Describe what students will learn in this course..."
            error={errors.description}
            required
          />

          <div className="create-course__row">
            <InputField
              label="Category"
              type="select"
              value={form.category}
              onChange={handleChange('category')}
              options={courseCategories
                .filter((c) => c !== 'All')
                .map((c) => ({ value: c, label: c }))}
            />
            <InputField
              label="Level"
              type="select"
              value={form.level}
              onChange={handleChange('level')}
              options={[
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
              ]}
            />
          </div>

          <div className="create-course__row">
            <InputField
              label="Price ($)"
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              placeholder="0 for free"
              error={errors.price}
              helpText="Enter 0 for a free course"
            />
            <InputField
              label="Thumbnail URL"
              value={form.thumbnail}
              onChange={handleChange('thumbnail')}
              placeholder="https://example.com/image.jpg"
              error={errors.thumbnail}
              required
            />
          </div>
        </div>

        <div className="create-course__section">
          <h3 className="create-course__section-title">Course Details</h3>

          <InputField
            label="Requirements"
            textarea
            rows={4}
            value={form.requirements}
            onChange={handleChange('requirements')}
            placeholder="One per line&#10;e.g. Basic computer skills&#10;A text editor"
            helpText="Enter one requirement per line"
          />

          <InputField
            label="What Students Will Learn"
            textarea
            rows={4}
            value={form.whatYouWillLearn}
            onChange={handleChange('whatYouWillLearn')}
            placeholder="One per line&#10;e.g. Understand HTML and CSS&#10;Build a web page"
            helpText="Enter one learning outcome per line"
          />
        </div>

        <div className="create-course__actions">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Course & Build Curriculum'}
          </Button>
        </div>
      </form>
    </div>
  )
}
