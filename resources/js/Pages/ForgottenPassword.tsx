import React from 'react'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import ForgottenPasswordForm from '../Components/ForgottenPasswordForm'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import ForgottenPasswordMessage from '../Components/ForgottenPasswordMessage'
import { __ } from '../Libraries/Translate'

export default function ForgottenPassword (): JSX.Element {
  const { flash } = usePage<Page<SharedProps>>().props
  const message = flash?.message ?? ''

  return (
    <LoginPageLayout title={__('pageLogin.forgot_password')} text={__('pageLogin.forgot_password_text')}>
      {(message !== '') ? <ForgottenPasswordMessage message={message}/> : <ForgottenPasswordForm/>}
    </LoginPageLayout>
  )
}
