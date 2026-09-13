// ===== InputField Component =====
// Reusable form input with label, error message, and help text.

import { useId } from 'react'
import './InputField.css'

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  helpText = '',
  required = false,
  textarea = false,
  rows = 4,
  options = [],
  ...rest
}) {
  const id = useId()

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={id} className="input-field__label">
          {label}
          {required && <span className="input-field__required">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={id}
          className={`input-field__input ${error ? 'input-field__input--error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          {...rest}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          className={`input-field__input ${error ? 'input-field__input--error' : ''}`}
          value={value}
          onChange={onChange}
          required={required}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={`input-field__input ${error ? 'input-field__input--error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      )}

      {helpText && !error && <p className="input-field__help">{helpText}</p>}
      {error && <p className="input-field__error">{error}</p>}
    </div>
  )
}
