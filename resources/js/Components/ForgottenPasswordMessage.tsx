import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import ReactMarkdown from 'react-markdown'
import { Inertia } from '@inertiajs/inertia'

export default function ForgottenPasswordMessage (props: { message: string }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { message } = props

  return (
    <>
      <ReactMarkdown className={'text-base'}>{message}</ReactMarkdown>

      <button type="submit" onClick={() => Inertia.visit(route('login'))} className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
        {t?.('pageLogin.back_to_login')}
      </button>
    </>
  )
}
