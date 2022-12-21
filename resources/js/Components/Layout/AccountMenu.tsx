import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import AvatarPlaceholder from '../Icons/AvatarPlaceholder'
import LogoutIcon from '../Icons/LogoutIcon'
import route from 'ziggy-js'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { SharedProps } from '../../Interfaces/SharedProps'
import Translate from '../Translate'

export default function AccountMenu (): JSX.Element {
  const { user } = usePage<Page<SharedProps>>().props
  const handleLink = (routeName: string): void => {
    Inertia.visit(route(routeName))
  }

  return (
    <>
      {user !== null &&
        <div className={'account-menu flex flex-no-wrap justify-end'} data-testid="account-menu">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className={'account-menu-trigger'} asChild>
              <button
                className={'bg-white h-10 sm:h-13 pl-2.5 pr-5 justify-center items-center border border-gray-light rounded-25 hover:bg-gray-hover'}>
                <Avatar.Root>
                  <Avatar.Fallback className={'avatar-placeholder flex flex-row flex-nowrap items-center '}>
                    <AvatarPlaceholder/>
                    <span className={'pl-2.5'}>TODO</span>
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align={'end'} className="content sm:mt-1 bg-white px-2.5 py-5 left-0 sm:left-auto right-0 sm:right-5 top-15 sm:top-15 w-full sm:w-auto sm:rounded-10 py-2.5 px-2 sm:px-2.5 border-t sm:border-0 border-grey-input">
              <div className={'w-full sm:w-64 min-w-max'}>
                <DropdownMenu.Item
                  onSelect={() => handleLink('logout')}
                  className={'item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}
                  data-testid="logout"
                >
                  <div className={'item-icon w-5 h-5'}>
                    <LogoutIcon/>
                  </div>
                  <div>
                    <Translate value={'layout.account_menu.logout'}/>
                  </div>
                </DropdownMenu.Item>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      }
    </>
  )
}
