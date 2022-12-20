import React from 'react'
import * as Select from '@radix-ui/react-select'
import { Inertia, Page } from '@inertiajs/inertia'
import route from 'ziggy-js'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { SharedProps } from '../../Interfaces/SharedProps'
import { usePage } from '@inertiajs/inertia-react'
import Translate from '../../Libraries/Translate'

export default function LanguageMenu (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { setLang } = useLaravelReactI18n()
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
    <div className="select language-menu flex flex-no-wrap justify-end">
      <Select.Root value={value} onValueChange={ langCode => handleLangChange(langCode)}>
      <Select.Trigger className="language-menu-trigger bg-white h-10 sm:h-13 w-10 sm:w-13 flex justify-center items-center border-none rounded-25 hover:bg-gray-hover">
        <Select.Icon asChild={true}>
          <img src ="/images/layout/language-select-icon.svg" alt={t?.('layout.language_menu.title')}/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="sm:mt-1 content bg-white p-2 fixed left-0 sm:left-auto right-0 sm:right-5 top-15 sm:top-15 w-full sm:w-auto sm:rounded-10 py-2.5 px-2 sm:px-2.5 border-t sm:border-0 border-grey-input">
        <Select.Viewport className="w-full sm:w-64 min-w-max">
          <Select.Group>
            <Select.Label className="font-medium leading-5 p-2">
              <Translate value={'layout.language_menu.title'} />
            </Select.Label>

            {Object.keys(localeNames).map((localeCode) => {
              return (
                <Select.SelectItem key={localeCode} value={localeCode} className={'item items-center rounded flex p-2'}>
                    <img className={'w-5 mr-2'} src={localeNames[localeCode].icon} alt={t?.(localeNames[localeCode].name)}/>
                    <Translate value={localeNames[localeCode].name}/>
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
