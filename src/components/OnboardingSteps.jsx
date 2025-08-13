import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Briefcase, Settings, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

const professionalInfoSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  company: z.string().min(2, 'Company name is required'),
  experience: z.string().min(1, 'Please select your experience level'),
  industry: z.string().min(1, 'Please select your industry'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
});

const preferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  theme: z.string().min(1, 'Please select a theme'),
  language: z.string().min(1, 'Please select a language'),
  timezone: z.string().min(1, 'Please select your timezone'),
});

// Progress indicator component
const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

// Step navigation component
const StepNavigation = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-400 hover:border-gray-400'
              }`}
              onClick={() => onStepClick(index)}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 transition-colors duration-300 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Personal Information Step
const PersonalInfoStep = ({ onNext, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo || {},
  });

  const onSubmit = (formData) => {
    setData(prev => ({ ...prev, personalInfo: formData }));
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's start with some basic information about you</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
};

// Professional Information Step
const ProfessionalInfoStep = ({ onNext, onBack, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: data.professionalInfo || { skills: [] },
  });

  const skills = watch('skills') || [];

  const availableSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'MongoDB',
    'AWS', 'Docker', 'Git', 'Agile', 'Project Management', 'Leadership'
  ];

  const toggleSkill = (skill) => {
    const currentSkills = skills || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    setValue('skills', newSkills);
  };

  const onSubmit = (formData) => {
    setData(prev => ({ ...prev, professionalInfo: formData }));
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Information</h2>
        <p className="text-gray-600">Tell us about your professional background</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            {...register('jobTitle')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your job title"
          />
          {errors.jobTitle && (
            <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            {...register('company')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your company name"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              {...register('experience')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6-10 years)</option>
              <option value="lead">Lead/Principal (10+ years)</option>
            </select>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              {...register('industry')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors duration-200 ${
                  skills.includes(skill)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Preferences Step
const PreferencesStep = ({ onNext, onBack, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: data.preferences || {
      notifications: { email: true, push: false, sms: false }
    },
  });

  const notifications = watch('notifications');

  const onSubmit = (formData) => {
    setData(prev => ({ ...prev, preferences: formData }));
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences</h2>
        <p className="text-gray-600">Customize your experience</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Notification Preferences
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                {...register('notifications.email')}
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('notifications.push')}
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Push notifications</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('notifications.sms')}
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              {...register('theme')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select theme</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
            {errors.theme && (
              <p className="mt-1 text-sm text-red-600">{errors.theme.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              {...register('language')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
            {errors.language && (
              <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            {...register('timezone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select timezone</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Paris">Paris (CET)</option>
            <option value="Asia/Tokyo">Tokyo (JST)</option>
          </select>
          {errors.timezone && (
            <p className="mt-1 text-sm text-red-600">{errors.timezone.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Completion Step
const CompletionStep = ({ onBack, data, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Aboard!</h2>
        <p className="text-gray-600">Your onboarding is complete. Let's get started!</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information Summary</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Name:</span>{' '}
            <span className="text-gray-600">
              {data.personalInfo?.firstName} {data.personalInfo?.lastName}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>{' '}
            <span className="text-gray-600">{data.personalInfo?.email}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Job Title:</span>{' '}
            <span className="text-gray-600">{data.professionalInfo?.jobTitle}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Company:</span>{' '}
            <span className="text-gray-600">{data.professionalInfo?.company}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Skills:</span>{' '}
            <span className="text-gray-600">
              {data.professionalInfo?.skills?.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

// Main OnboardingSteps component
const OnboardingSteps = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [data, setData] = React.useState({});

  const steps = [
    { component: PersonalInfoStep, title: 'Personal Info', icon: User },
    { component: ProfessionalInfoStep, title: 'Professional Info', icon: Briefcase },
    { component: PreferencesStep, title: 'Preferences', icon: Settings },
    { component: CompletionStep, title: 'Complete', icon: CheckCircle },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleComplete = () => {
    onComplete(data);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      
      <AnimatePresence mode="wait">
        <CurrentStepComponent
          key={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          onComplete={handleComplete}
          data={data}
          setData={setData}
        />
      </AnimatePresence>
    </div>
  );
};

export default OnboardingSteps;