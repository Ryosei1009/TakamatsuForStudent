import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

// イベントデータ（Unix秒で日付を管理）
const eventData = [
  { date: 1709218800, title: '卓球' }, // 2024-03-01のUnix秒
  { date: 1709478000, title: 'ポケカ' }, // 2024-03-04のUnix秒
  { date: 1709564400, title: '栗林公園' }, // 2024-03-05のUnix秒
  { date: 1709650800, title: 'スウィッチ' }, // 2024-03-06のUnix秒
  { date: 1709823600, title: 'ふじふじ' }, // 2024-03-08のUnix秒
  { date: 1710082800, title: 'ポーカー' }, // 2024-03-11のUnix秒
  { date: 1710255600, title: '麻雀' }, // 2024-03-13のUnix秒
  { date: 1710514800, title: '3年性を送る会' }, // 2024-03-16のUnix秒
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
        const events = eventData.filter(event => isSameDay(new Date(event.date * 1000), new Date(formattedDate)));

        days.push(
          <button
            key={day}
            className={`text-center p-2 hover:bg-blue-100 flex justify-start flex-col items-center h-24
              ${!isSameMonth(day, monthStart)
                ? 'text-gray-400'
                : isSameDay(day, new Date())
                  ? 'bg-blue-200'
                  : ''
              }`}
            onClick={() => console.log('Clicked')}
          >
            <div>{format(day, 'd')}</div>
            {events.map((event, index) => (
              <div key={index} className="text-xs font-medium text-blue-600">
                {event.title}
              </div>
            ))}
          </button>
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
    <div className="max-w-xl mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;