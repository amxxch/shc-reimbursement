import React from 'react'

interface Props {
  label: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
}

const InputFileBox = ({ label, id, name, onChange, isRequired}: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
          type="file"
          accept=".pdf,.jpg,.png" 
          id={id}
          name={name}
          required={isRequired}
          onChange={onChange}
          className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-2000"
      />
  </div>
  )
}

export default InputFileBox
