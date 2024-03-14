import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/DatabaseUtil';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import EachPhoto from './EachPhoto';
import Loading from '../../_util/Loading';

const PhotoList = ({ photos, setPhotos }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    fetchData('/api/photos', setPhotos);
    setTimeout(() => {
      setTimer(true);
    }, 500)
  }, [setPhotos]);

  function handleModalClick(image) {
    setSelectedPhoto(image);
    setModalIsOpen(true);
  }

  const handleShowPopupClick = () => {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Photo List - TCFS
          </title>
        </Helmet>
      </HelmetProvider>
      {photos.length > 0 ? (
        <div className="flex justify-center">
          <section className={`flex flex-wrap after:content-none flex-grow`}>
            {photos.slice().reverse().map((image) => (
              <div
                onClick={() => handleModalClick(image)}
                className="m-1 bg-white sticky cursor-pointer hover:opacity-80 max-w-98vw"
                style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
                key={image.id}
              >
                <i className="block" style={{ paddingBottom: `${image.height / image.width * 100}%` }}></i>
                {((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".ogm")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".wmv")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".mpg")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".webm")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".ogv")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".mov")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".asx")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".mpeg")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".mp4")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".m4v")) ||
                  ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + image.image_name).includes(".avi")) ? (
                  <video className="z-10 absolute top-0 w-full align-bottom" loading="lazy" controls src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`}></video>
                ) : (
                  <img className="z-10 absolute top-0 w-full align-bottom" loading="lazy" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
                )}

              </div>
            ))}
          </section>

          {selectedPhoto && (
            <EachPhoto
              modalIsOpen={modalIsOpen}
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
              setModalIsOpen={setModalIsOpen}
              showPopup={showPopup}
              handleShowPopupClick={handleShowPopupClick}
            />
          )}
        </div >
      ) : (
        <>
          {timer ? (
            <div className="text-3xl max-xl:text-2xl max-sm:text-lg font-bold ml-2 text-red-500">
              サーバーが落ちている可能性があります。運営にお問い合わせください。
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}

    </>
  );
};

export default PhotoList;