import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'

export default function Security (): JSX.Element {
  return (
    <PageLayout
      title={'Security'}
      menu={<IndexPageMenu activeItem={null}/>}
      mainMenuActiveItem={null}
    >
      Security
    </PageLayout>
  )
}
