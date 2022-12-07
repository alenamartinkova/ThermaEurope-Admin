import React, { useState } from 'react'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { SharedProps } from '../Interfaces/SharedProps'

export default function Login (): JSX.Element {
  const { t, setLang } = useLaravelReactI18n()
  const { errors, localeNames } = usePage<Page<SharedProps>>().props
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    Inertia.post(route('login'), values)
  }

  function handleLang (lang: string): void {
    Inertia.get(route('setLanguage', { language: lang }))
    setLang?.(lang)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(localeNames).map((localeCode) => {
          return (
            <button key={localeCode} onClick={ (e) => { e.preventDefault(); handleLang(localeCode) } }>
              {t?.(localeNames[localeCode])}
            </button>
          )
        })}

        <label htmlFor="email">E-mail:</label>
        <input id="email" value={values.email} onChange={handleChange} />
        {errors.email !== undefined && <div>{errors.email}</div>}

        <label htmlFor="password">password:</label>
        <input id="password" type="password" value={values.password} onChange={handleChange} />
        {errors.password !== undefined && <div>{errors.password}</div>}

        <button type="submit">Submit</button>
      </form>
    </>
  )
}
