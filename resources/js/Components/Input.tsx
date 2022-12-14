import React from 'react'

interface InputProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
}

export default function Input (props: InputProps): JSX.Element {
  const { error, id, placeholder, value, onChange } = props

  return (
    <div>
      <input
        id={id}
        className={`${error !== undefined ? 'error' : ''} input w-full`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error !== undefined && <div className={'text-error-red pt-1'}>{error}</div>}
    </div>
  )
}
