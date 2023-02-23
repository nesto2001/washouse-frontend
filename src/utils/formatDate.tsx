import React from 'react';

function formatDate(date: Date): string {
    const paddedDate = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
    const paddedMonth = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const formattedDate = `${paddedDate}/${paddedMonth}/${year}`;
    return formattedDate;
}

export default formatDate;
