interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  message?: string;
}

const sizeMap = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

export default function LoadingSpinner({
  size = 'md',
  color = '#1D4641',
  message,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        className={`animate-spin ${sizeMap[size]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {message && (
        <p className="text-sm text-[#807388] text-center">{message}</p>
      )}
    </div>
  );
}
