import React, { useState } from 'react'
import CommunicationLanguageSelect from './CommunicationLanguageSelect'

export default function AccountBlock (props: { title: string, value: string }): JSX.Element {
  const { title, value } = props
  const [open, setOpen] = useState(false)

  return (
    <div className={'account-block py-7 px-5 rounded-10 max-w-[55rem] md:mr-8 mx-4 md:ml-0 mb-10'}>
      <p className={'font-medium mb-3.5'}>{title}</p>

      {/* KOMPONENTY !!!!! */}
      {!open
        ? <>
            <p className={'mb-5 grey-text'}>{value}</p>
            <div className={'flex flex-row justify-end'}>
              <button type={'button'} onClick={() => setOpen(open => !open)}
                      className={'hover:bg-cyan font-medium rounded-5 px-5 py-3 text-dark-cyan'}>
                Edit
              </button>
            </div>
          </>
        : <>
          <CommunicationLanguageSelect />
          <div className={'flex flex-row justify-end'}>
            <button type={'button'} onClick={() => setOpen(open => !open)}
                    className={'hover:bg-cyan font-medium rounded-5 px-5 py-3 mr-3 text-dark-cyan'}>
              Cancel
            </button>
            <button type={'button'} onClick={() => setOpen(open => !open)}
                    className={'bg-blue-active font-medium rounded-5 text-white px-5 py-3'}>
              Save
            </button>
          </div>
        </>
      }
    </div>
  )
}
