import React, { useState } from 'react'
import PageLayout from '../Components/Layout/PageLayout'
import AccountPageMenu from '../Components/Account/AccountPageMenu'
import Translate from '../Components/Translate'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia, Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import AccountBlock from '../Components/Account/AccountBlock'
import route from 'ziggy-js'
import AccountShowContentPassword from '../Components/Account/AccountShowContentPassword'
import AccountShowEditPassword from '../Components/Account/AccountShowEditPassword'
import generator from 'generate-password-ts'

export default function Security (): JSX.Element {
  const { user, msg } = usePage<Page<SharedProps & { msg: object }>>().props
  const [values, setValues] = useState({
    password: '',
    password_changed: '',
    password_changed_confirmation: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  function handleSavePassword (): void {
    Inertia.post(route('account.update_password'), values)
  }

  { /* TODO ALREADY USED IN NEW PASSWORD IS THERE A WAY TO REUSE IT? */ }
  function generatePassword (e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    let password = ''

    // generator sometimes generate password without number
    while (!(/\d/).test(password)) {
      password = generator.generate({
        length: 10,
        numbers: true
      })
    }

    setValues(values => ({
      ...values,
      password_changed: password,
      password_changed_confirmation: password
    }))

    setShowPassword(true)
  }

  return (
    <PageLayout
      title={<Translate value={'account_pages.security.title'} />}
      menu={<AccountPageMenu activeItem={'security'}/>}
      mainMenuActiveItem={null}
      hasHeading={true}
    >
      <>
        {(msg) !== null &&
          msg
        }

        <AccountBlock
          title={<Translate value={'account_pages.security.password.title'} />}
          showContent={<AccountShowContentPassword passwordDate={user.password_updated_at} />}
          showEdit={<AccountShowEditPassword onChange={handleChange} values={values} showPassword={showPassword}/>}
          onSave={handleSavePassword}
          isPasswordBlock={true}
          editTranslation={'account_pages.change'}
          saveTranslation={'account_pages.security.password.change_password'}
          generatePassword={generatePassword}
        />
      </>
    </PageLayout>
  )
}
