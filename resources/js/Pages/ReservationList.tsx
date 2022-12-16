import React, { useEffect } from 'react'
import { useActiveItemUpdate } from '../Providers/OffCanvasContextProvider'

export default function ReservationList (): JSX.Element {
  const setOffCanvasActiveItem = useActiveItemUpdate()

  useEffect(() => {
    setOffCanvasActiveItem('reservation')
  }, [])

  return (
    <>
      <h1>Reservations</h1>
    </>
  )
}
