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
      <FetchSelfIntroduction />
    </>
  )
}

export default SelfIntroduction