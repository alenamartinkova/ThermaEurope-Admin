import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { ReplacementsInterface } from 'laravel-react-i18n/src/interfaces/replacements'
import ReactMarkdown from 'react-markdown'

export function t (key: string, replacements?: ReplacementsInterface): string {
  const { t } = useLaravelReactI18n()
  return t?.(key, replacements) ?? ''
}

export function __ (key: string, replacements?: ReplacementsInterface): JSX.Element {
  return (
    <ReactMarkdown>
      {t(key, replacements)}
    </ReactMarkdown>
  )
}

export function tChoice (key: string, number: number, replacements?: ReplacementsInterface): string {
  const { tChoice } = useLaravelReactI18n()
  return tChoice?.(key, number, replacements) ?? ''
}

export function _ch (key: string, number: number, replacements?: ReplacementsInterface): JSX.Element {
  return (
    <ReactMarkdown>
      {tChoice?.(key, number, replacements) ?? ''}
    </ReactMarkdown>
  )
}
