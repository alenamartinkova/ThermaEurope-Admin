import React, { useState } from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import AccountShowContent from '../Components/Account/AccountShowContent'
import AccountBlock from '../Components/Account/AccountBlock'
import AccountShowEdit from '../Components/Account/AccountShowEdit'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import { Language } from '../Interfaces/Models/Language'
import Translate from '../Components/Translate'
import route from 'ziggy-js'

export default function Preferences (): JSX.Element {
  const { user, languages } = usePage<Page<SharedProps & { languages: Language[] }>>().props
  const [value, setValue] = useState(user.communication_lang)

  function handleSaveLanguage (): void {
    Inertia.post(route('account.update_account_language'), { communication_lang: value })
  }

  return (
    <PageLayout
      title={<Translate value={'account_pages.preferences.title'} />}
      menu={<AccountPageMenu activeItem={'preferences'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
      <AccountBlock
        title={<Translate value={'account_pages.language.title'} />}
        showContent={<AccountShowContent value={user.communication_lang}/>}
        showEdit={<AccountShowEdit
          optionsForSelect={languages}
          value={value}
          label={<Translate value={'account_pages.language.label'} />}
          text={<Translate value={'account_pages.language.text'} />}
          setValue={setValue}
        />}
        onSave={handleSaveLanguage}
      />
    </PageLayout>
  )
}
