import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import LoginForm from '../Components/LoginForm'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'

export default function Login (): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <LoginPageLayout title={t?.('pageLogin.welcome') ?? ''} text={t?.('pageLogin.welcome_text') ?? ''}>
      <LoginForm/>

      <div className={'w-full flex flex-row justify-center mt-5'}>
        <Link href={route('password.request')} className={'text-blue-active text-xs'}>
          {t?.('pageLogin.forgot_password')}
        </Link>
      </div>
    </LoginPageLayout>
  )
}
