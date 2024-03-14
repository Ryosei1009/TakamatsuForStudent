import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns'
import React from 'react'

const Header = ({ currentDate, setCurrentDate }) => {
    const nextMonth = () => {
        setCurrentDate(addDays(endOfMonth(currentDate), 1));
    };
    const prevMonth = () => {
        setCurrentDate(addDays(startOfMonth(currentDate), -1));
    };

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
    )
}

export default Header