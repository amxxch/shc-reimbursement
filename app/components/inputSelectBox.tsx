'use client'

import React, { useState } from 'react'
interface Props {
  label: string;
  description?: string;
  id: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isRequired: boolean
  options: { label: string, value: string }[]
  error?: string;
}

const InputSelectBox = ({ label, description, id, name, value, onChange, isRequired, options, error}: Props) => {
  const [selectMethod, setSelectedMethod] = useState('');
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-md font-medium text-gray-700">
        {label}
      </label>
      <label htmlFor={id} className="block mt-1 text-sm text-gray-600">{description}</label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
        defaultValue=""
        className="select mt-1 block w-full px-4 py-2 
                  border border-gray-300 bg-white rounded-md shadow-sm 
                  focus:ring-gray-300 focus:border-gray-500 appearance-none"
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
  )
}

export default InputSelectBox
