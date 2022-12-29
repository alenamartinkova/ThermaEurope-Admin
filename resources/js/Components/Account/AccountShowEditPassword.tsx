import React from 'react'
import Translate from '../Translate'
import Input from '../Form/Input'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../../Interfaces/SharedProps'

interface PasswordValues {
  password: string
  password_changed: string
  password_changed_confirmation: string
}

export default function AccountShowEditPassword (props: { onChange: React.ChangeEventHandler<HTMLInputElement>, values: PasswordValues, showPassword: boolean }): JSX.Element {
  const { onChange, values, showPassword } = props
  const { errors } = usePage<Page<SharedProps>>().props

  return (
    <>
      <div className={'mb-5'}>
        <div className={'mt-4 mb-2 text-grey-text'}>
          <Translate value={'account_pages.security.password.edit_info_text_1'} />
        </div>

        <div className={'mb-5 text-grey-text'}>
          <Translate value={'account_pages.security.password.edit_info_text_2'} />
        </div>

        <div className={'max-w-xs'}>
          <div className={'mb-2'}>
            <label className={'text-grey-text mb-1'}>
              <Translate value={'account_pages.security.password.current_password'} />
            </label>
            <Input id={'password'} type={'password'} value={values.password} onChange={onChange} error={errors.password} />
          </div>

          <div className={'mb-2'}>
            <label className={'text-grey-text mb-1'}>
              <Translate value={'account_pages.security.password.new_password'} />
            </label>
            <Input id={'password_changed'} type={showPassword ? 'text' : 'password'} value={values.password_changed} onChange={onChange} error={errors.password_changed} />
          </div>

          <div>
            <label className={'text-grey-text mb-1'}>
              <Translate value={'account_pages.security.password.retype_password'} />
            </label>
            <Input id={'password_changed_confirmation'} type={showPassword ? 'text' : 'password'} value={values.password_changed_confirmation} onChange={onChange} error={errors.password_changed_confirm} />
          </div>
        </div>
      </div>
    </>
  )
}
