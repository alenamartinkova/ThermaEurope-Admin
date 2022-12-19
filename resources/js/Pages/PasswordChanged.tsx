import React, { useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import moment from 'moment'

export default function NewPassword (): JSX.Element {
  const [duration, setDuration] = useState(moment.duration(5, 's'))

  useEffect(() => {
    if (duration.asMilliseconds() > 0) {
      const intervalId = setInterval(() => {
        setDuration(oldValue => oldValue.clone().subtract(1, 's'))
      }, 1000)
      return () => clearInterval(intervalId)
    } else {
      Inertia.visit(route('home'))
    }
  }, [duration])

  return (
    <>
      {moment.utc(duration.asMilliseconds()).format('HH:mm:ss')}
    </>
  )
}
