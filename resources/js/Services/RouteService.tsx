import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import route from 'ziggy-js'

export function isRouteActive (routeName: string): boolean {
  let url = usePage<Page<SharedProps>>().url
  url = url === '/' ? '' : url

  return url === route(routeName, {}, false)
}
