import React from 'react'
import * as Select from '@radix-ui/react-select'

export default function AccountBlockSelect (): JSX.Element {
  return (
    <div className={'mb-2'}>
      <label className={'grey-text mb-1'}>Label</label>
      <Select.Root>
        <Select.Trigger className="pl-2 flex justify-start grey-text items-center h-10 max-w-[20rem] w-full border border-solid border-grey-input rounded-5">
          Trigger
        </Select.Trigger>
        <Select.Content className="bg-white border border-solid border-grey-input rounded-5 w-[20rem]">
          <Select.Viewport>
            <Select.Group>
              <Select.SelectItem className={'item items-center grey-text rounded flex p-2 cursor-pointer hover:bg-gray-hover'} value={'1'}>
                Option 1
              </Select.SelectItem>
              <Select.SelectItem className={'item items-center grey-text rounded flex p-2 cursor-pointer hover:bg-gray-hover'} value={'2'}>
                Option 2
              </Select.SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <p className={'mt-4 grey-text'}>Text under select</p>
    </div>
  )
}
