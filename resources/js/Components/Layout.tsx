import React, { PropsWithChildren } from 'react'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import LanguageMenu from './LanguageMenu'

export default function Layout (props: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <header className={'bg-white flex flex-row flex-nowrap justify-between items-center fixed top-0 w-screen h-15 sm:h-17'}>
        <div className={'w-full mx-5 flex flex-row flex-nowrap justify-between items-center'}>
          <div>
            <div className={'border border-solid border-gray-light rounded-3xl px-5 items-center flex h-10 sm:h-12 w-40 sm:w-full'}>
              <Link href={route('home')}>
                <img src ="/images/layout/spanamo-logo.svg" alt="Spanamo.com" className={'w-full h-full'}/>
              </Link>
            </div>
          </div>
          <div>
            <LanguageMenu/>
          </div>
        </div>
      </header>

      <div className={'pt-15 sm:pt-17'}>
        <article className={'mt-5'}>{props.children}</article>
      </div>
    </>
  )
}
