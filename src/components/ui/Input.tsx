import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const baseInputStyles = `
  w-full rounded-lg border border-[#D4E9CA] bg-white px-4 py-3
  text-[#180026] placeholder-[#807388]
  focus:outline-none focus:ring-2 focus:ring-[#1D4641] focus:border-[#1D4641]
  transition-colors duration-150
  disabled:bg-[#F3F7FA] disabled:cursor-not-allowed
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-semibold text-[#180026]">{label}</label>
        )}
        <input
          ref={ref}
          className={`${baseInputStyles} ${error ? 'border-[#FF4E68] focus:ring-[#FF4E68]' : ''} ${className}`}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-[#807388]">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-[#FF4E68]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-semibold text-[#180026]">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`${baseInputStyles} min-h-[120px] resize-y ${error ? 'border-[#FF4E68] focus:ring-[#FF4E68]' : ''} ${className}`}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-[#807388]">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-[#FF4E68]">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
