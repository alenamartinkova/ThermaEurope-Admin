import React, { useEffect } from 'react'
import PageMenu from '../Components/Layout/PageMenu'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import * as Collapsible from '@radix-ui/react-collapsible'
import ArrowUp from '../Components/Icons/ArrowUp'
import ArrowDown from '../Components/Icons/ArrowDown'
import MainMenu from '../Components/Layout/MainMenu'
import { useActiveItemUpdate } from '../Providers/OffCanvasContextProvider'

export default function Index (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const [open, setOpen] = React.useState(false)
  const setOffCanvasActiveItem = useActiveItemUpdate()

  useEffect(() => {
    setOffCanvasActiveItem('home')
  }, [])

  return (
    <div className={'w-full flex flex-row flex-nowrap gap-x-7'}>
      <div className={'min-w-fit mt-16 hidden md:block'}>
        <PageMenu allowCollapse={true}>
          <MainMenu activeItem={'home'}/>
        </PageMenu>
      </div>

      <div className={'w-full flex flex-col flex-nowrap'}>
        <Collapsible.Root open={open} onOpenChange={setOpen} className={'w-full flex flex-col flex-nowrap items-center md:items-start block md:hidden'}>
          <Collapsible.Trigger className={'flex flex-row flex-nowrap items-center mt-5'}>
            <h1>
              {t?.('page_home.title', { name: 'TODO' })}
            </h1>
            <div className={'ml-2.5'}>
              <div className={'w-2.5 h-2.5'}>{open ? <ArrowDown/> : <ArrowUp/>}</div>
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content className={'w-full mt-2.5'}>
            <PageMenu>
              <MainMenu activeItem={'home'}/>
            </PageMenu>
          </Collapsible.Content>
        </Collapsible.Root>

        <h1 className={'mt-5 hidden md:block'}>
          {t?.('page_home.title', { name: 'TODO' })}
        </h1>

        <hr className={'h-px bg-grey-border border-0 mt-2.5 mb-7 mx-4 md:mx-0'}/>
      </div>
    </div>
  )
}
