import React, { Fragment, useEffect, useState } from 'react';
import { deleteData, fetchData } from '../../../utils/DatabaseUtil';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import EachPhoto from './EachPhoto';
import Loading from '../../_util/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { Popover, Transition } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';
import ActionPerfect from '../../_util/ActionPerfect';

const PhotoList = ({ photos, setPhotos }) => {
  const [deletePerfect, setDeletePerfect] = useState(false);
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  useEffect(() => {
    fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
  }, [user]);
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

  // function handleModalClick(image) {
  //   setSelectedPhoto(image);
  //   setModalIsOpen(true);
  // }

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
              <a
                // onClick={() => handleModalClick(image)}
                className="m-1 sticky max-w-98vw"
                style={{ width: `${image.width * 200 / image.height}px`, flexGrow: `${image.width * 200 / image.height}` }}
                key={image.id}
              >
                {parseInt(eachAccount.id) === image.created_by_id | parseInt(eachAccount.role) <= 2 ? (
                  <Popover className="absolute right-0 z-50 bg-white rounded-bl-md">
                    <Popover.Button className="focus:outline-none">
                      <TrashIcon className="h-6 w-6 cursor-pointer fill-red-500"></TrashIcon>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 w-16 z-50">
                        <div className="bg-gray-200 z-50 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/photos/${image.id}`, setDeletePerfect)}>
                          削除
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ) : ("")}
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
                  <video className="z-10 absolute top-0 w-full align-bottom" loading="lazy" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`}></video>
                ) : (
                  <img className="z-10 absolute top-0 w-full align-bottom" loading="lazy" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image.image_name}`} alt="" />
                )}

              </a>
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
              width={selectedPhoto.width}
              height={selectedPhoto.height}
            />
          )}
        </div >
      ) : (
        <>
          {timer ? (
            <div className="text-3xl max-xl:text-2xl max-sm:text-lg font-bold ml-2 text-red-500">
              画像をアップロードしましょう！
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
      <ActionPerfect Perfect={deletePerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"写真の削除に成功しました。"} />
    </>
  );
};

export default PhotoList;