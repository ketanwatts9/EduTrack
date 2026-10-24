// ===== Validation Strategies =====
// Small, composable validators. Each returns an error string (empty = valid)
// so they can be combined into a per-form `validate(values)` function.

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address'

export const required = (value, label = 'This field') =>
  value && value.trim() ? '' : `${label} is required`

export const minLength = (value, n, label = 'This field') =>
  value && value.length >= n ? '' : `${label} must be at least ${n} characters`

export const maxLength = (value, n, label = 'This field') =>
  !value || value.length <= n ? '' : `${label} must be ${n} characters or fewer`

export const matches = (a, b, label = 'Values') =>
  a === b ? '' : `${label} do not match`

// Luhn checksum for card numbers (strips non-digits first)
export const isCardNumber = (value) => {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return 'Enter a valid card number'
  let sum = 0
  let dbl = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10)
    if (dbl) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    dbl = !dbl
  }
  return sum % 10 === 0 ? '' : 'Enter a valid card number'
}

export const isExpiry = (value) => {
  const m = (value || '').match(/^(\d{2})\/(\d{2})$/)
  if (!m) return 'Use MM/YY format'
  const month = parseInt(m[1], 10)
  const year = 2000 + parseInt(m[2], 10)
  if (month < 1 || month > 12) return 'Invalid month'
  const expiry = new Date(year, month, 0, 23, 59, 59)
  return expiry >= new Date() ? '' : 'Card has expired'
}

export const isCvv = (value) =>
  /^\d{3,4}$/.test((value || '').trim()) ? '' : 'Enter a valid CVV'

// Auto-format helpers (return formatted strings for controlled inputs)
export const formatCardNumber = (value) =>
  (value || '')
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

export const formatExpiry = (value) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export const formatCvv = (value) => (value || '').replace(/\D/g, '').slice(0, 4)
