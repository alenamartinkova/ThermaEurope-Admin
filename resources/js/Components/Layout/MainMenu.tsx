import React, { PropsWithChildren } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import HomeIcon from '../Icons/HomeIcon'
import { Inertia } from '@inertiajs/inertia'
import ReservationsIcon from '../Icons/ReservationsIcon'

export type MainMenuActiveItem = null | 'home' | 'reservation'

export const itemsData: Array<{ routeName: string, activeItem: MainMenuActiveItem, label: string, icon: JSX.Element }> = [
  {
    routeName: 'home',
    activeItem: 'home',
    label: 'layout.main_menu.home',
    icon: <HomeIcon/>
  },
  {
    routeName: 'reservation.index',
    activeItem: 'reservation',
    label: 'layout.main_menu.reservations',
    icon: <ReservationsIcon/>
  }
]

export default function MainMenu (props: { activeItem: MainMenuActiveItem, onItemClick?: () => void }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { activeItem, onItemClick } = props

  const handleItemClick = (routeName: string): void => {
    onItemClick?.()
    Inertia.visit(route(routeName))
  }

  return (
    <>
      { itemsData.map((item) => {
        return (
          <MenuItem key={item.activeItem} onClick={() => handleItemClick(item.routeName)} isActive={activeItem === item.activeItem}>
            {item.icon}
            <div className={'pl-2.5'}>
              {t?.(item.label)}
            </div>
          </MenuItem>
        )
      })}
    </>
  )
}

export function MenuItem (props: PropsWithChildren<{ isActive?: boolean, onClick: () => void }>): JSX.Element {
  return (
    <div
      onClick={props.onClick}
      className={`page-menu-item ${(props.isActive ?? false) ? 'active' : ''} w-64 cursor-pointer h-12 flex flex-row flex-nowrap min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full active:bg-gray-light items-center`}
    >
      {props.children}
    </div>
  )
}
