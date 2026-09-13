// ===== Curriculum Builder Page =====
// Lets instructors add modules, lessons, quizzes, and assignments to a course.

import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import Button from '../../components/Button.jsx'
import InputField from '../../components/InputField.jsx'
import Modal from '../../components/Modal.jsx'
import Badge from '../../components/Badge.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { SAMPLE_VIDEO_URL } from '../../data/mockData.js'
import './CurriculumBuilder.css'

export default function CurriculumBuilder() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { getCourseById, updateCourse } = useData()

  const course = getCourseById(courseId)

  const [modules, setModules] = useState(course?.modules || [])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('module')
  const [targetModuleId, setTargetModuleId] = useState(null)

  const [modalForm, setModalForm] = useState({
    title: '',
    description: '',
    duration: '',
    deadline: '',
    videoUrl: '',
  })

  const totalItems = useMemo(
    () => modules.reduce((s, m) => s + m.items.length, 0),
    [modules]
  )

  if (!course) {
    return (
      <div className="page container">
        <EmptyState
          icon="&#128533;"
          title="Course not found"
          message="This course does not exist."
          action={<Link to="/instructor/courses"><Button variant="primary">Back to My Courses</Button></Link>}
        />
      </div>
    )
  }

  const openModal = (mode, moduleId = null) => {
    setModalMode(mode)
    setTargetModuleId(moduleId)
    setModalForm({ title: '', description: '', duration: '', deadline: '', videoUrl: '' })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTargetModuleId(null)
  }

  const handleModalSave = () => {
    if (!modalForm.title.trim()) return

    if (modalMode === 'module') {
      const newModule = {
        id: `mod-${Date.now()}`,
        title: modalForm.title.trim(),
        items: [],
      }
      setModules((prev) => [...prev, newModule])
    } else if (modalMode === 'lesson') {
      const newLesson = {
        id: `lesson-${Date.now()}`,
        type: 'lesson',
        title: modalForm.title.trim(),
        description: modalForm.description.trim() || 'No description',
        duration: modalForm.duration.trim() || '10 min',
        videoUrl: modalForm.videoUrl.trim() || SAMPLE_VIDEO_URL,
      }
      setModules((prev) =>
        prev.map((m) =>
          m.id === targetModuleId ? { ...m, items: [...m.items, newLesson] } : m
        )
      )
    } else if (modalMode === 'quiz') {
      const newQuiz = {
        id: `quiz-${Date.now()}`,
        type: 'quiz',
        title: modalForm.title.trim(),
        minScore: 60,
        questions: [
          {
            id: `q-${Date.now()}`,
            question: 'Sample question? (Edit this after creating)',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
          },
        ],
      }
      setModules((prev) =>
        prev.map((m) =>
          m.id === targetModuleId ? { ...m, items: [...m.items, newQuiz] } : m
        )
      )
    } else if (modalMode === 'assignment') {
      const newAssignment = {
        id: `assign-${Date.now()}`,
        type: 'assignment',
        title: modalForm.title.trim(),
        description: modalForm.description.trim() || 'No description',
        deadline: modalForm.deadline.trim() || 'No deadline',
      }
      setModules((prev) =>
        prev.map((m) =>
          m.id === targetModuleId ? { ...m, items: [...m.items, newAssignment] } : m
        )
      )
    }

    closeModal()
  }

  const handleRemoveItem = (moduleId, itemId) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, items: m.items.filter((i) => i.id !== itemId) }
          : m
      )
    )
  }

  const handleRemoveModule = (moduleId) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId))
  }

  const handleSave = useCallback(() => {
    updateCourse(course.id, { modules })
    navigate('/instructor/courses')
  }, [modules, course, updateCourse, navigate])

  const modalTitle = {
    module: 'Add Module',
    lesson: 'Add Lesson',
    quiz: 'Add Quiz',
    assignment: 'Add Assignment',
  }[modalMode]

  return (
    <div className="curriculum-builder">
      <div className="curriculum-builder__header">
        <div>
          <h1 className="page-title">Curriculum Builder</h1>
          <p className="page-subtitle">{course.title}</p>
        </div>
        <div className="curriculum-builder__header-actions">
          <Button variant="outline" onClick={() => navigate('/instructor/courses')}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Curriculum
          </Button>
        </div>
      </div>

      <div className="curriculum-builder__summary">
        <Badge variant="primary">{modules.length} Modules</Badge>
        <Badge variant="info">{totalItems} Items</Badge>
      </div>

      <Button variant="primary" onClick={() => openModal('module')} className="curriculum-builder__add-module">
        + Add Module
      </Button>

      {modules.length === 0 ? (
        <EmptyState
          icon="&#128218;"
          title="No modules yet"
          message="Add your first module to start building the curriculum."
        />
      ) : (
        <div className="curriculum-builder__modules">
          {modules.map((module, mIdx) => (
            <div key={module.id} className="cb-module">
              <div className="cb-module__header">
                <h3 className="cb-module__title">
                  <span className="cb-module__num">Module {mIdx + 1}</span>
                  {module.title}
                </h3>
                <button
                  className="cb-module__remove"
                  onClick={() => handleRemoveModule(module.id)}
                  title="Remove module"
                >
                  &times;
                </button>
              </div>

              {module.items.length > 0 ? (
                <ul className="cb-module__items">
                  {module.items.map((item) => (
                    <li key={item.id} className="cb-item">
                      <div className="cb-item__info">
                        <span className={`cb-item__icon cb-item__icon--${item.type}`}>
                          {item.type === 'quiz' ? 'Q' : item.type === 'assignment' ? 'A' : 'L'}
                        </span>
                        <div>
                          <p className="cb-item__title">{item.title}</p>
                          <p className="cb-item__meta">
                            {item.type === 'lesson' ? `Lesson | ${item.duration}` :
                             item.type === 'quiz' ? `Quiz | ${item.questions?.length || 0} questions` :
                             'Assignment'}
                          </p>
                        </div>
                      </div>
                      <button
                        className="cb-item__remove"
                        onClick={() => handleRemoveItem(module.id, item.id)}
                        title="Remove item"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="cb-module__empty">No items in this module yet.</p>
              )}

              <div className="cb-module__add-buttons">
                <Button variant="ghost" size="sm" onClick={() => openModal('lesson', module.id)}>
                  + Lesson
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openModal('quiz', module.id)}>
                  + Quiz
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openModal('assignment', module.id)}>
                  + Assignment
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={modalTitle}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleModalSave}>Add</Button>
          </>
        }
      >
        <InputField
          label="Title"
          value={modalForm.title}
          onChange={(e) => setModalForm((p) => ({ ...p, title: e.target.value }))}
          placeholder="Enter a title..."
          required
        />

        {modalMode === 'lesson' && (
          <>
            <InputField
              label="Description"
              textarea
              rows={3}
              value={modalForm.description}
              onChange={(e) => setModalForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What is this lesson about?"
            />
            <div className="create-course__row">
              <InputField
                label="Duration"
                value={modalForm.duration}
                onChange={(e) => setModalForm((p) => ({ ...p, duration: e.target.value }))}
                placeholder="e.g. 15 min"
              />
              <InputField
                label="Video URL"
                value={modalForm.videoUrl}
                onChange={(e) => setModalForm((p) => ({ ...p, videoUrl: e.target.value }))}
                placeholder="Video URL (optional)"
              />
            </div>
          </>
        )}

        {modalMode === 'assignment' && (
          <>
            <InputField
              label="Description"
              textarea
              rows={3}
              value={modalForm.description}
              onChange={(e) => setModalForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What should students do?"
            />
            <InputField
              label="Deadline"
              value={modalForm.deadline}
              onChange={(e) => setModalForm((p) => ({ ...p, deadline: e.target.value }))}
              placeholder="e.g. 2024-12-31"
            />
          </>
        )}

        {modalMode === 'quiz' && (
          <p className="cb-modal-hint">
            A sample question will be added. You can add more questions later.
          </p>
        )}
      </Modal>
    </div>
  )
}
