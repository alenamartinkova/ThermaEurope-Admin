import React, { useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { isRouteActive } from '../Services/RouteService'
import HomeIcon from './Icons/HomeIcon'
import ReservationsIcon from './Icons/ReservationsIcon'
import SwipeLeft from './Icons/SwipeLeft'
import SwipeRight from './Icons/SwipeRight'

export default function MainMenu (props: { onItemClick?: () => void, allowCollapse?: boolean }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleIsCollapsed = (): void => setIsCollapsed(!isCollapsed)
  const { onItemClick, allowCollapse } = props

  return (
    <>
      <MainMenuItem routeName="home" onClick={onItemClick} isCollapsed={isCollapsed}>
        <HomeIcon/>
        <span className={`${isCollapsed ? 'hidden' : ''} pl-2.5`}>{t?.('layout.main_menu.home')}</span>
      </MainMenuItem>
      <MainMenuItem routeName="reservation.index" onClick={onItemClick} isCollapsed={isCollapsed}>
        <ReservationsIcon/>
        <span className={`${isCollapsed ? 'hidden' : ''} pl-2.5`}>{t?.('layout.main_menu.reservations')}</span>
      </MainMenuItem>

      <div className={`${!(allowCollapse ?? false) ? 'hidden' : ''} w-10 h-10 ml-3.5 mt-6 flex justify-center items-center rounded-full bg-gray-hover`} onClick={toggleIsCollapsed}>
        <div className={'w-5 h-5'}>
          {isCollapsed ? <SwipeRight/> : <SwipeLeft/>}
        </div>
      </div>
    </>
  )
}

function MainMenuItem (props: { routeName: string, onClick?: () => void, isCollapsed: boolean, children?: React.ReactNode }): JSX.Element {
  return (
    <Link
      href={route(props.routeName)}
      onClick={props.onClick}
      className={`main-menu-item ${isRouteActive(props.routeName) ? 'active' : ''} ${props.isCollapsed ? 'w-14' : 'w-64'} h-12 flex flex-row flex-nowrap min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full`}
    >
      {props.children}
    </Link>
  )
}
