function unixToTime(unix) {
    const intUnix = parseInt(unix);
    const date = new Date(intUnix).toLocaleDateString();
    const time = new Date(intUnix).toLocaleTimeString([], { hour12: false });
    const dateTime = date + " " + time;
    return dateTime;
}

export function newsListTimeFormat(unix) {
    const dateTime = unixToTime(unix);
    const [datePart,] = dateTime.split(' ');
    const [years, months, days] = datePart.split('/');
    const shortYears = years % 100;
    const formattedDate = `${shortYears}/${months}/${days}`;
    return formattedDate;
}

export function eachNewsTimeFormat(unix) {
    const dateTime = unixToTime(unix);
    const [datePart, timePart] = dateTime.split(' ');
    const [years, months, days] = datePart.split('/');
    const [hours, minutes,] = timePart.split(':');
    const hoursInfo = 
        hours < 13 ? `午前${hours}` : `午後${hours - 12}`;
    const formattedDate = `${hoursInfo}:${minutes}・${years}年${months}月${days}日`;
    return formattedDate;
}