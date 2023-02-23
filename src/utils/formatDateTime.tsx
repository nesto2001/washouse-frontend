import React from 'react';

function formatDateTime(date: Date): string {
    const paddedDate = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
    const paddedMonth = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formattedDate = `${paddedDate}/${paddedMonth}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export default formatDateTime;
