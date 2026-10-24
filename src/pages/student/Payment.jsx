// ===== Payment Page (Simulated) =====
// Shows order summary and a fake payment form.
// On "Pay Now" → marks enrollment → redirects to learning page.
// Uses the reusable useForm hook + validation strategies.

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../hooks/useData.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useForm } from '../../hooks/useForm.js'
import {
  required,
  isCardNumber,
  isExpiry,
  isCvv,
  formatCardNumber,
  formatExpiry,
  formatCvv,
} from '../../utils/validation.js'
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

  const validate = (values) => {
    const errors = {}
    const nameErr = required(values.cardName, 'Name on card')
    if (nameErr) errors.cardName = nameErr
    else if (values.cardName.trim().length < 2) errors.cardName = 'Enter the name on your card'

    const cardErr = required(values.cardNumber, 'Card number')
    if (cardErr) errors.cardNumber = cardErr
    else {
      const cardValid = isCardNumber(values.cardNumber)
      if (cardValid) errors.cardNumber = cardValid
    }

    const expErr = required(values.expiry, 'Expiry')
    if (expErr) errors.expiry = expErr
    else {
      const expValid = isExpiry(values.expiry)
      if (expValid) errors.expiry = expValid
    }

    const cvvErr = required(values.cvv, 'CVV')
    if (cvvErr) errors.cvv = cvvErr
    else {
      const cvvValid = isCvv(values.cvv)
      if (cvvValid) errors.cvv = cvvValid
    }

    return errors
  }

  const { values, errors, handleChange, handleBlur, setFieldValue, validateAll } = useForm({
    initialValues: { cardName: '', cardNumber: '', expiry: '', cvv: '' },
    validate,
  })

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

  const handleFieldChange = (field) => (e) => {
    const raw = e.target.value
    if (field === 'cardNumber') {
      setFieldValue('cardNumber', formatCardNumber(raw))
    } else if (field === 'expiry') {
      setFieldValue('expiry', formatExpiry(raw))
    } else if (field === 'cvv') {
      setFieldValue('cvv', formatCvv(raw))
    } else {
      handleChange(field)(e)
    }
  }

  const handlePay = (e) => {
    e.preventDefault()

    if (!validateAll()) return

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
            <form onSubmit={handlePay} className="payment-form" noValidate>
              <InputField
                label="Name on Card"
                value={values.cardName}
                onChange={handleFieldChange('cardName')}
                onBlur={handleBlur('cardName')}
                error={errors.cardName}
                placeholder="John Doe"
                required
              />
              <InputField
                label="Card Number"
                value={values.cardNumber}
                onChange={handleFieldChange('cardNumber')}
                onBlur={handleBlur('cardNumber')}
                error={errors.cardNumber}
                placeholder="4111 1111 1111 1111"
                required
              />
              <div className="payment-form__row">
                <InputField
                  label="Expiry"
                  value={values.expiry}
                  onChange={handleFieldChange('expiry')}
                  onBlur={handleBlur('expiry')}
                  error={errors.expiry}
                  placeholder="MM/YY"
                  required
                />
                <InputField
                  label="CVV"
                  value={values.cvv}
                  onChange={handleFieldChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  error={errors.cvv}
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
