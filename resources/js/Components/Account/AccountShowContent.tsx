import React from 'react'

export default function AccountShowContent (props: { value: string }): JSX.Element {
  const { value } = props

  return (
    <>
      <p className={'mb-5 grey-text'}>{value}</p>
    </>
  )
}
