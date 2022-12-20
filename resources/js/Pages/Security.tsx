import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'

export default function Security (): JSX.Element {
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
