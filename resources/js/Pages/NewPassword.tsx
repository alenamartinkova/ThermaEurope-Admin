import React, { useState } from 'react'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import Input from '../Components/Form/Input'
import route from 'ziggy-js'
import ValidationError from '../Components/Form/ValidationError'

export default function NewPassword (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { errors, email, token } = usePage<Page<SharedProps & { email: string, token: string }>>().props
  const [values, setValues] = useState({
    password: '',
    password_confirmation: ''
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
    Inertia.post(route('password.update'), { ...values, email, token })
  }

  return (
    <LoginPageLayout title={t?.('pageLogin.forgot_password') ?? ''} text={t?.('pageLogin.forgot_password_text') ?? ''}>
      <form onSubmit={handleSubmit} className={'flex flex-col items-stretch'}>
        <div>
          <ValidationError error={errors.email}/>

          <div className={'pb-3.5'}>
            <Input
              id="password"
              type="password"
              placeholder={t?.('pageLogin.reset_form.new_password')}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className={'pb-3.5'}>
            <Input
              id="password_confirmation"
              type="password"
              placeholder={t?.('pageLogin.reset_form.new_password_retype')}
              value={values.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
            />
          </div>
        </div>

        <button type="submit" className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
          {t?.('pageLogin.send_link')}
        </button>
      </form>
    </LoginPageLayout>
  )
}
