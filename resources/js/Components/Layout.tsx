import React, { PropsWithChildren } from 'react'

export default function Layout (props: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <h1>Spanamo.com</h1>
      <article>{props.children}</article>
    </>
  )
}
