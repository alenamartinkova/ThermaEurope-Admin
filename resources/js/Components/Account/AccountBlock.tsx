import React, { useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function AccountBlock (props: { title: string, showContent: React.ReactNode, showEdit: React.ReactNode }): JSX.Element {
  const { title, showContent, showEdit } = props
  const [open, setOpen] = useState(false)
  const { t } = useLaravelReactI18n()

  return (
    <div className={'account-block py-7 px-5 rounded-10 max-w-[55rem] md:mr-8 mx-4 md:ml-0 mb-7'}>
      <p className={'font-medium mb-3.5'}>{title}</p>

      {!open
        ? <>
          { showContent }
            <div className={'flex flex-row justify-end'}>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'hover:bg-cyan active:bg-cyan-active text-blue hover:text-blue-hover active:text-blue-active font-medium rounded-5 px-5 py-3'}>
                {t?.('account_pages.edit')}
              </button>
            </div>
          </>
        : <>
          { showEdit }
            <div className={'flex flex-row justify-end'}>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'hover:bg-cyan active:bg-cyan-active text-blue hover:text-blue-hover active:text-blue-active font-medium rounded-5 px-5 py-3 mr-3'}>
                {t?.('account_pages.cancel')}
              </button>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'bg-blue hover:bg-blue-hover active:bg-blue-active font-medium rounded-5 text-white px-5 py-3'}>
                {t?.('account_pages.save')}
              </button>
          </div>
        </>
      }
    </div>
  )
}
