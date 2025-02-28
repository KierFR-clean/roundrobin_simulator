import React from 'react';
//missed 
//just found on net component
interface LinkedInButtonProps {
  text?: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

const LinkedInButton: React.FC<LinkedInButtonProps> = ({
  text = "",
  url = "https://www.linkedin.com",
  size = "md",
  iconOnly = true
}) => {

    const sizeClasses = {
    sm: {
      button: "px-2 py-1 text-sm",
      icon: "w-4 h-4"
    },
    md: {
      button: "px-3 py-2",
      icon: "w-6 h-6"
    },
    lg: {
      button: "px-4 py-3 text-lg",
      icon: "w-8 h-8"
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center 
        bg-[#fff] text-white 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        rounded hover:bg-[#dedcdc] 
        transition-colors duration-300
        ${sizeClasses[size].button}
        ${iconOnly ? 'aspect-square' : ''}
      `}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`
          ${sizeClasses[size].icon} 
          ${iconOnly ? '' : 'mr-2'}
        `}
      >
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
      </svg>
      {!iconOnly && <span className="font-medium">{text}</span>}
    </a>
  );
};

export default LinkedInButton;