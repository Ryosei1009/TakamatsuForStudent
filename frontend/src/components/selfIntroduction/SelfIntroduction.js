import React from 'react'
import FetchSelfIntroduction from './components/SelfIntroductionList'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const SelfIntroduction = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            自己紹介 - TCFS
          </title>
        </Helmet>
      </HelmetProvider>
      <div className="flex flex-col items-center">
        <FetchSelfIntroduction />
      </div>
    </>
  )
}

export default SelfIntroduction