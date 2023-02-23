import React from 'react';

function formatDateTimeFull(date: Date): string {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = dayNames[date.getUTCDay()];
    const paddedDate = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
    const paddedMonth = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formattedDate = `${day} ${paddedDate}/${paddedMonth}/${year} ${hours}:${minutes}:${seconds} GMT`;
    return formattedDate;
}

export default formatDateTimeFull;
