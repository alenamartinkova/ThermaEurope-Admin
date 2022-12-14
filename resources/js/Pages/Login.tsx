import React, { useState } from 'react'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { SharedProps } from '../Interfaces/SharedProps'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import Input from '../Components/Input'

export default function Login (): JSX.Element {
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
    <div className={'w-full flex flex-row justify-center pt-6 sm:pt-12 px-7 sm:px-24'}>
      <div className={'w-full max-w-5xl flex flex-row flex-wrap gap-x-12 gap-y-8  justify-center'}>

        <div className={'grow flex flex-col justify-center w-[24rem]'}>
          <h1 className={'text-[2.5rem] leading-[3rem] font-medium text-blue-active'}>
            {t?.('pageLogin.welcome')}
          </h1>
          <hr className={'h-px bg-grey-border border-0 my-3.5'}/>
          <p className={'text-xl text-grey-text'}>{t?.('pageLogin.welcome_text')}</p>
        </div>

        <div className={'grow login-form px-5 py-7 rounded-10 w-[24rem]'}>
          <form onSubmit={handleSubmit} className={'flex flex-col items-stretch'}>
            <div>
              <div className={'pb-3.5'}>
                <Input
                  id="email"
                  placeholder={t?.('pageLogin.login_form.email_placeholder')}
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <div className={'pb-3.5'}>
                <Input
                  id="password"
                  placeholder={t?.('pageLogin.login_form.password_placeholder')}
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
            </div>

            <button type="submit" className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
              {t?.('pageLogin.login_form.log_in')}
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}
