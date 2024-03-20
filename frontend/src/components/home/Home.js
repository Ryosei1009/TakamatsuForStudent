import React from 'react'
import Tittle from './components/Tittle'
import News from './components/News'
import Other from './components/Others'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import SchoolDays from './components/SchoolDays'

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
        <SchoolDays />
        <Other />
        <News />
      </div>
    </>
  )
}

export default Home