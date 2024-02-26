import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/Fetch';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchData('/api/photos', setPhotos);
  }, []);

  return (
    <div className="">
      <section className="flex flex-wrap after:content-none flex-grow">
        {photos.slice().reverse().map((image) => (
          <div
            className="m-1 bg-white relative"
            style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
            key={image.id}
          >
            <i className="block" style={{ paddingBottom: `${image.height / image.width * 100}%` }}></i>
            <img className="absolute top-0 w-full align-bottom" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default PhotoList;