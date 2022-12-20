import React from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { ReplacementsInterface } from 'laravel-react-i18n/src/interfaces/replacements'
import ReactMarkdown from 'react-markdown'

export default function Translate (props: { value: string, replacements?: ReplacementsInterface }): JSX.Element {
  const { t } = useLaravelReactI18n()

  return (
    <ReactMarkdown>
      {t?.(props.value, props.replacements) ?? ''}
    </ReactMarkdown>
  )
}
