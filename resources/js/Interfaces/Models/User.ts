import { PageProps } from '@inertiajs/inertia'

export interface User extends PageProps {
  name: string
  email: string
  image: string
  communication_lang: string
  default_currency: string
  password_updated_at: string
}
