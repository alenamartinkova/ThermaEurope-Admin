import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import AccountShowContent from '../Components/Account/AccountShowContent'
import AccountBlock from '../Components/Account/AccountBlock'
import AccountShowEdit from '../Components/Account/AccountShowEdit'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import { Language } from '../Interfaces/Models/Language'

export default function Preferences (): JSX.Element {
  const { user, languages } = usePage<Page<SharedProps & { languages: Language[] }>>().props
  const { t } = useLaravelReactI18n()

  return (
    <PageLayout
      title={'Preferences'}
      menu={<AccountPageMenu activeItem={'preferences'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
      <AccountBlock
        title={'Language'}
        showContent={<AccountShowContent value={user.communication_lang}/>}
        showEdit={<AccountShowEdit optionsForSelect={languages} value={user.communication_lang} label={t?.('account_pages.language.label') ?? '' } text={t?.('account_pages.language.text') ?? ''}/>}
      />
    </PageLayout>
  )
}
