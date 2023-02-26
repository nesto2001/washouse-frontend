import React from 'react';

const days: string[] = [];

export const getToday = (): 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' => {
    const now = new Date();
    const dayIndex = now.getDay();
    return days[dayIndex].toLowerCase() as
        | 'sunday'
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday';
};

export default getToday;
