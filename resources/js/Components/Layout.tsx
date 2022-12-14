import React, { PropsWithChildren } from 'react'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import LanguageMenu from './LanguageMenu'
import OffCanvas from './OffCanvas'
import AccountMenu from './AccountMenu'

export default function Layout (props: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <header className={'bg-white flex flex-row flex-nowrap justify-between items-center fixed top-0 w-screen h-15 sm:h-17'}>
        <div className={'w-full mx-5 flex flex-row flex-nowrap justify-between items-center'}>
          <div className={'flex flex-row flex-nowrap items-center gap-x-3.5'}>

            <OffCanvas/>

            {/* Logo */}
            <Link href={route('home')} className={'border border-solid border-gray-light rounded-3xl px-5 items-center flex h-10 sm:h-12 w-40 sm:w-full'}>
              <span>
                <img src="/images/layout/spanamo-logo.svg" alt="Spanamo.com" className={'w-full h-full'}/>
              </span>
            </Link>
          </div>

          <div className={'flex flex-row flex-nowrap gap-x-3.5 pl-3.5'}>
            <AccountMenu/>
            <LanguageMenu/>
          </div>

        </div>
      </header>

      <div className={'py-15 sm:py-17'}>
        <article>{props.children}</article>
      </div>
    </>
  )
}
