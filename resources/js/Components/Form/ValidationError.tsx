import React from 'react'

export default function ValidationError (props: { error?: string }): JSX.Element {
  return (
    <>
      {props.error !== undefined && <div className={'text-error-red pt-1'}>{props.error}</div>}
    </>
  )
}
