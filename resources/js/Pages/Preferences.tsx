import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'
import AccountBlock from '../Components/AccountBlock'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'

export default function Preferences (): JSX.Element {
  const { user } = usePage<Page<SharedProps>>().props

  return (
    <PageLayout
      title={'Preferences'}
      menu={<IndexPageMenu activeItem={null}/>}
      mainMenuActiveItem={null}
    >
      {/* DEFINE ATTR */}
      <AccountBlock title={'Language'} value={user.communication_lang}/>
      <AccountBlock title={'Currency'} value={user.default_currency}/>
    </PageLayout>
  )
}
