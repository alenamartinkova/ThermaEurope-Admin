import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'
import Translate from '../Components/Translate'

export default function Index (): JSX.Element {
  return (
    <PageLayout
      title={<Translate value={'page_home.title'} replacements={{ name: 'TODO' }} />}
      menu={<IndexPageMenu activeItem={'home'}/>}
      mainMenuActiveItem={'home'}
      hasHeading={false}
    >
      HOME CONTENT!!!
    </PageLayout>
  )
}
