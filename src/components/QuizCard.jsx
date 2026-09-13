// ===== QuizCard Component =====
// Renders a quiz with questions, options, and scoring.
// Demonstrates: useState, conditional rendering, event handling.

import { useState, useMemo, useCallback } from 'react'
import Button from './Button.jsx'
import ProgressBar from './ProgressBar.jsx'
import Badge from './Badge.jsx'
import './QuizCard.css'

export default function QuizCard({ quiz, onSubmit, previousResult }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  // Calculate score when submitted — useMemo avoids recompute on re-render
  const result = useMemo(() => {
    if (!submitted) return null
    let correct = 0
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++
    })
    const percentage = Math.round((correct / quiz.questions.length) * 100)
    const passed = percentage >= quiz.minScore
    return { correct, total: quiz.questions.length, percentage, passed }
  }, [submitted, answers, quiz])

  const handleSelect = useCallback((questionId, optionIndex) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }, [submitted])

  const handleSubmit = useCallback(() => {
    const answeredCount = Object.keys(answers).length
    if (answeredCount < quiz.questions.length) return
    let correct = 0
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++
    })
    setScore(correct)
    setSubmitted(true)
    if (onSubmit) {
      onSubmit(correct, quiz.questions.length, answers)
    }
  }, [answers, quiz, onSubmit])

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(null)
  }

  const allAnswered = Object.keys(answers).length === quiz.questions.length

  return (
    <div className="quiz-card">
      <div className="quiz-card__header">
        <h3 className="quiz-card__title">{quiz.title}</h3>
        <Badge variant="info">{quiz.questions.length} questions</Badge>
      </div>

      {!submitted && previousResult && (
        <div className="quiz-card__previous">
          Previous attempt: {previousResult.percentage}% {previousResult.percentage >= quiz.minScore ? '(Passed)' : '(Failed)'}
        </div>
      )}

      {submitted && result && (
        <div className={`quiz-card__result ${result.passed ? 'quiz-card__result--pass' : 'quiz-card__result--fail'}`}>
          <h4>Quiz Result</h4>
          <div className="quiz-card__score">
            <span className="quiz-card__score-num">{result.correct}/{result.total}</span>
            <span className="quiz-card__score-pct">{result.percentage}%</span>
          </div>
          <ProgressBar progress={result.percentage} size="lg" />
          <p className="quiz-card__verdict">
            {result.passed ? 'Congratulations! You passed the quiz.' : `You need at least ${quiz.minScore}% to pass. Try again!`}
          </p>
        </div>
      )}

      <div className="quiz-card__questions">
        {quiz.questions.map((q, qIdx) => (
          <div key={q.id} className="quiz-question">
            <p className="quiz-question__text">
              <span className="quiz-question__num">Q{qIdx + 1}.</span> {q.question}
            </p>
            <div className="quiz-question__options">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx
                const isCorrect = optIdx === q.correctAnswer
                let className = 'quiz-option'
                if (submitted) {
                  if (isCorrect) className += ' quiz-option--correct'
                  else if (isSelected) className += ' quiz-option--wrong'
                } else if (isSelected) {
                  className += ' quiz-option--selected'
                }
                return (
                  <label key={optIdx} className={className}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => handleSelect(q.id, optIdx)}
                    />
                    <span>{opt}</span>
                    {submitted && isCorrect && <span className="quiz-option__mark">&#10003;</span>}
                    {submitted && isSelected && !isCorrect && <span className="quiz-option__mark">&#10007;</span>}
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <Button
          variant="primary"
          fullWidth
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          {allAnswered ? 'Submit Quiz' : `Answer all questions (${Object.keys(answers).length}/${quiz.questions.length})`}
        </Button>
      ) : (
        <Button variant="outline" fullWidth onClick={handleRetry}>
          Retake Quiz
        </Button>
      )}
    </div>
  )
}
