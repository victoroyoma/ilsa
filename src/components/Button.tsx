import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void | Promise<void>; // Allow Promise<void> for async functions
  className?: string;
  disabled?: boolean; // Add disabled prop
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  variant = 'primary',
  onClick,
  className = '',
  disabled = false, // Default to false
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-300 text-lg relative overflow-hidden group';
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20',
    secondary:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20',
  };
  // Apply disabled styles (e.g., grayed out, no hover effects)
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className} ${disabledStyles}`;

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-white/30 group-hover:w-full transition-all duration-300"></span>
      <span className="absolute -inset-full top-0 block w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_infinite] opacity-0 group-hover:opacity-100"></span>
    </>
  );

  if (to) {
    // For <Link>, prevent navigation if disabled
    return (
      <Link
        to={disabled ? '#' : to} // Prevent navigation when disabled
        className={combinedStyles}
        onClick={(e) => {
          if (disabled) e.preventDefault(); // Prevent click if disabled
          if (onClick) onClick();
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled} // Pass disabled to the native button
    >
      {buttonContent}
    </button>
  );
};