import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'

export default function Index (): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <PageLayout
      title={t?.('page_home.title', { name: 'TODO' }) ?? ''}
      menu={<IndexPageMenu activeItem={'home'}/>}
      mainMenuActiveItem={'home'}
      hasHeading={false}
    >
      HOME CONTENT!!!
    </PageLayout>
  )
}
