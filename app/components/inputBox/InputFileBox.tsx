'use client'

import React, { ReactNode, useRef } from 'react'

interface Props {
  label: string;
  description?: string | ReactNode;
  id: string;
  name: string;
  filename?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  error?: string;
}

const InputFileBox = ({ label, description, id, name, filename, onChange, isRequired, error }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
  <div className="mb-4">
      <label htmlFor={id} className="block text-md font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>
      <label htmlFor={id} className="block mt-1 text-sm text-gray-600">
        {description}
      </label>
      
      {/* Hidden file input that maintains state */}
      <input
        type="file"
        accept=".pdf,.jpg,.png" 
        id={id}
        name={name}
        required={isRequired}
        onChange={onChange}
        ref={fileInputRef}
        className="hidden"
      />
      
      <div className="mt-2 flex items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Choose File
        </button>
        <span className="ml-5 text-sm text-gray-500">
          {filename || "No file chosen"}
        </span>
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  
  )
}

export default InputFileBox
