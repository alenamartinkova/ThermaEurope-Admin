import React from 'react'
import route from 'ziggy-js'
import ReactMarkdown from 'react-markdown'
import { Inertia } from '@inertiajs/inertia'
import { __ } from '../Libraries/Translate'

export default function ForgottenPasswordMessage (props: { message: string }): JSX.Element {
  const { message } = props

  return (
    <>
      <ReactMarkdown className={'text-base'}>{message}</ReactMarkdown>

      <button type="submit" onClick={() => Inertia.visit(route('login'))} className={'bg-blue-active text-white w-full py-3 rounded-10 text-base'}>
        {__('pageLogin.back_to_login')}
      </button>
    </>
  )
}
