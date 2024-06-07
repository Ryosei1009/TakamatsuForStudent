import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from '../../utils/DatabaseUtil'
import EventModal from './components/EachEvent';
import Modal from 'react-modal';
import UploadEvent from './components/UploadEvent';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/calendar/Header';
import UploadButton from './components/calendar/UploadButton';
import Days from './components/calendar/Days';
import Cells from './components/calendar/Cells';

Modal.setAppElement("#root");

const Calendar = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  useEffect(() => {
    fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
  }, [user]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [timer, setTimer] = useState(false);
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    fetchData('/api/event', setEventData);
    setTimeout(() => {
      setTimer(true);
    }, 500)
  }, [])

  const [eachModalIsOpen, setEachModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEachModalClick = (event) => {
    setSelectedEvent(event);
    setEachModalIsOpen(true);
  };

  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const handleUploadModalClick = () => {
    setUploadModalIsOpen(true);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {uploadModalIsOpen ? (
              "Upload Event "
            ) : (
              eachModalIsOpen ? (
                "About Event "
              ) : (
                "Event Calendar "
              )
            )}
            - TCFS
          </title>
        </Helmet>
      </HelmetProvider>

      <div className="max-w-xl mx-auto">
        <div className="flex justify-center my-2">
          <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
          {(eachAccount.role <= 2 || eachAccount.role === 4) && (
            <>
              <div className="w-1/36"></div>
              <UploadButton eachAccount={eachAccount} handleUploadModalClick={handleUploadModalClick} />
            </>)}
        </div>
        <Days currentDate={currentDate} />
        <Cells eventData={eventData} timer={timer} currentDate={currentDate} handleEachModalClick={handleEachModalClick} />
      </div>

      <EventModal eachModalIsOpen={eachModalIsOpen} setEachModalIsOpen={setEachModalIsOpen} selectedEvent={selectedEvent} />
      <UploadEvent uploadModalIsOpen={uploadModalIsOpen} setUploadModalIsOpen={setUploadModalIsOpen} />
    </>
  );
};

export default Calendar;