import React from 'react'
import AccountBlockSelect from './AccountBlockSelect'

export default function AccountShowEdit (props: { optionsForSelect: any[], value: string, label: JSX.Element, text: JSX.Element, setValue: React.Dispatch<React.SetStateAction<string>> }): JSX.Element {
  const { optionsForSelect, value, label, text, setValue } = props

  return (
    <>
      <div className={'mb-5'}>
        <label className={'text-grey-text mb-1'}>{label}</label>

        {/* DYNAMICKY ROZLISIT CI TAM IDE INPUT ALEBO SELECT */ }
        <AccountBlockSelect
          optionsForSelect={optionsForSelect}
          value={value}
          setValue={setValue}
        />

        <div className={'mt-4 text-grey-text'}>{text}</div>
      </div>
    </>
  )
}
