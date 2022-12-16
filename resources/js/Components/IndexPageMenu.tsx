import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import { MenuItem, MenuItemLabel } from './Layout/PageMenu'
import { itemsData, MainMenuActiveItem } from './Layout/MainMenu'

export default function IndexPageMenu (props: { activeItem: MainMenuActiveItem }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { activeItem } = props

  return (
    <>
      { itemsData.map((item) => {
        return (
          <MenuItem key={item.activeItem} onClick={() => Inertia.visit(route(item.routeName))} isActive={activeItem === item.activeItem}>
            {item.icon}
            <MenuItemLabel>
              {t?.(item.label)}
            </MenuItemLabel>
          </MenuItem>
        )
      })}
    </>
  )
}
