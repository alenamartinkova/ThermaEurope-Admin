import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import HomeIcon from '../Icons/HomeIcon'
import ReservationsIcon from '../Icons/ReservationsIcon'
import { Inertia } from '@inertiajs/inertia'
import { MenuItem, MenuItemLabel } from './PageMenu'

export type MainMenuActiveItem = null | 'home' | 'reservation'

export default function MainMenu (props: { activeItem: MainMenuActiveItem }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { activeItem } = props

  return (
    <>
      <MenuItem onClick={() => Inertia.visit(route('home'))} isActive={activeItem === 'home'}>
        <HomeIcon/>
        <MenuItemLabel>
          {t?.('layout.main_menu.home')}
        </MenuItemLabel>
      </MenuItem>

      <MenuItem onClick={() => Inertia.visit(route('reservation.index'))} isActive={activeItem === 'reservation'}>
        <ReservationsIcon/>
        <MenuItemLabel>
          {t?.('layout.main_menu.reservations')}
        </MenuItemLabel>
      </MenuItem>
    </>
  )
}
