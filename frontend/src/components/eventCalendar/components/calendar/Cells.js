import Loading from '../../../_util/Loading';
import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';

const Cells = ({ eventData, timer, currentDate, handleEachModalClick }) => {
    if (eventData.length === 0) return (
        <>
            {timer ? (
                <div className="text-3xl max-xl:text-2xl max-sm:text-lg font-bold ml-2 text-red-500">
                    サーバーが落ちている可能性があります。運営にお問い合わせください。
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
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
}

export default Cells