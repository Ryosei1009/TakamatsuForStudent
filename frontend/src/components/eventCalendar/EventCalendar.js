import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from '../../utils/DatabaseUtil'
import EventModal from './components/EachEvent';
import Modal from 'react-modal';
import UploadEvent from './components/UploadEvent';
import { Helmet, HelmetProvider } from 'react-helmet-async';

Modal.setAppElement("#root");

const Calendar = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  useEffect(() => {
    fetchData('/api/accounts', setEachAccount, user, "email", ".email");
  }, [user]);

  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    fetchData('/api/event', setEventData);
  }, [])

  const [currentDate, setCurrentDate] = useState(new Date());

  // それぞれのモーダル
  const [eachModalIsOpen, setEachModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEachModalClick = (event) => {
    setSelectedEvent(event);
    setEachModalIsOpen(true);
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopupClick = () => {
    setShowPopup(!showPopup);
  };

  // アップロードモーダル
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  const handleUploadModalClick = () => {
    setUploadModalIsOpen(true);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center my-2 w-10/12">
        <button onClick={prevMonth} className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const renderUploadButton = () => {
    return (
      <div className="flex items-center justify-center my-2">
        <button
          onClick={eachAccount.role <= 2 ? () => handleUploadModalClick() : null}
          className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full h-10 w-10 bottom-10 right-10"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startOfMonth(currentDate));
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-600 font-semibold">
          {format(addDays(startDate, i), 'E')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const events = eventData.filter(event => isSameDay(new Date(parseInt(event.date)), new Date(formattedDate)));
        days.push(
          <div
            key={day}
            className={`text-center pt-2 flex justify-start flex-col items-center h-24
              ${!isSameMonth(day, monthStart)
                ? 'text-gray-400'
                : isSameDay(day, new Date())
                  ? 'bg-blue-200'
                  : ''
              }`}
          >
            <div>{format(day, 'd')}</div>
            {events.map((event, index) => (
              <div
                key={index}
                className="text-xs font-medium text-white w-full p-1 rounded-lg hover:cursor-pointer"
                style={{ backgroundColor: event.color }}
                onClick={() => handleEachModalClick(event)}
              >
                {event.title}
              </div>
            ))
            }
          </div >
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  const nextMonth = () => {
    setCurrentDate(addDays(endOfMonth(currentDate), 1));
  };

  const prevMonth = () => {
    setCurrentDate(addDays(startOfMonth(currentDate), -1));
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
          {renderHeader()}
          {eachAccount.role <= 2 && (
            <>
              <div className="w-1/36"></div>
              {renderUploadButton()}
            </>)}
        </div>
        {renderDays()}
        {renderCells()}
      </div>
      <EventModal
        isOpen={eachModalIsOpen}
        onClose={() => setEachModalIsOpen(false)}
        event={selectedEvent}
        showPopup={showPopup}
        onTogglePopup={handleShowPopupClick}
      />
      <UploadEvent
        isOpen={uploadModalIsOpen}
        onClose={() => setUploadModalIsOpen(false)}
      />
    </>
  );
};

export default Calendar;