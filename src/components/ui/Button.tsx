import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  showArrow = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#E63946] to-[#C92A37] text-white hover:from-[#FF2E4D] hover:to-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.35)] hover:shadow-[0_0_30px_rgba(255,46,77,0.5)] border border-[#FF2E4D]/40',
    secondary:
      'bg-[#161A26] text-white hover:bg-[#1F2433] border border-white/10 hover:border-[#E63946]/40 shadow-md',
    outline:
      'bg-transparent text-white border border-[#E63946]/60 hover:bg-[#E63946]/10 hover:border-[#FF2E4D] shadow-[0_0_15px_rgba(230,57,70,0.15)]',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-transparent',
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {/* Dynamic Hover Light Beam Effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
};
