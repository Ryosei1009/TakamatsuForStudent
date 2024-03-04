import React from 'react'
import Tittle from './components/Tittle'
import News from './components/News'
import Other from './components/Other'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Home - TCFS
          </title>
        </Helmet>
      </HelmetProvider>
      <div>
        <Tittle />
        <Other />
        <News />
      </div>
    </>
  )
}

export default Home