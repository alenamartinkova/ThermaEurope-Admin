import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import Translate from '../Components/Translate'

export default function PersonalInformation (): JSX.Element {
  return (
    <PageLayout
      title={<Translate value={'account_pages.personal_information.title'} />}
      menu={<AccountPageMenu activeItem={'personal-information'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
      Personal Information
    </PageLayout>
  )
}
