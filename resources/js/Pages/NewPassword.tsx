import React, { useState } from 'react'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import Input from '../Components/Form/Input'
import route from 'ziggy-js'
import ValidationError from '../Components/Form/ValidationError'
import Translate from '../Components/Translate'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import generator from 'generate-password-ts'

export default function NewPassword (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { errors, email, token } = usePage<Page<SharedProps & { email: string, token: string }>>().props
  const [showPassword, setShowPassword] = useState(false)
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

  function generatePassword (e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    let password = ''

    // generator sometimes generate password without number
    while (!(/\d/).test(password)) {
      password = generator.generate({
        length: 10,
        numbers: true
      })
    }

    setValues(values => ({
      ...values,
      password,
      password_confirmation: password
    }))

    setShowPassword(true)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    Inertia.post(route('password.update'), { ...values, email, token })
  }

  return (
    <LoginPageLayout title={<Translate value={'pageLogin.new_password'}/>} text={<Translate value={'pageLogin.new_password_text'}/>}>
      <form onSubmit={handleSubmit} className={'flex flex-col items-stretch'} data-testid="new-password-form">
        <div>
          <ValidationError className={'pb-3.5'} error={errors.email}/>

          <div className={'pb-3.5'}>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t?.('pageLogin.new_password')}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className={'pb-3.5'}>
            <Input
              id="password_confirmation"
              type={showPassword ? 'text' : 'password'}
              placeholder={t?.('pageLogin.confirm_password')}
              value={values.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}
          data-testid="generate-password-button"
        >
          <Translate value={'pageLogin.generate_password'} />
        </button>

        <hr className={'h-px bg-grey-border border-0 my-5 mx-4 md:mx-0'}/>

        <button type="submit" className={'bg-green-active text-white w-full py-3 rounded-10 text-base'}>
          <Translate value={'pageLogin.set_new_password'} />
        </button>
      </form>
    </LoginPageLayout>
  )
}
