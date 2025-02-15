import React from 'react'

interface Props {
  label: string;
  description?: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  error?: string;
}

const InputFileBox = ({ label, description, id, name, onChange, isRequired, error }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-md font-medium text-gray-700">{label}</label>
      <label htmlFor={id} className="block mt-1 text-sm text-gray-600">{description}</label>
      <input
          type="file"
          accept=".pdf,.jpg,.png" 
          id={id}
          name={name}
          required={isRequired}
          onChange={onChange}
          className="mt-2 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-2000"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
  )
}

export default InputFileBox
