// ===== useForm Custom Hook =====
// Reusable form state + validation strategy.
// - `initialValues`: object of field name -> initial string
// - `validate`: function(values) -> object of field name -> error message (empty = valid)
// Returns controlled helpers wired for the reusable <InputField /> component:
//   values, errors, handleChange, handleBlur, reset, setFieldValue, isValid

import { useState, useCallback, useMemo } from 'react'

export function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = useCallback(
    (field) => (e) => {
      const value = e.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      // Clear an existing error for this field as the user corrects it
      setErrors((prev) => {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    []
  )

  const setFieldValue = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear an existing error for this field when the value changes
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      if (validate) {
        const fieldErrors = validate(values, { only: [field] })
        setErrors((prev) => ({
          ...prev,
          [field]: fieldErrors[field] || '',
        }))
      }
    },
    [validate, values]
  )

  const validateAll = useCallback(() => {
    if (!validate) return true
    const allErrors = validate(values) || {}
    setErrors(allErrors)
    setTouched(
      Object.keys(initialValues).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    )
    return Object.keys(allErrors).length === 0
  }, [validate, values, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const isValid = useMemo(
    () => (validate ? Object.keys(validate(values) || {}).length === 0 : true),
    [validate, values]
  )

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    validateAll,
    reset,
    isValid,
  }
}
