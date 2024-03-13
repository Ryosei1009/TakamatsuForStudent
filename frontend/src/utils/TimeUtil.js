import { format, fromUnixTime } from "date-fns";

export function newsListTimeFormat(unix) {
    const date = fromUnixTime(parseInt(unix / 1000));
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    return format(date, 'yy/MM/dd');
}

export function eachNewsTimeFormat(unix) {
    const date = fromUnixTime(parseInt(unix / 1000));
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const ampm = date.getHours() < 12 ? '午前' : '午後';
    return format(date, `${ampm}hh:mm・yyyy年MM月dd日`);
}

export function devNewsTimeFormat(unix) {
    const date = fromUnixTime(parseInt(unix / 1000));
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    return format(date, 'yyyy/MM/dd');
}