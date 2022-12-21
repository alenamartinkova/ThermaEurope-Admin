import React, { useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import moment from 'moment'
import SpanamoIcon from '../Components/Icons/SpanamoIcon'
import SpanamoCom from '../Components/Icons/SpanamoCom'
import Translate from '../Components/Translate'

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
    <div className={'w-full flex flex-row flex-nowrap justify-center px-7 sm:px-24'}>

      <div className={'grow flex flex-col flex-nowrap items-center max-w-[39rem]'}>
        <div className={'w-full bow-shadow flex flex-col flex-nowrap items-center mt-16 sm:mt-24 px-5 pt-12 pb-7 rounded-10'}>

          <div className={'text-xl text-center'}>
            <Translate value={'pageLogin.password_created_successfully'}/>
          </div>

          <div className={'mt-5 text-sm text-center text-grey-text'}>
            <Translate value={'pageLogin.password_created_successfully_text'}/>
          </div>

          <div className={'w-full flex flex-row flex-nowrap items-center justify-center mt-4 sm:mt-7 mb-4 sm:mb-5'}>
            <hr className={'grow h-px bg-grey-border border-0'}/>
            <div className={'px-3'}><SpanamoIcon/></div>
            <hr className={'grow h-px bg-grey-border border-0'}/>
          </div>

          <SpanamoCom/>

        </div>

        <div className={'flex flex-col flex-nowrap items-center mt-4 sm:mt-5'}>
          <div className={'text-center text-grey-text'}>
            <Translate value={'pageLogin.redirected_in'}/>
          </div>

          {moment.utc(duration.asMilliseconds()).format('HH:mm:ss')}
        </div>

      </div>

    </div>
  )
}
