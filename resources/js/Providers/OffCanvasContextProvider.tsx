import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import { MainMenuActiveItem } from '../Components/Layout/MainMenu'

const MainMenuActiveItemContext = createContext<MainMenuActiveItem>(null)
const SetMainMenuActiveItemContext = createContext<Dispatch<SetStateAction<MainMenuActiveItem>>>(() => null)

export function useActiveItem (): MainMenuActiveItem {
  return useContext(MainMenuActiveItemContext)
}

export function useActiveItemUpdate (): Dispatch<SetStateAction<MainMenuActiveItem>> {
  return useContext(SetMainMenuActiveItemContext)
}

export default function OffCanvasContextProvider (props: PropsWithChildren<{}>): JSX.Element {
  const [MainMenuActiveItem, setMainMenuActiveItem] = useState<MainMenuActiveItem>(null)

  return (
    <MainMenuActiveItemContext.Provider value={MainMenuActiveItem}>
      <SetMainMenuActiveItemContext.Provider value={setMainMenuActiveItem}>
        {props.children}
      </SetMainMenuActiveItemContext.Provider>
    </MainMenuActiveItemContext.Provider>
  )
}
