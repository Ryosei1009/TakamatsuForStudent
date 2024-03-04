import React from 'react'
import FetchSelfIntroduction from './FetchSelfIntroduction'
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
        <div>
            <FetchSelfIntroduction />
        </div>
    </>
  )
}

export default SelfIntroduction