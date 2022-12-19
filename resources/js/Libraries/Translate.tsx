import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { ReplacementsInterface } from 'laravel-react-i18n/src/interfaces/replacements'
import ReactMarkdown from 'react-markdown'

export function t (key: string, replacements?: ReplacementsInterface): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <ReactMarkdown>
      {t?.(key, replacements) ?? ''}
    </ReactMarkdown>
  )
}

export function tChoice (key: string, number: number, replacements?: ReplacementsInterface): JSX.Element {
  const { tChoice } = useLaravelReactI18n()

  return (
    <ReactMarkdown>
      {tChoice?.(key, number, replacements) ?? ''}
    </ReactMarkdown>
  )
}
