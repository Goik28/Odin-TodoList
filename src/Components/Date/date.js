import { differenceInCalendarDays, format } from "date-fns";
export {newDate, diffDate, formatDate};


function newDate(string) {
    const day = string.slice(8, 10);
    const month = string.slice(5, 7)-1;
    const year = string.slice(0, 4);
    return new Date(year, month, day);
}

function diffDate(dueDate) {
    const today = new Date();
    if (dueDate >= today){
        const distance = differenceInCalendarDays(dueDate, today);
        return distance;
    } else {
        const distance = differenceInCalendarDays(today, dueDate);
        return (0 - distance);
    }    
}

function formatDate(date){
    return format(date, "MM/dd/yyyy");
}