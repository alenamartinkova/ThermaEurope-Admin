import React, { useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import HomeClose from '../Icons/HomeClose'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../../Interfaces/SharedProps'
import MainMenu from './MainMenu'
import { useActiveItem } from '../../Providers/OffCanvasContextProvider'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function OffCanvas (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { user } = usePage<Page<SharedProps>>().props
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = (): void => setIsOpen(!isOpen)
  const offCanvasActiveItem = useActiveItem()

  return (
    <>
      {user !== null &&
        <div className={'main-menu'}>
          {/* Trigger */}
          <button onClick={() => toggleIsOpen()}
                  className="bg-white hover:bg-gray-hover h-10 sm:h-13 w-10 sm:w-13 flex justify-center items-center border-none rounded-25 hover:bg-gray-hover">
            <img className="w-5" src="/images/layout/main-menu-hamburger.svg" alt={t?.('layout.main_menu')}/>
          </button>

          {/* Menu content */}
          {isOpen &&
            <div>
              {/* Overlay */}
              <div onClick={toggleIsOpen} className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50"/>

              {/* Menu content */}
              <div className="bg-white opacity-100 fixed left-0 top-0 bottom-0 w-64 min-w-fit">
                <div className="flex flex-row flex-nowrap justify-between items-center fixed top-0 h-15 sm:h-17 mx-5">
                  {/* Close Button */}
                  <button onClick={toggleIsOpen} className="bg-white hover:bg-gray-hover h-10 sm:h-13 w-10 sm:w-13 flex justify-center items-center border-none rounded-25">
                    <span className={'w-5 h-5'}>
                      <HomeClose/>
                    </span>
                  </button>
                </div>

                {/* Menu Items */}
                <div className={'pt-15 sm:pt-17 pr-7'}>
                  <MainMenu onItemClick={toggleIsOpen} activeItem={offCanvasActiveItem}/>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}
