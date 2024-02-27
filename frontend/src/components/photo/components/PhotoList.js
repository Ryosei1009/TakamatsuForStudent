import React, { useEffect, useState } from 'react';
import { fetchData, fetchSearchData } from '../../../utils/Fetch';
import Modal from 'react-modal';
import UploadPhoto from './UploadPhoto';

Modal.setAppElement("#root");

const PhotoListItem = ({ image, onClick }) => (
  <div
    onClick={onClick}
    className="m-1 bg-white sticky cursor-pointer hover:opacity-80"
    style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
    key={image.id}
  >
    <i className="block" style={{ paddingBottom: `${image.height / image.width * 100}%` }}></i>
    <img className="z-10 absolute top-0 w-full align-bottom" loading="lazy" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
  </div>
);

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

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    try {
      const fetchedPhotos = await fetchSearchData('/api/photos');
      console.log(fetchedPhotos);
      const filteredPhotos = fetchedPhotos.filter((photo) => {
        console.log(photo.tags);
        return photo.tags.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setPhotos(filteredPhotos);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  }

  return (
    <>
      <UploadPhoto onSearch={handleSearch} />
      <div className="flex justify-center">
        <section className={`flex flex-wrap after:content-none flex-grow ${editModalIsOpen ? "" : ""}`}>
          {photos.slice().reverse().map((image) => (
            <PhotoListItem key={image.id} image={image} onClick={() => handleModalClick(image)} />
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
            className="flex justify-center w-full max-w-4xl bg-gray-100 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-12 max-sm:pt-8 pb-5 px-6 max-sm:px-2 rounded-xl outline-none"
          >
            <div className="text-center p-4 pt-0">
              <div className="text-6xl font-bold mb-2">{selectedPhoto.title}</div>
              <div className="text-3xl mb-8">{selectedPhoto.tags}</div>
              <img
                src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
                alt=""
                className="w-auto max-h-96"
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default PhotoList;