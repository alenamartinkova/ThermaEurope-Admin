import { PageProps } from '@inertiajs/inertia'

export interface User extends PageProps {
  name: string
  email: string
  image: string
}
