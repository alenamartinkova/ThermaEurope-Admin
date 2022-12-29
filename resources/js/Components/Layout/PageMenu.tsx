import React, { createContext, PropsWithChildren, useContext } from 'react'
import SwipeLeft from '../Icons/SwipeLeft'
import SwipeRight from '../Icons/SwipeRight'
import useLocalStorage from 'use-local-storage'

const CollapsedContext = createContext<boolean>(false)

export default function PageMenu (props: PropsWithChildren<{ allowCollapse?: boolean }>): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>('pageMenuIsCollapsed', false)
  const toggleIsCollapsed = (): void => setIsCollapsed(!isCollapsed)
  const { allowCollapse } = props

  return (
    <div className={'font-medium'} data-testid="page-menu">
      <CollapsedContext.Provider value={(allowCollapse ?? false) && isCollapsed}>
          {props.children}
      </CollapsedContext.Provider>

      {(allowCollapse ?? false) &&
        <button
          onClick={toggleIsCollapsed}
          className={'active:bg-gray-light cursor-pointer w-10 h-10 ml-3.5 mt-6 flex justify-center items-center rounded-full bg-gray-hover'}
          data-testid="page-menu-toggle-trigger"
        >
          <div className={'w-5 h-5'}>
            {isCollapsed ? <SwipeRight/> : <SwipeLeft/>}
          </div>
        </button>
      }
    </div>
  )
}

export function MenuItem (props: PropsWithChildren<{ onClick: () => void, testId?: string | null, isActive?: boolean }>): JSX.Element {
  const isCollapsed = useContext(CollapsedContext)

  return (
    <button
      onClick={props.onClick}
      className={`page-menu-item ${(props.isActive ?? false) ? 'active' : ''} ${isCollapsed ? 'w-14' : 'w-64'} cursor-pointer h-12 flex flex-row flex-nowrap min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full active:bg-gray-light items-center`}
      data-testid={props.testId}
    >
      {props.children}
    </button>
  )
}

export function MenuItemLabel (props: PropsWithChildren<{}>): JSX.Element {
  const isCollapsed = useContext(CollapsedContext)

  return (
    <>
      {!isCollapsed &&
        <div className={'pl-2.5'} data-testid="page-menu-item-label">
          { props.children }
        </div>
      }
    </>
  )
}

export function MenuItemHeading (props: PropsWithChildren<{}>): JSX.Element {
  const isCollapsed = useContext(CollapsedContext)

  return (
    <>
      <div className={`page-menu-item__heading ${isCollapsed ? 'w-14' : 'w-64'} active h-12 flex flex-row flex-nowrap min-w-max py-3.5 sm:py-4 px-4 sm:px-5 rounded-r-full text-2xl items-center`}>
        { props.children }
      </div>
    </>
  )
}
