import React from 'react'

interface InputProps {
  id: string
  type: 'text' | 'password'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
}

export default function Input (props: InputProps): JSX.Element {
  const { error, id, type, placeholder, value, onChange } = props

  return (
    <div>
      <input
        id={id}
        type={type}
        className={`${error !== undefined ? 'error' : ''} input w-full`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error !== undefined && <div className={'text-error-red pt-1'}>{error}</div>}
    </div>
  )
}
