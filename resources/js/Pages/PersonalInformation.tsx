import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'

export default function PersonalInformation (): JSX.Element {
  return (
    <PageLayout
      title={'Personal Information'}
      menu={<AccountPageMenu activeItem={'personal-information'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
      Personal Information
    </PageLayout>
  )
}
