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

export default function Security (): JSX.Element {
  const { user, msg } = usePage<Page<SharedProps & { msg: object }>>().props
  const [values, setValues] = useState({
    password: '',
    password_changed: '',
    password_changed_confirm: ''
  })

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  function handleSavePassword (): void {
    console.log(values)

    Inertia.post(route('account.update_password'), values)
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
          showEdit={<AccountShowEditPassword onChange={handleChange} values={values}/>}
          onSave={handleSavePassword}
        />
      </>
    </PageLayout>
  )
}
