import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Login (): JSX.Element {
  const { t, setLang } = useLaravelReactI18n()
  const { errors } = usePage().props
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
    setLang?.(lang)
  }

  return (
    <form onSubmit={handleSubmit}>
      { t?.('validation.required') }

      <button onClick={ (e) => { e.preventDefault(); handleLang('en') } }>EN</button>
      <button onClick={ (e) => { e.preventDefault(); handleLang('cz') } }>CZ</button>

      <label htmlFor="email">E-mail:</label>
      <input id="email" value={values.email} onChange={handleChange} />
      {errors.email !== undefined && <div>{errors.email}</div>}

      <label htmlFor="password">password:</label>
      <input id="password" value={values.password} onChange={handleChange} />
      {errors.password !== undefined && <div>{errors.password}</div>}

      <button type="submit">Submit</button>
    </form>
  )
}
