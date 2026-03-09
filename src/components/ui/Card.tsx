import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  elevated?: boolean;
}

export default function Card({
  bordered = false,
  elevated = false,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-white p-6
        ${bordered ? 'border border-[#D4E9CA]' : ''}
        ${elevated ? 'shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
