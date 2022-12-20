import React from 'react'
import AccountBlockSelect from './AccountBlockSelect'

export default function AccountShowEdit (props: { optionsForSelect, value: string, label: string, text: string }): JSX.Element {
  const { optionsForSelect, value, label, text } = props

  return (
    <>
      <div className={'mb-2'}>
        <label className={'grey-text mb-1'}>{label}</label>

        {/* DYNAMICKY ROZLISIT CI TAM IDE INPUT ALEBO SELECT */ }
        <AccountBlockSelect
          optionsForSelect={optionsForSelect}
          value={value}
        />

        <p className={'mt-4 grey-text'}>{text}</p>
      </div>
    </>
  )
}
