import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export const Card = ({ children, className = "", onClick, active = false }: CardProps) => (
  <div 
    className={`glass-card ${active ? 'active' : ''} ${className}`} 
    onClick={onClick}
    style={{
      background: active ? 'rgba(212, 175, 55, 0.2)' : undefined,
      borderColor: active ? 'var(--accent-gold)' : undefined,
    }}
  >
    {children}
  </div>
);
