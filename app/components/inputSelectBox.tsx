import React from 'react'

interface Props {
  label: string;
  id: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isRequired: boolean
  options: { label: string, value: string }[]
  error?: string;
}

const InputSelectBox = ({ label, id, name, value, onChange, isRequired, options, error}: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
        defaultValue=""
        className="select mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-gray-300 focus:border-gray-500 appearance-none"
      >
        <option value="" disabled />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
  </div>
  )
}

export default InputSelectBox
