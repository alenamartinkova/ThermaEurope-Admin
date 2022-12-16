import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import MainMenu from '../Components/Layout/MainMenu'
import PageLayout from '../Components/Layout/PageLayout'

export default function Index (): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <PageLayout
      title={t?.('page_home.title', { name: 'TODO' }) ?? ''}
      menu={<MainMenu activeItem={'home'}/>}
      mainMenuActiveItem={'home'}
    >
      HOME CONTENT!!!
    </PageLayout>
  )
}
