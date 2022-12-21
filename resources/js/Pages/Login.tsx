import React from 'react'
import LoginForm from '../Components/LoginForm'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import Translate from '../Components/Translate'

export default function Login (): JSX.Element {
  return (
    <LoginPageLayout title={<Translate value={'pageLogin.welcome'} />} text={<Translate value={'pageLogin.welcome_text'}/>}>
      <LoginForm/>

      <div className={'w-full flex flex-row justify-center mt-5'}>
        <Link href={route('password.request')} className={'text-blue-active text-xs'}>
          <Translate value={'pageLogin.forgot_password'}/>
        </Link>
      </div>
    </LoginPageLayout>
  )
}
