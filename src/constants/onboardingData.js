// Onboarding steps configuration and form field definitions
export const ONBOARDING_STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: 'User',
    fields: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth']
  },
  {
    id: 'address',
    title: 'Address Details',
    description: 'Where are you located?',
    icon: 'MapPin',
    fields: ['street', 'city', 'state', 'zipCode', 'country']
  },
  {
    id: 'account',
    title: 'Account Setup',
    description: 'Create your account',
    icon: 'Settings',
    fields: ['username', 'password', 'confirmPassword']
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    icon: 'Heart',
    fields: ['notifications', 'theme', 'language', 'newsletter', 'terms']
  }
];

// Form field configurations
export const FORM_FIELDS = {
  // Personal Information Fields
  firstName: {
    type: 'input',
    inputType: 'text',
    label: 'First Name',
    placeholder: 'Enter your first name',
    required: true,
    validation: {
      required: 'First name is required',
      minLength: { value: 2, message: 'First name must be at least 2 characters' },
      maxLength: { value: 50, message: 'First name must be less than 50 characters' }
    }
  },
  lastName: {
    type: 'input',
    inputType: 'text',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    required: true,
    validation: {
      required: 'Last name is required',
      minLength: { value: 2, message: 'Last name must be at least 2 characters' },
      maxLength: { value: 50, message: 'Last name must be less than 50 characters' }
    }
  },
  email: {
    type: 'input',
    inputType: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    required: true,
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address'
      }
    }
  },
  phone: {
    type: 'input',
    inputType: 'tel',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: true,
    validation: {
      required: 'Phone number is required',
      pattern: {
        value: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Please enter a valid phone number'
      }
    }
  },
  dateOfBirth: {
    type: 'input',
    inputType: 'date',
    label: 'Date of Birth',
    placeholder: 'Select your date of birth',
    required: true,
    validation: {
      required: 'Date of birth is required',
      validate: {
        notFuture: (value) => {
          const today = new Date();
          const birthDate = new Date(value);
          return birthDate <= today || 'Date of birth cannot be in the future';
        },
        minimumAge: (value) => {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 13 || 'You must be at least 13 years old';
        }
      }
    }
  },

  // Address Fields
  street: {
    type: 'input',
    inputType: 'text',
    label: 'Street Address',
    placeholder: 'Enter your street address',
    required: true,
    validation: {
      required: 'Street address is required',
      minLength: { value: 5, message: 'Street address must be at least 5 characters' }
    }
  },
  city: {
    type: 'input',
    inputType: 'text',
    label: 'City',
    placeholder: 'Enter your city',
    required: true,
    validation: {
      required: 'City is required',
      minLength: { value: 2, message: 'City must be at least 2 characters' }
    }
  },
  state: {
    type: 'select',
    label: 'State/Province',
    placeholder: 'Select your state',
    required: true,
    options: [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'NY', label: 'New York' },
      { value: 'TX', label: 'Texas' }
    ],
    validation: {
      required: 'State is required'
    }
  },
  zipCode: {
    type: 'input',
    inputType: 'text',
    label: 'ZIP/Postal Code',
    placeholder: 'Enter your ZIP code',
    required: true,
    validation: {
      required: 'ZIP code is required',
      pattern: {
        value: /^\d{5}(-\d{4})?$/,
        message: 'Please enter a valid ZIP code'
      }
    }
  },
  country: {
    type: 'select',
    label: 'Country',
    placeholder: 'Select your country',
    required: true,
    options: [
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'UK', label: 'United Kingdom' },
      { value: 'AU', label: 'Australia' },
      { value: 'DE', label: 'Germany' },
      { value: 'FR', label: 'France' },
      { value: 'JP', label: 'Japan' },
      { value: 'OTHER', label: 'Other' }
    ],
    validation: {
      required: 'Country is required'
    }
  },

  // Account Fields
  username: {
    type: 'input',
    inputType: 'text',
    label: 'Username',
    placeholder: 'Choose a username',
    required: true,
    validation: {
      required: 'Username is required',
      minLength: { value: 3, message: 'Username must be at least 3 characters' },
      maxLength: { value: 20, message: 'Username must be less than 20 characters' },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: 'Username can only contain letters, numbers, and underscores'
      }
    }
  },
  password: {
    type: 'input',
    inputType: 'password',
    label: 'Password',
    placeholder: 'Create a password',
    required: true,
    validation: {
      required: 'Password is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        message: 'Password must contain uppercase, lowercase, number, and special character'
      }
    }
  },
  confirmPassword: {
    type: 'input',
    inputType: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true,
    validation: {
      required: 'Please confirm your password',
      validate: (value, formValues) => {
        return value === formValues.password || 'Passwords do not match';
      }
    }
  },

  // Preferences Fields
  notifications: {
    type: 'radioGroup',
    label: 'Email Notifications',
    required: true,
    options: [
      { value: 'all', label: 'All notifications' },
      { value: 'important', label: 'Important only' },
      { value: 'none', label: 'No notifications' }
    ],
    validation: {
      required: 'Please select a notification preference'
    }
  },
  theme: {
    type: 'select',
    label: 'Theme Preference',
    placeholder: 'Choose your theme',
    required: false,
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' }
    ]
  },
  language: {
    type: 'select',
    label: 'Language',
    placeholder: 'Select your language',
    required: true,
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'ja', label: 'Japanese' },
      { value: 'zh', label: 'Chinese' }
    ],
    validation: {
      required: 'Language selection is required'
    }
  },
  newsletter: {
    type: 'checkbox',
    label: 'Subscribe to newsletter',
    description: 'Receive updates about new features and announcements',
    required: false
  },
  terms: {
    type: 'checkbox',
    label: 'I agree to the Terms of Service and Privacy Policy',
    required: true,
    validation: {
      required: 'You must agree to the terms and conditions'
    }
  }
};

// Default form values
export const DEFAULT_FORM_VALUES = {
  // Personal Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  
  // Address
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  
  // Account
  username: '',
  password: '',
  confirmPassword: '',
  
  // Preferences
  notifications: 'important',
  theme: 'system',
  language: 'en',
  newsletter: false,
  terms: false
};

// Progress calculation helpers
export const calculateStepProgress = (stepId, formData) => {
  const step = ONBOARDING_STEPS.find(s => s.id === stepId);
  if (!step) return 0;

  const requiredFields = step.fields.filter(fieldName => {
    const field = FORM_FIELDS[fieldName];
    return field && field.required;
  });

  const completedFields = requiredFields.filter(fieldName => {
    const value = formData[fieldName];
    return value !== undefined && value !== null && value !== '';
  });

  return Math.round((completedFields.length / requiredFields.length) * 100);
};

export const calculateOverallProgress = (formData) => {
  const totalSteps = ONBOARDING_STEPS.length;
  const completedSteps = ONBOARDING_STEPS.filter(step => 
    calculateStepProgress(step.id, formData) === 100
  ).length;

  return Math.round((completedSteps / totalSteps) * 100);
};

// Navigation helpers
export const getNextStepId = (currentStepId) => {
  const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === currentStepId);
  if (currentIndex === -1 || currentIndex === ONBOARDING_STEPS.length - 1) {
    return null;
  }
  return ONBOARDING_STEPS[currentIndex + 1].id;
};

export const getPreviousStepId = (currentStepId) => {
  const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === currentStepId);
  if (currentIndex <= 0) {
    return null;
  }
  return ONBOARDING_STEPS[currentIndex - 1].id;
};

export const getStepByIndex = (index) => {
  return ONBOARDING_STEPS[index] || null;
};

export const getStepById = (stepId) => {
  return ONBOARDING_STEPS.find(step => step.id === stepId) || null;
};

export const getCurrentStepIndex = (stepId) => {
  return ONBOARDING_STEPS.findIndex(step => step.id === stepId);
};

export const isFirstStep = (stepId) => {
  return getCurrentStepIndex(stepId) === 0;
};

export const isLastStep = (stepId) => {
  return getCurrentStepIndex(stepId) === ONBOARDING_STEPS.length - 1;
};