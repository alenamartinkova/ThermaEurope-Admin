import React from 'react'
import Translate from '../Translate'

export default function AccountShowContentPassword (props: { passwordDate: string }): JSX.Element {
  const { passwordDate } = props

  return (
    <>
      <div className={'mb-3 text-grey-text'}>
        <Translate value={'account_pages.security.password.info_text'} />
      </div>

      <div className={'text-grey-text text-xs'}>
        { /* TODO WHAT WILL WE USE TO FORMAT DATE?*/ }
        <Translate value={'account_pages.security.password.info_date'} replacements={{ date: passwordDate }}/>
      </div>
    </>
  )
}
