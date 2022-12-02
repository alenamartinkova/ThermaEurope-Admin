import { createInertiaApp } from '@inertiajs/inertia-react'

import '../css/app.scss'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { InertiaProgress } from '@inertiajs/progress'

createInertiaApp({
  resolve: async (name) => {
    return (await import(`./Pages/${name}.tsx`)).default
  },
  setup ({ el, App, props }) {
    const root = createRoot(el)
    root.render(React.createElement(App, props))
    InertiaProgress.init()
  }
}).catch(() => {})
