import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', onClick }) => {
  return (
    <button className={`logo logo--${size}`} onClick={onClick} aria-label="FPBA-CI — Accueil">
      <div className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F26A1F" />
              <stop offset="100%" stopColor="#C9521A" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#logoGrad)" />
          {/* Stylised pole + crossarm */}
          <rect x="22" y="8" width="4" height="32" rx="1" fill="#fff" />
          <rect x="12" y="14" width="24" height="3" rx="1" fill="#fff" opacity="0.95" />
          <circle cx="14" cy="15.5" r="2" fill="#fff" />
          <circle cx="34" cy="15.5" r="2" fill="#fff" />
        </svg>
      </div>
      <div className="logo__text">
        <span className="logo__name">FPBA-CI</span>
        <span className="logo__sub">Fédération Poteaux Béton Armé CI</span>
      </div>
    </button>
  );
};

export default Logo;
