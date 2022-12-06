import { createInertiaApp } from '@inertiajs/inertia-react'

import '../css/app.scss'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { InertiaProgress } from '@inertiajs/progress'
import { LaravelReactI18nProvider } from 'laravel-react-i18n'
import { LanguageJsonFileInterface } from 'laravel-react-i18n/src/interfaces/language-json-file'
import { PageProps } from '@inertiajs/inertia'

interface SharedProps extends PageProps {
  locale: string
  translations: {
    [key: string]: LanguageJsonFileInterface
  }
}

createInertiaApp<SharedProps>({
  resolve: async (name) => {
    return (await import(`./Pages/${name}.tsx`)).default
  },
  setup ({ el, App, props }) {
    createRoot(el).render(
      <LaravelReactI18nProvider
        lang={props.initialPage.props.locale}
        fallbackLang={'en'}
        resolve={async (lang: string) => {
          return props.initialPage.props.translations[lang]
        }}
      >
        <App {...props} />
      </LaravelReactI18nProvider>
    )

    InertiaProgress.init()
  }
}).catch(() => {})
