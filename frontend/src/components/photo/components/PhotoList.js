import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/Fetch';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchData('/api/photos', setPhotos);
  }, []);

  function handleModalClick(image) {
    setSelectedPhoto(image);
    setEditModalIsOpen(true);
  }

  return (
    <div className="flex justify-center">
      <section className={`flex flex-wrap after:content-none flex-grow ${editModalIsOpen ? "hidden" : ""}`}>
        {photos.slice().reverse().map((image) => (
          <a
            onClick={() => handleModalClick(image)}
            className="m-1 bg-white relative"
            style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
            key={image.id}
          >
            <i className="block" style={{ paddingBottom: `${image.height / image.width * 100}%` }}></i>
            <img className="z-10 absolute top-0 w-full align-bottom" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
          </a>
        ))}
      </section>

      {selectedPhoto && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => {
            setSelectedPhoto(null);
            setEditModalIsOpen(false);
          }}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.04)",
              transition: 'opacity 200ms ease-in-out'
            },
            content: {
              transition: "opacity 1s ease",
              opacity: editModalIsOpen ? 1 : 0,
            }
          }}
          className="w-full max-w-120 bg-gray-100 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-12 max-sm:pt-8 pb-5 px-16 max-sm:px-4 rounded-xl outline-none"
        >
          <div className="text-center p-4 pt-0">
            <div className="text-4xl font-bold mb-2">{selectedPhoto.title}</div>
            <div className="text-xl mb-8">{selectedPhoto.tags}</div>
            <img
              src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
              alt=""
              className="w-full"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PhotoList;