import React, { useState } from 'react'
import LoginPageLayout from '../Components/Layout/LoginPageLayout'
import ForgottenPasswordForm from '../Components/ForgottenPasswordForm'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { SharedProps } from '../Interfaces/SharedProps'
import ForgottenPasswordMessage from '../Components/ForgottenPasswordMessage'
import Translate from '../Components/Translate'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function ForgottenPassword (): JSX.Element {
  const { t } = useLaravelReactI18n()
  const { flash } = usePage<Page<SharedProps>>().props
  const message = flash?.message ?? ''
  const [showInfo, setShowInfo] = useState(false)
  const toggleShowInfo = (): void => setShowInfo(!showInfo)

  return (
    <LoginPageLayout title={<Translate value={'pageLogin.forgot_password'}/>} text={<Translate value={'pageLogin.forgot_password_text'}/>}>
      {!showInfo &&
        <div>
          {(message !== '') ? <ForgottenPasswordMessage message={message}/> : <ForgottenPasswordForm/>}

          <div className={'w-full flex flex-row justify-center mt-5'}>
            <button
              onClick={toggleShowInfo}
              className={'text-blue font-medium hover:text-blue-hover active:text-blue-active text-xs'}
              data-testid="are-there-problems-button"
            >
              <Translate value='pageLogin.are_there_problems' />
            </button>
          </div>
        </div>
      }

      {showInfo &&
        <div>
          <div className={'text-base text-grey-text'}>
            <Translate value={'pageLogin.problems_info'}/>
          </div>
          <div className={'w-full flex flex-col justify-center mt-5'}>
            <a
              href={t?.('pageLogin.customer_service_url')}
              target={'_blank'}
              className={'bg-blue hover:bg-blue-hover active:bg-blue-active text-white w-full py-3 rounded-10 text-base text-center'}
              rel="noreferrer"
              data-testid="customer-service-link"
            >
              <Translate value={'pageLogin.customer_service'}/>
            </a>
            <button
              onClick={toggleShowInfo}
              className={'text-blue font-medium hover:text-blue-hover active:text-blue-active text-xs mt-6'}
              data-testid="back-button"
            >
              <Translate value={'pageLogin.back'}/>
            </button>
          </div>
        </div>
      }
    </LoginPageLayout>
  )
}
