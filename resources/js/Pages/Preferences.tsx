import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import AccountShowContent from '../Components/Account/AccountShowContent'
import AccountBlock from '../Components/Account/AccountBlock'
import AccountShowEdit from '../Components/Account/AccountShowEdit'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Preferences (): JSX.Element {
  const { user, currencies, languages } = usePage<Page<SharedProps>>().props
  const { t } = useLaravelReactI18n()

  return (
    <PageLayout
      title={'Preferences'}
      menu={<IndexPageMenu activeItem={null}/>}
      mainMenuActiveItem={null}
    >
      <AccountBlock
        title={'Language'}
        showContent={<AccountShowContent value={user.communication_lang}/>}
        showEdit={<AccountShowEdit optionsForSelect={languages} value={user.communication_lang} label={t?.('account_pages.language.label') ?? '' } text={t?.('account_pages.language.text') ?? ''}/>}
      />
      <AccountBlock
        title={'Currency'}
        showContent={<AccountShowContent value={user.default_currency}/>}
        showEdit={<AccountShowEdit optionsForSelect={currencies} value={user.default_currency} label={t?.('account_pages.currency.label') ?? ''} text={t?.('account_pages.currency.text') ?? ''}/>}
      />
    </PageLayout>
  )
}
