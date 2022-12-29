import React, { useState } from 'react'
import Translate from '../Translate'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../../Interfaces/SharedProps'
import ValidationError from '../Form/ValidationError'

export default function AccountBlock (props: {
  title: JSX.Element
  showContent: React.ReactNode
  showEdit: React.ReactNode
  onSave: () => void
}): JSX.Element {
  const { title, showContent, showEdit, onSave } = props
  const [open, setOpen] = useState(false)
  const { errors } = usePage<Page<SharedProps>>().props

  function onSaveClick (): void {
    onSave()
    setOpen(open => !open)
  }

  return (
    <div className={'account-block py-7 px-5 rounded-10 max-w-[55rem] md:mr-8 mx-4 md:ml-0 mb-7'}>
      <div className={'font-medium mb-3.5'}>{title}</div>

      {!open
        ? <>
          { showContent }
            <div className={'flex flex-row justify-end'}>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'hover:bg-cyan active:bg-cyan-active text-blue hover:text-blue-hover active:text-blue-active font-medium rounded-5 px-5 py-3'}>
                <Translate value={'account_pages.edit'} />
              </button>
            </div>
          </>
        : <>
            { showEdit }
            <div className={'flex flex-row justify-end'}>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'hover:bg-cyan active:bg-cyan-active text-blue hover:text-blue-hover active:text-blue-active font-medium rounded-5 px-5 py-3 mr-3'}>
                <Translate value={'account_pages.cancel'} />
              </button>
              <button type={'button'} onClick={onSaveClick}
                      className={'bg-blue hover:bg-blue-hover active:bg-blue-active font-medium rounded-5 text-white px-5 py-3'}>
                <Translate value={'account_pages.save'} />
              </button>
          </div>
        </>
      }

      {/* TODO FIND PLACE */}
      <ValidationError error={errors.communication_lang}/>
    </div>
  )
}
