// ===== Payment Page (Simulated) =====
// Shows order summary and a fake payment form.
// On "Pay Now" → marks enrollment → redirects to learning page.

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../../components/Button.jsx'
import InputField from '../../components/InputField.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import './Payment.css'

export default function Payment() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getCourseById, addEnrollment } = useData()

  const course = getCourseById(courseId)

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  if (!course) {
    return (
      <div className="page container">
        <EmptyState
          icon="&#128533;"
          title="Course not found"
          message="This course does not exist."
          action={<Link to="/courses"><Button variant="primary">Back to Courses</Button></Link>}
        />
      </div>
    )
  }

  const tax = course.price * 0.1
  const total = course.price + tax

  const handlePay = (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      addEnrollment(user.id, course.id)
      setProcessing(false)
      setDone(true)

      // Redirect after showing success
      setTimeout(() => {
        navigate(`/learn/${course.id}`)
      }, 1500)
    }, 1200)
  }

  if (done) {
    return (
      <div className="payment-page">
        <div className="payment-success">
          <div className="payment-success__icon">&#10003;</div>
          <h2>Payment Successful!</h2>
          <p>You are now enrolled in <strong>{course.title}</strong></p>
          <p className="payment-success__redirect">Redirecting to your course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Complete your purchase to start learning</p>

        <div className="payment-layout">
          {/* Payment form */}
          <div className="payment-form-section">
            <h3 className="payment-section-title">Payment Details</h3>
            <p className="payment-demo-notice">
              This is a simulated payment. No real card will be charged.
              Use any values to proceed.
            </p>
            <form onSubmit={handlePay} className="payment-form">
              <InputField
                label="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
              />
              <InputField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4111 1111 1111 1111"
                required
              />
              <div className="payment-form__row">
                <InputField
                  label="Expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
                <InputField
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
              <Button type="submit" variant="primary" fullWidth size="lg" disabled={processing}>
                {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <aside className="payment-summary">
            <h3 className="payment-section-title">Order Summary</h3>
            <div className="payment-summary__course">
              <img src={course.thumbnail} alt={course.title} />
              <div>
                <h4>{course.title}</h4>
                <p>by {course.instructorName}</p>
              </div>
            </div>
            <div className="payment-summary__row">
              <span>Course Price</span>
              <span>${course.price.toFixed(2)}</span>
            </div>
            <div className="payment-summary__row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="payment-summary__divider"></div>
            <div className="payment-summary__total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
