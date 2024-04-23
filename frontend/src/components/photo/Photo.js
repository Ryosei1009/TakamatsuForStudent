import React, { useState } from 'react'
import PhotoList from './components/PhotoList'
import MenuBar from './components/MenuBar';

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  return (
    <div className="flex">
      <MenuBar setPhotos={setPhotos} />
      <div>
        {/* <h2 className="text-center font-bold text-3xl text-red-500">バグ発生中、修正中</h2> */}
        <PhotoList photos={photos} setPhotos={setPhotos} />
      </div>
    </div>
  )
}

export default Photo