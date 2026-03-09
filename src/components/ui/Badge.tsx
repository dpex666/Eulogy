interface BadgeProps {
  label: string;
  variant?: 'free' | 'pro' | 'success' | 'warning';
  className?: string;
}

const variantStyles: Record<string, string> = {
  free: 'bg-[#D4E9CA] text-[#1D4641]',
  pro: 'bg-[#1D4641] text-white',
  success: 'bg-[#00C48C] text-white',
  warning: 'bg-[#FFC466] text-[#180026]',
};

export default function Badge({ label, variant = 'free', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
