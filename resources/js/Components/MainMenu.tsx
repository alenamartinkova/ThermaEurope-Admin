import React, { useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { isRouteActive } from '../Services/RouteService'
import HomeIcon from './Icons/HomeIcon'
import ReservationsIcon from './Icons/ReservationsIcon'
import HomeClose from './Icons/HomeClose'

export default function MainMenu (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = (): void => setIsOpen(!isOpen)

  return (
    <div className={'main-menu'}>
      {/* Trigger */}
      <button onClick={ () => toggleIsOpen()} className="bg-white hover:bg-gray-hover h-10 sm:h-13 w-10 sm:w-13 flex justify-center items-center border-none rounded-25 hover:bg-gray-hover">
        <img className="w-5" src ="/images/layout/main-menu-hamburger.svg" alt={t?.('layout.main_menu')}/>
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
              <MainMenuItem routeName="home" onClick={toggleIsOpen}>
                <HomeIcon/>
                <span className="pl-2.5">{t?.('layout.main_menu.home')}</span>
              </MainMenuItem>
              <MainMenuItem routeName="reservation.index" onClick={toggleIsOpen}>
                <ReservationsIcon/>
                <span className="pl-2.5">{t?.('layout.main_menu.reservations')}</span>
              </MainMenuItem>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

function MainMenuItem (props: { routeName: string, onClick: () => void, children?: React.ReactNode }): JSX.Element {
  return (
    <Link
      href={route(props.routeName)}
      onClick={props.onClick}
      className={`main-menu-item ${isRouteActive(props.routeName) ? 'active' : ''} flex flex-row flex-nowrap w-64 min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full`}
    >
      {props.children}
    </Link>
  )
}
