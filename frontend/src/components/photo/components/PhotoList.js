import React, { useEffect, useState } from 'react';
import { fetchData, fetchSearchData } from '../../../utils/Fetch';
import Modal from 'react-modal';
import UploadPhoto from './UploadPhoto';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { TrashIcon } from '@heroicons/react/solid';

Modal.setAppElement("#root");

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchData('/api/photos', setPhotos);
  }, []);

  function handleModalClick(image) {
    setSelectedPhoto(image);
    setModalIsOpen(true);
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
    <div className="flex">
      <UploadPhoto onSearch={handleSearch} />
      <div className="flex justify-center">
        <section className={`flex flex-wrap after:content-none flex-grow`}>
          {photos.length > 0 ? (
            photos.slice().reverse().map((image) => (
              <div
                onClick={() => handleModalClick(image)}
                className="m-1 bg-white sticky cursor-pointer hover:opacity-80 max-w-98vw"
                style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
                key={image.id}
              >
                <i className="block" style={{ paddingBottom: `${image.height / image.width * 100}%` }}></i>
                <img className="z-10 absolute top-0 w-full align-bottom" loading="lazy" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
              </div>
            ))
          ) : (
            <p>No photos available.</p>
          )}
        </section>

        {selectedPhoto && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => {
              setSelectedPhoto(null);
              setModalIsOpen(false);
            }}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            className={`transition-opacity w-full max-w-120 bg-gray-100 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-12 max-sm:pt-8 pb-5 px-16 max-sm:px-4 rounded-xl outline-none`}
          >
            <div className="flex justify-end">
              <TrashIcon className="w-8 cursor-pointer fill-red-700" />
            </div>
            <div className="text-center p-4 pt-0">
              <div className="text-4xl font-bold mb-2">{selectedPhoto.title}</div>
              <div className="text-xl mb-8">{selectedPhoto.tags}</div>
              <img
                src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
                alt=""
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <div>
                  作成者：{selectedPhoto.created_by}
                </div>
                <div>
                  {eachNewsTimeFormat(selectedPhoto.created_at)}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PhotoList;