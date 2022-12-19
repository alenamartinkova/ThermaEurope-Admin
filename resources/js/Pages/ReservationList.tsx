import React, { useEffect } from 'react'
import { useActiveItemUpdate } from '../Providers/OffCanvasContextProvider'
import PageLayout from '../Components/Layout/PageLayout'
import IndexPageMenu from '../Components/IndexPageMenu'

export default function ReservationList (): JSX.Element {
  const setOffCanvasActiveItem = useActiveItemUpdate()

  useEffect(() => {
    setOffCanvasActiveItem('reservation')
  }, [])

  return (
    <PageLayout
      title={<>Reservations</>}
      menu={<IndexPageMenu activeItem={'reservation'}/>}
      mainMenuActiveItem={'reservation'}
    >
      Reservation list!!!
    </PageLayout>
  )
}
