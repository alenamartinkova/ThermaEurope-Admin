import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import AvatarPlaceholder from '../Icons/AvatarPlaceholder'
import LogoutIcon from '../Icons/LogoutIcon'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { SharedProps } from '../../Interfaces/SharedProps'
import HomeAccount from '../Icons/HomeAccount'

export default function AccountMenu (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { user } = usePage<Page<SharedProps>>().props
  const handleLink = (routeName: string): void => {
    Inertia.visit(route(routeName))
  }

  return (
    <>
      {user !== null &&
        <div className={'account-menu flex flex-no-wrap justify-end'}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className={'account-menu-trigger'} asChild>
              <button
                className={'bg-white h-10 sm:h-13 pl-2.5 pr-2.5 sm:pr-5 justify-center items-center border border-gray-light rounded-25 hover:bg-gray-hover'}>
                <Avatar.Root>
                  <Avatar.Fallback className={'avatar-placeholder flex flex-row flex-nowrap items-center '}>
                    <AvatarPlaceholder/>
                    <span className={'pl-2.5 hidden sm:block'}>TODO</span>
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align={'end'} className="content sm:mt-1 bg-white px-2.5 py-5 left-0 sm:left-auto right-0 sm:right-5 top-15 sm:top-15 w-full sm:w-auto sm:rounded-10 py-2.5 px-2 sm:px-2.5 border-t sm:border-0 border-grey-input">
              <div className={'w-full sm:w-64 min-w-max'}>
                <DropdownMenu.Item className={'cursor-pointer item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}>
                  TODO
                </DropdownMenu.Item>

                <hr className={'mt-2 mb-2'}/>

                <DropdownMenu.Item onSelect={() => handleLink('account.personal_information')} className={'cursor-pointer item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}>
                  <div className={'item-icon w-5 h-5'}>
                    <HomeAccount/>
                  </div>
                  <div className={'text-grey-text'}>{t?.('layout.account_menu.personal_information')}</div>
                </DropdownMenu.Item>

                <DropdownMenu.Item onSelect={() => handleLink('account.preferences')} className={'cursor-pointer item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}>
                  <div className={'item-icon w-5 h-5'}>
                    <HomeAccount/>
                  </div>
                  <div className={'text-grey-text'}>{t?.('layout.account_menu.preferences')}</div>
                </DropdownMenu.Item>

                <DropdownMenu.Item onSelect={() => handleLink('account.security')} className={'cursor-pointer item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}>
                  <div className={'item-icon w-5 h-5'}>
                    <HomeAccount/>
                  </div>
                  <div className={'text-grey-text'}>{t?.('layout.account_menu.security')}</div>
                </DropdownMenu.Item>

                <hr className={'mt-2 mb-2'}/>

                <DropdownMenu.Item onSelect={() => handleLink('logout')} className={'cursor-pointer item flex h-10 flex-row flex-nowrap items-center rounded p-2 gap-x-2.5'}>
                  <div className={'item-icon w-5 h-5'}>
                    <LogoutIcon/>
                  </div>
                  <div className={'text-grey-text'}>{t?.('layout.account_menu.logout')}</div>
                </DropdownMenu.Item>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      }
    </>
  )
}
