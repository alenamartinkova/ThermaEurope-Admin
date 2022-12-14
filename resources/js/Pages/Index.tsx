import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function Index (): JSX.Element {
  return (
    <>
        <h1>Welcome</h1>

        <Link href="/logout">Logout</Link>
    </>
  )
}
