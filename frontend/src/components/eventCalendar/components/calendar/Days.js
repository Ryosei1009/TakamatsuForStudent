import { addDays, format, startOfMonth, startOfWeek } from 'date-fns';
import React from 'react'

const Days = ({ currentDate }) => {
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
}

export default Days