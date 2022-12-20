import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import AccountShowContent from '../Components/Account/AccountShowContent'
import AccountBlock from '../Components/Account/AccountBlock'
import AccountShowEdit from '../Components/Account/AccountShowEdit'

export default function Preferences (): JSX.Element {
  const { user } = usePage<Page<SharedProps>>().props

  return (
    <PageLayout
      title={'Preferences'}
      menu={<IndexPageMenu activeItem={null}/>}
      mainMenuActiveItem={null}
    >
      <AccountBlock
        title={'Language'}
        showContent={<AccountShowContent value={user.communication_lang}/>}
        showEdit={<AccountShowEdit />}
      />
      <AccountBlock
        title={'Currency'}
        showContent={<AccountShowContent value={user.default_currency}/>}
        showEdit={<AccountShowEdit />}
      />
    </PageLayout>
  )
}
