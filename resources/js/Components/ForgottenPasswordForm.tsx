import Input from './Form/Input'
import React, { useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import route from 'ziggy-js'
import Translate from './Translate'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function ForgottenPasswordForm (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { errors } = usePage<Page<SharedProps>>().props
  const [email, setEmail] = useState('')

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    Inertia.post(route('password.email'), { email, wantsJson: true })
  }

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col items-stretch'} data-testid="forgotten-password-form">
      <div>
        <div className={'pb-3.5'}>
          <Input
            id="email"
            type="text"
            placeholder={t?.('pageLogin.login_form.email_placeholder')}
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
      </div>

      <button type="submit" className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
        <Translate value='pageLogin.send_link'/>
      </button>
    </form>
  )
}
