import React from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'
import { __ } from '../Libraries/Translate'

export default function Index (): JSX.Element {
  return (
    <PageLayout
      title={__('page_home.title', { name: 'TODO' })}
      menu={<IndexPageMenu activeItem={'home'}/>}
      mainMenuActiveItem={'home'}
    >
      HOME CONTENT!!!
    </PageLayout>
  )
}
