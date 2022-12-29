import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import Translate from '../Components/Translate'

export default function Security (): JSX.Element {
  return (
    <PageLayout
      title={<Translate value={'account_pages.security.title'} />}
      menu={<AccountPageMenu activeItem={'security'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
     Security
    </PageLayout>
  )
}
