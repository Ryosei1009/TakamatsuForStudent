import React from 'react'
import PhotoList from './components/PhotoList'
import Navbar from './components/UploadPhoto'

const Photo = () => {
  return (
    <div className="flex">
      <Navbar />
      <PhotoList />
    </div>
  )
}

export default Photo