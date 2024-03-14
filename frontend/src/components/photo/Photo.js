import React, { useState } from 'react'
import PhotoList from './components/PhotoList'
import MenuBar from './components/MenuBar';

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  return (
    <div className="flex">
      <MenuBar setPhotos={setPhotos} />
      <PhotoList photos={photos} setPhotos={setPhotos} />
    </div>
  )
}

export default Photo