import { createInertiaApp } from '@inertiajs/inertia-react'

import '../css/app.scss'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { InertiaProgress } from '@inertiajs/progress'
import { LaravelReactI18nProvider } from 'laravel-react-i18n'
import { LanguageJsonFileInterface } from 'laravel-react-i18n/dist/cjs/interfaces/language-json-file'

createInertiaApp({
  resolve: async (name) => {
    return (await import(`./Pages/${name}.tsx`)).default
  },
  setup ({ el, App, props }) {
    createRoot(el).render(
      <LaravelReactI18nProvider
        lang={'cz'}
        fallbackLang={'pt'}
        resolve={async (lang) => {
          const langs = import.meta.glob<LanguageJsonFileInterface>('../../lang/*.json')
          const fn = langs[`../../lang/${lang}.json`]
          return fn()
        }}>
        <App {...props} />
      </LaravelReactI18nProvider>
    )

    InertiaProgress.init()
  }
}).catch(() => {})
