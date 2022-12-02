import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'

export default function Index (): JSX.Element {
  return (
    <div>
        <Head title="Welcome" />

        <h1>Welcome</h1>
        <Link href="/logout">Logout</Link>
    </div>
  )
}
