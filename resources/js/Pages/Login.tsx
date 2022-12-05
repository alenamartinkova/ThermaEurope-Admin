import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

export default function Login (): JSX.Element {
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

  return (
    <form onSubmit={handleSubmit}>
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
