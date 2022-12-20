import React, { PropsWithChildren, useEffect } from 'react'
import PageMenu from './PageMenu'
import { MainMenuActiveItem } from './MainMenu'
import * as Collapsible from '@radix-ui/react-collapsible'
import ArrowDown from '../Icons/ArrowDown'
import ArrowUp from '../Icons/ArrowUp'
import { useActiveItemUpdate } from '../../Providers/OffCanvasContextProvider'

export default function PageLayout (props: PropsWithChildren<{ title: string, menu: React.ReactNode, mainMenuActiveItem: MainMenuActiveItem, hasHeading: boolean }>): JSX.Element {
  const { title, menu, mainMenuActiveItem, hasHeading } = props
  const [open, setOpen] = React.useState(false)
  const setOffCanvasActiveItem = useActiveItemUpdate()

  useEffect(() => {
    setOffCanvasActiveItem(mainMenuActiveItem)
  }, [])

  return (
    <div className={'w-full flex flex-row flex-nowrap gap-x-7'}>
      <div className={`min-w-fit ${hasHeading ? 'mt-4' : 'mt-16'} hidden md:block`}>
        <PageMenu allowCollapse={true}>
          {menu}
        </PageMenu>
      </div>

      <div className={'w-full flex flex-col flex-nowrap'}>
        <Collapsible.Root open={open} onOpenChange={setOpen} className={'w-full flex flex-col flex-nowrap items-center md:items-start block md:hidden'}>
          <Collapsible.Trigger className={'flex flex-row flex-nowrap items-center mt-5'}>
            <h1>
              {title}
            </h1>
            <div className={'ml-2.5'}>
              <div className={'w-2.5 h-2.5'}>{open ? <ArrowDown/> : <ArrowUp/>}</div>
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content className={'w-full mt-2.5'}>
            <PageMenu>
              {menu}
            </PageMenu>
          </Collapsible.Content>
        </Collapsible.Root>

        <h1 className={'mt-5 hidden md:block'}>
          {title}
        </h1>

        <hr className={'h-px bg-grey-border border-0 mt-2.5 mb-7 mx-4 md:mx-0'}/>

        {props.children}
      </div>
    </div>
  )
}
