import { z } from 'zod'

// Common validation patterns
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z
    .string()
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 120
    }, 'You must be at least 18 years old'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'], {
    required_error: 'Please select your gender'
  })
})

// Address Information Schema
export const addressSchema = z.object({
  street: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(100, 'Street address must be less than 100 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
  country: z
    .string()
    .min(2, 'Please select a country')
})

// Account Information Schema
export const accountSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
  newsletter: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Preferences Schema
export const preferencesSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest')
    .max(10, 'Please select no more than 10 interests'),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean()
  }),
  language: z
    .string()
    .min(2, 'Please select a language'),
  timezone: z
    .string()
    .min(1, 'Please select a timezone'),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
})

// Complete onboarding schema
export const onboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  account: accountSchema,
  preferences: preferencesSchema
})

// Individual field validators
export const validateEmail = (email) => {
  try {
    z.string().email().parse(email)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: error.errors[0]?.message || 'Invalid email' }
  }
}

export const validatePassword = (password) => {
  try {
    z.string().min(8).regex(passwordRegex).parse(password)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: error.errors[0]?.message || 'Invalid password' }
  }
}

export const validatePhone = (phone) => {
  try {
    z.string().regex(phoneRegex).parse(phone)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: 'Please enter a valid phone number' }
  }
}

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  return { isValid: true, error: null }
}

export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must be at least ${minLength} characters` 
    }
  }
  return { isValid: true, error: null }
}

export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must be less than ${maxLength} characters` 
    }
  }
  return { isValid: true, error: null }
}

// Step validation function
export const validateStep = (stepData, stepType) => {
  try {
    switch (stepType) {
      case 'personal':
        personalInfoSchema.parse(stepData)
        break
      case 'address':
        addressSchema.parse(stepData)
        break
      case 'account':
        accountSchema.parse(stepData)
        break
      case 'preferences':
        preferencesSchema.parse(stepData)
        break
      default:
        throw new Error('Invalid step type')
    }
    return { isValid: true, errors: {} }
  } catch (error) {
    const errors = {}
    error.errors?.forEach((err) => {
      errors[err.path[0]] = err.message
    })
    return { isValid: false, errors }
  }
}

// Form data sanitization
export const sanitizeFormData = (data) => {
  const sanitized = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim()
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeFormData(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

// Progress calculation
export const calculateProgress = (formData) => {
  const steps = ['personalInfo', 'address', 'account', 'preferences']
  let completedSteps = 0
  
  steps.forEach((step) => {
    if (formData[step]) {
      const validation = validateStep(formData[step], step.replace('Info', ''))
      if (validation.isValid) {
        completedSteps++
      }
    }
  })
  
  return Math.round((completedSteps / steps.length) * 100)
}

// Get validation errors for display
export const getFieldError = (errors, fieldPath) => {
  const pathArray = fieldPath.split('.')
  let error = errors
  
  for (const path of pathArray) {
    if (error && typeof error === 'object' && path in error) {
      error = error[path]
    } else {
      return null
    }
  }
  
  return typeof error === 'string' ? error : null
}

// Check if field has error
export const hasFieldError = (errors, fieldPath) => {
  return getFieldError(errors, fieldPath) !== null
}

// Format validation errors for display
export const formatValidationErrors = (zodError) => {
  const formattedErrors = {}
  
  zodError.errors?.forEach((error) => {
    const path = error.path.join('.')
    formattedErrors[path] = error.message
  })
  
  return formattedErrors
}