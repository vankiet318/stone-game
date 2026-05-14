import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  style?: React.CSSProperties;
}

export const Button = ({ children, onClick, disabled, variant = "primary", className = "", style }: ButtonProps) => {
  const baseClass = variant === "primary" ? "btn-primary" : "";
  const secondaryStyle = variant === "secondary" ? {
    background: 'transparent',
    border: '1px solid var(--glass-border)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  } : {};

  return (
    <button 
      className={`${baseClass} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
      style={{ ...secondaryStyle, ...style }}
    >
      {children}
    </button>
  );
};
