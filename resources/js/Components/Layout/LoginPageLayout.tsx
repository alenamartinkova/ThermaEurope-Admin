import React, { PropsWithChildren } from 'react'

export default function LoginPageLayout (props: PropsWithChildren<{ title: JSX.Element, text: JSX.Element }>): JSX.Element {
  const { title, text, children } = props

  return (
    <div className={'w-full flex flex-row justify-center pt-6 sm:pt-12 px-7 sm:px-24'}>
      <div className={'w-full max-w-5xl flex flex-row flex-wrap items-start gap-x-12 gap-y-8  justify-center'}>

        {/* Column Left */}
        <div className={'grow flex flex-col justify-center w-[24rem] pt-0 sm:pt-7'}>
          <h1 className={'text-[2.5rem] leading-[3rem] font-medium text-blue-active'}>
            {title}
          </h1>

          <hr className={'h-px bg-grey-border border-0 my-3.5'}/>

          <div className={'text-xl text-grey-text'}>{text}</div>
        </div>

        {/* Column Right */}
        <div className={'grow bow-shadow px-5 py-7 rounded-10 w-[24rem]'}>
          {children}
        </div>

      </div>
    </div>
  )
}
