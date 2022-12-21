import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import LoginForm from '../Components/LoginForm'

export default function Login (): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <div className={'w-full flex flex-row justify-center pt-6 sm:pt-12 px-7 sm:px-24'}>
      <div className={'w-full max-w-5xl flex flex-row flex-wrap gap-x-12 gap-y-8  justify-center'}>

        {/* Column Left */}
        <div className={'grow flex flex-col justify-center w-[24rem]'}>
          <h1 className={'text-[2.5rem] leading-[3rem] font-medium text-blue'}>
            {t?.('page_login.welcome')}
          </h1>
          <hr className={'h-px bg-grey-border border-0 my-3.5'}/>
          <p className={'text-xl text-grey-text'}>{t?.('page_login.welcome_text')}</p>
        </div>

        {/* Column Right */}
        <div className={'grow login-form px-5 py-7 rounded-10 w-[24rem]'}>
          <LoginForm/>
        </div>

      </div>
    </div>
  )
}
