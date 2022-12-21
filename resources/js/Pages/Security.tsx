import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'

export default function Security (): JSX.Element {
  const { user } = usePage<Page<SharedProps>>().props
  return (
    <PageLayout
      title={'Security'}
      menu={<AccountPageMenu activeItem={'security'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
     Security
    </PageLayout>
  )
}
