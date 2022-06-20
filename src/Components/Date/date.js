import { differenceInCalendarDays } from "date-fns";
import { formatDistance } from "date-fns";
export * from date;


function newDate(string) {
    const day = string.slice(0, 2);
    const month = string.slice(3, 5);
    const year = string.slice(6, 10);
    return new Date(year, month, day);
}

function diffDate(dueDate) {
    const distance = formatDistance(dueDate, new Date());
    return distance;
}