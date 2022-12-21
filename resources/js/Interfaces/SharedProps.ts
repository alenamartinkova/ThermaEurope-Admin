import { PageProps } from '@inertiajs/inertia'
import { LanguageJsonFileInterface } from 'laravel-react-i18n/src/interfaces/language-json-file'
import { User } from './Models/User'

export interface SharedProps extends PageProps {
  locale: string
  fallbackLang: string
  translations: {
    [key: string]: LanguageJsonFileInterface
  }
  localeNames: {
    [key: string]: {
      name: string
      icon: string
    }
  }
  user: User
  flash: {
    message?: string
  }
  csrf_token: string
}
