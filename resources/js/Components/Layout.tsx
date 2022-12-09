import React, { PropsWithChildren } from 'react'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import LanguageMenu from './LanguageMenu'

export default function Layout (props: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <header>
        <div className={'wrapper'}>
          <div>
            <div className={'spanamo-logo'}>
              <Link href={route('home')}>
                <img src ="/images/layout/spanamo-logo.svg" alt="Spanamo.com"/>
              </Link>
            </div>
          </div>
          <div>
            <LanguageMenu/>
          </div>
        </div>
      </header>

      <article>{props.children}</article>
    </>
  )
}
