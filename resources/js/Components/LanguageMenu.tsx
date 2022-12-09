import React from 'react'
import * as Select from '@radix-ui/react-select'
import { Inertia, Page } from '@inertiajs/inertia'
import route from 'ziggy-js'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { SharedProps } from '../Interfaces/SharedProps'
import { usePage } from '@inertiajs/inertia-react'

export default function LanguageMenu (): JSX.Element {
  const { t, setLang } = useLaravelReactI18n()
  const { locale, localeNames } = usePage<Page<SharedProps>>().props
  const [value, setValue] = React.useState(locale)

  function handleLangChange (langCode: string): void {
    Inertia.visit(
      route('setLanguage', { language: langCode }),
      {
        onSuccess: () => {
          setLang?.(langCode)
          setValue(langCode)
        }
      }
    )
  }

  return (
    <div className="select language-menu">
      <Select.Root value={value} onValueChange={ langCode => handleLangChange(langCode)}>
      <Select.Trigger className="language-menu-trigger">
        <Select.Icon>
          <img src ="/images/layout/language-select-icon.svg" alt="language-select-icon"/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="content">
        <Select.Viewport className="viewport">
          <Select.Group>
            <Select.Label className="title">{t?.('layout.lang_select_title')}</Select.Label>

            {Object.keys(localeNames).map((localeCode) => {
              return (
                <Select.SelectItem key={localeCode} value={localeCode} className={'item'}>
                    <img className={'lang-icon'} src={localeNames[localeCode].icon} alt={t?.(localeNames[localeCode].name)}/>
                    {t?.(localeNames[localeCode].name)}
                </Select.SelectItem>
              )
            })}

          </Select.Group>
        </Select.Viewport>
      </Select.Content>

      </Select.Root>
    </div>
  )
}
