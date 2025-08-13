import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

// Input Field Component
export const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  className = '',
  disabled = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
            placeholder-gray-400
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Select Field Component
export const SelectField = ({ 
  label, 
  name, 
  options = [], 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  placeholder = 'Select an option',
  className = '',
  disabled = false 
}) => {
  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Textarea Field Component
export const TextareaField = ({ 
  label, 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  rows = 4,
  className = '',
  disabled = false,
  maxLength,
  ...props 
}) => {
  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-vertical
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
            placeholder-gray-400
          `}
          {...props}
        />
        {maxLength && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {value?.length || 0}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Checkbox Field Component
export const CheckboxField = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  error, 
  required = false,
  className = '',
  disabled = false,
  description 
}) => {
  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`
              h-4 w-4 rounded border-gray-300 text-blue-600 
              focus:ring-blue-500 focus:ring-2 transition-all duration-200
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'border-red-500' : ''}
            `}
          />
        </div>
        <div className="text-sm">
          <label 
            htmlFor={name} 
            className={`font-medium text-gray-700 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm ml-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Radio Group Component
export const RadioGroupField = ({ 
  label, 
  name, 
  options = [], 
  value, 
  onChange, 
  error, 
  required = false,
  className = '',
  disabled = false 
}) => {
  return (
    <motion.div 
      className={`space-y-3 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`
                h-4 w-4 border-gray-300 text-blue-600 
                focus:ring-blue-500 focus:ring-2 transition-all duration-200
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
            />
            <label 
              htmlFor={`${name}-${option.value}`}
              className={`text-sm text-gray-700 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

// File Upload Component
export const FileUploadField = ({ 
  label, 
  name, 
  onChange, 
  error, 
  required = false,
  accept,
  multiple = false,
  className = '',
  disabled = false 
}) => {
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onChange({ target: { name, files } });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />
        <div className="space-y-2">
          <div className="text-gray-600">
            <span className="font-medium">Click to upload</span> or drag and drop
          </div>
          {accept && (
            <div className="text-xs text-gray-500">
              Accepted formats: {accept}
            </div>
          )}
        </div>
      </div>
      {error && (
        <motion.div 
          className="flex items-center space-x-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};