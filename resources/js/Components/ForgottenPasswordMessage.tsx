import React from 'react'
import route from 'ziggy-js'
import ReactMarkdown from 'react-markdown'
import { Inertia } from '@inertiajs/inertia'
import Translate from './Translate'

export default function ForgottenPasswordMessage (props: { message: string }): JSX.Element {
  const { message } = props

  return (
    <>
      <ReactMarkdown className={'text-base'}>{message}</ReactMarkdown>

      <button
        type="submit"
        onClick={() => Inertia.visit(route('login'))}
        className={'bg-blue-active text-white w-full py-3 rounded-10 text-base mt-5'}
        data-testid="back-to-login-button"
      >
        <Translate value={'pageLogin.back_to_login'} />
      </button>
    </>
  )
}
