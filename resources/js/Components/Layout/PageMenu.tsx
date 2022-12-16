import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import SwipeLeft from '../Icons/SwipeLeft'
import SwipeRight from '../Icons/SwipeRight'

const CollapsedContext = createContext<boolean>(false)

export default function PageMenu (props: PropsWithChildren<{ allowCollapse?: boolean }>): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const toggleIsCollapsed = (): void => setIsCollapsed(!isCollapsed)
  const { allowCollapse } = props

  return (
    <>
      <CollapsedContext.Provider value={isCollapsed}>
          {props.children}
      </CollapsedContext.Provider>

      {(allowCollapse ?? false) &&
        <div onClick={toggleIsCollapsed} className={'w-10 h-10 ml-3.5 mt-6 flex justify-center items-center rounded-full bg-gray-hover'}>
          <div className={'w-5 h-5'}>
            {isCollapsed ? <SwipeRight/> : <SwipeLeft/>}
          </div>
        </div>
      }
    </>
  )
}

export function MenuItem (props: PropsWithChildren<{ isActive?: boolean, onClick: () => void }>): JSX.Element {
  const isCollapsed = useContext(CollapsedContext)

  return (
    <div onClick={props.onClick} className={`main-menu-item ${(props.isActive ?? false) ? 'active' : ''} ${isCollapsed ? 'w-14' : 'w-64'} cursor-pointer h-12 flex flex-row flex-nowrap min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full`}>
      {props.children}
    </div>
  )
}

export function MenuItemLabel (props: PropsWithChildren<{}>): JSX.Element {
  const isCollapsed = useContext(CollapsedContext)

  return (
    <>
      {!isCollapsed &&
        <div className={'pl-2.5'}>
          { props.children }
        </div>
      }
    </>
  )
}
