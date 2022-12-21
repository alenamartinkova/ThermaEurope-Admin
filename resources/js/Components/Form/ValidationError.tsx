import React from 'react'

export default function ValidationError (props: { error?: string, className?: string }): JSX.Element {
  const classes = props.className

  return (
    <>
      { props.error !== undefined &&
          <div className={classes}>
            <div className={'text-error-red pt-1'}>{props.error}</div>
          </div>
      }
    </>
  )
}
