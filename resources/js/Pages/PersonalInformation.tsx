import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'

export default function PersonalInformation (): JSX.Element {
  return (
    <PageLayout
      title={'Personal Information'}
      menu={<IndexPageMenu activeItem={null}/>}
      mainMenuActiveItem={null}
    >
      Personal Information
    </PageLayout>
  )
}
