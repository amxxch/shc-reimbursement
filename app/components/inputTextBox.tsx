import React from 'react'

interface Props {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  error?: string;
}

const InputTextBox = ({ label, type, id, name, value, onChange, isRequired, error}: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={isRequired}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-300 focus:border-gray-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
  )
}

export default InputTextBox
