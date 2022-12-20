import React from 'react'
import * as Select from '@radix-ui/react-select'

export default function AccountBlockSelect (props: { optionsForSelect, value: string }): JSX.Element {
  const { optionsForSelect, value } = props
  const [selectValue, setValue] = React.useState(value)

  function handleSetValue (selectValue: string): void {
    setValue(selectValue)
  }

  return (
    <div className={'account-select'}>
      <Select.Root value={selectValue} onValueChange={ selectValue => handleSetValue(selectValue) }>
        <Select.Trigger className="pl-2 flex justify-start grey-text items-center h-10 max-w-[20rem] w-full border border-solid border-grey-input rounded-5">
          {selectValue}
        </Select.Trigger>
        <Select.Content className="bg-white border border-solid border-grey-input rounded-5 w-[20rem]">
          <Select.Viewport>
            <Select.Group>
              { optionsForSelect.map((item) => {
                return (
                  <Select.SelectItem key={item.id} className={'item items-center grey-text rounded flex p-2 cursor-pointer hover:bg-gray-hover'} value={item.code}>
                    {item.code}
                  </Select.SelectItem>
                )
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  )
}
