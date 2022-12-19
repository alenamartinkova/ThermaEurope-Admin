import React from 'react'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import ForgottenPasswordForm from '../Components/ForgottenPasswordForm'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import ForgottenPasswordMessage from '../Components/ForgottenPasswordMessage'

export default function ForgottenPassword (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { flash } = usePage<Page<SharedProps>>().props
  const message = flash?.message ?? ''

  return (
    <LoginPageLayout title={t?.('pageLogin.forgot_password') ?? ''} text={t?.('pageLogin.forgot_password_text') ?? ''}>
      {(message !== '') ? <ForgottenPasswordMessage message={message}/> : <ForgottenPasswordForm/>}
    </LoginPageLayout>
  )
}
