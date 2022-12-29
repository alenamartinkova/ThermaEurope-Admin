import React from 'react'
import * as Select from '@radix-ui/react-select'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../../Interfaces/SharedProps'

export default function AccountBlockSelect (props: { optionsForSelect: any[], value: string, setValue: React.Dispatch<React.SetStateAction<string>> }): JSX.Element {
  const { optionsForSelect, value, setValue } = props

  return (
    <>
      <div className={'account-select'}>
        <Select.Root value={value} onValueChange={ value => setValue(value) }>
          <Select.Trigger className="pl-2 flex justify-start text-grey-text items-center h-10 max-w-[20rem] w-full border border-solid border-grey-input rounded-5">
            {value}
          </Select.Trigger>
          <Select.Content className="bg-white border border-solid border-grey-input rounded-5 w-[20rem]">
            <Select.Viewport>
              <Select.Group>
                { optionsForSelect.map((item) => {
                  return (
                    <Select.SelectItem key={item.id} className={'item items-center text-grey-text rounded flex p-2 cursor-pointer hover:bg-gray-hover active:bg-gray-light'} value={item.code}>
                      {item.code}
                    </Select.SelectItem>
                  )
                })}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  )
}
