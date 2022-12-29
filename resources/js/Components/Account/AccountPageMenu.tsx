import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import { MenuItem, MenuItemHeading, MenuItemLabel } from '../Layout/PageMenu'
import InfoIcon from '../Icons/InfoIcon'
import PreferencesIcon from '../Icons/PreferencesIcon'
import SecurityIcon from '../Icons/SecurityIcon'
import AccountIcon from '../Icons/AccountIcon'

export default function AccountPageMenu (props: { activeItem: string }): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { activeItem } = props

  return (
    <>
      <MenuItemHeading>
        <AccountIcon />
        <MenuItemLabel>
          {t?.('account_pages.account')}
        </MenuItemLabel>
      </MenuItemHeading>

      <MenuItem key={'personal-information'} onClick={() => Inertia.visit(route('account.personal_information'))} isActive={activeItem === 'personal-information'}>
        <InfoIcon />
        <MenuItemLabel>
          {t?.('account_pages.personal_information.title')}
        </MenuItemLabel>
      </MenuItem>

      <MenuItem key={'preferences'} onClick={() => Inertia.visit(route('account.preferences'))} isActive={activeItem === 'preferences'}>
        <PreferencesIcon />
        <MenuItemLabel>
          {t?.('account_pages.preferences.title')}
        </MenuItemLabel>
      </MenuItem>

      <MenuItem key={'security'} onClick={() => Inertia.visit(route('account.security'))} isActive={activeItem === 'security'}>
        <SecurityIcon />
        <MenuItemLabel>
          {t?.('account_pages.security.title')}
        </MenuItemLabel>
      </MenuItem>
    </>
  )
}
