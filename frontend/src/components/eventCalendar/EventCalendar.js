import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useAuth0 } from "@auth0/auth0-react";
import { getAccountData } from '../../utils/AccountUtil';
import { fetchData } from '../../utils/Fetch'
import EventModal from './components/EachEvent';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

Modal.setAppElement("#root");

const Calendar = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  useEffect(() => {
    getAccountData(user, setEachAccount);
  }, [user]);

  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    fetchData('/api/event', setEventData);
  }, [])

  const [currentDate, setCurrentDate] = useState(new Date());

  // それぞれのイベントのモーダル
  const [eachModalIsOpen, setEachModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // イベントのアップロードモーダル
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEachModalClick = (event) => {
    setSelectedEvent(event);
    setEachModalIsOpen(true);
  };

  const handleShowPopupClick = () => {
    setShowPopup(!showPopup);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center my-4">
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
              }
              ${eachAccount.role <= 2 ? "cursor-pointer hover:bg-blue-100" : ""}
              `}
            onClick={eachAccount.role <= 2 ? () => console.log('Clicked' + formattedDate) : null}
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

  const deleteEvent = (id) => {
    axios.delete(`/delete/event/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('削除エラー:', error);
      });
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <EventModal
        isOpen={eachModalIsOpen}
        onClose={() => setEachModalIsOpen(false)}
        event={selectedEvent}
        showPopup={showPopup}
        onTogglePopup={handleShowPopupClick}
        onDelete={deleteEvent}
      />
    </>
  );
};

export default Calendar;