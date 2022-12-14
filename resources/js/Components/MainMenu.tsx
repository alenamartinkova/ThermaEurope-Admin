import React, { useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { isRouteActive } from '../Services/RouteService'
import HomeIcon from './Icons/HomeIcon'
import ReservationsIcon from './Icons/ReservationsIcon'

export default function MainMenu (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = (): void => setIsOpen(!isOpen)

  return (
    <>
      <MainMenuItem routeName="home" onClick={toggleIsOpen}>
        <HomeIcon/>
        <span className="pl-2.5">{t?.('layout.main_menu.home')}</span>
      </MainMenuItem>
      <MainMenuItem routeName="reservation.index" onClick={toggleIsOpen}>
        <ReservationsIcon/>
        <span className="pl-2.5">{t?.('layout.main_menu.reservations')}</span>
      </MainMenuItem>
    </>
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
