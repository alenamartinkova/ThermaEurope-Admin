import React, { useEffect } from 'react'
import { useActiveItemUpdate } from '../Providers/OffCanvasContextProvider'
import MainMenu from '../Components/Layout/MainMenu'
import PageLayout from '../Components/Layout/PageLayout'

export default function ReservationList (): JSX.Element {
  const setOffCanvasActiveItem = useActiveItemUpdate()

  useEffect(() => {
    setOffCanvasActiveItem('reservation')
  }, [])

  return (
    <PageLayout
      title={'Reservations'}
      menu={<MainMenu activeItem={'reservation'}/>}
      mainMenuActiveItem={'reservation'}
    >
      Reservation list!!!
    </PageLayout>
  )
}
