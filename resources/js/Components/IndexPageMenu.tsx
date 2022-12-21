import React from 'react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import { MenuItem, MenuItemLabel } from './Layout/PageMenu'
import { itemsData, MainMenuActiveItem } from './Layout/MainMenu'
import Translate from './Translate'

export default function IndexPageMenu (props: { activeItem: MainMenuActiveItem }): JSX.Element {
  const { activeItem } = props

  return (
    <>
      { itemsData.map((item) => {
        return (
          <MenuItem
            key={item.activeItem}
            onClick={() => Inertia.visit(route(item.routeName))}
            isActive={activeItem === item.activeItem}
            testId={item.activeItem}
          >
            {item.icon}
            <MenuItemLabel>
              <Translate value={item.label}/>
            </MenuItemLabel>
          </MenuItem>
        )
      })}
    </>
  )
}
