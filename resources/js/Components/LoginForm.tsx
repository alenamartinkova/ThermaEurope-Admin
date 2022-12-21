import Input from './Form/Input'
import React, { useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import route from 'ziggy-js'
import Translate from './Translate'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function LoginForm (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { errors } = usePage<Page<SharedProps>>().props
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
    <form onSubmit={handleSubmit} className={'flex flex-col items-stretch'}>
      <div>
        <div className={'pb-3.5'}>
          <Input
            id="email"
            type="text"
            placeholder={t?.('pageLogin.login_form.email_placeholder')}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div className={'pb-3.5'}>
          <Input
            id="password"
            type="password"
            placeholder={t?.('pageLogin.login_form.password_placeholder')}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
      </div>

      <button type="submit" className={'bg-blue hover:bg-blue-hover active:bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
        <Translate value={'pageLogin.login_form.log_in'} />
      </button>
    </form>
  )
}
