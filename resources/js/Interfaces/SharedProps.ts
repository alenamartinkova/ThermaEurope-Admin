import { PageProps } from '@inertiajs/inertia'
import { LanguageJsonFileInterface } from 'laravel-react-i18n/src/interfaces/language-json-file'

export interface SharedProps extends PageProps {
  locale: string
  fallbackLang: string
  translations: {
    [key: string]: LanguageJsonFileInterface
  }
  localeNames: {
    [key: string]: string
  }
}
