import React from 'react'

interface ViewFileButtonProps {
    key: string | number;
    href: string;
    color: string;
    text: string;
    className?: string;
}

const ViewFileButton = ({ href, color, text, className } : ViewFileButtonProps) => {

  return (
    <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`px-3 py-1 bg-gray-50 text-${color}-600 rounded-md text-sm hover:bg-gray-100 ${className || ''}`}
  >
    {text}
  </a>
  )
}

export default ViewFileButton
