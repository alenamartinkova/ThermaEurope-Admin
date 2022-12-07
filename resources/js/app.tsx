import { createInertiaApp } from '@inertiajs/inertia-react'

import '../css/app.scss'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { InertiaProgress } from '@inertiajs/progress'
import { LaravelReactI18nProvider } from 'laravel-react-i18n'
import { SharedProps } from './Interfaces/SharedProps'
import Layout from './Components/Layout'
import { ReactNode } from 'react'

createInertiaApp<SharedProps>({
  resolve: async (name) => {
    const page = (await import(`./Pages/${name}.tsx`))

    if (page.default.layout === undefined) {
      page.default.layout = (page: ReactNode) => <Layout>{page}</Layout>
    }

    return page.default
  },
  setup ({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <LaravelReactI18nProvider
          lang={props.initialPage.props.locale}
          resolve={async (lang: string) => props.initialPage.props.translations[lang]
}
        >
          <App {...props} />
        </LaravelReactI18nProvider>
      </React.StrictMode>
    )

    InertiaProgress.init()
  }
}).catch(() => {})
