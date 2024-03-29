export function getToday(): number {
    const now = new Date();
    const dayIndex = now.getDay();
    return dayIndex;
}

export function compareTime(openTime: string, closeTime: string): boolean {
    const now = new Date();
    const open = new Date(now);
    const close = new Date(now);

    // Parse opening and closing times as hours and minutes
    const openHour = parseInt(openTime.slice(0, 2));
    const openMinute = parseInt(openTime.slice(3, 5));
    const closeHour = parseInt(closeTime.slice(0, 2));
    const closeMinute = parseInt(closeTime.slice(3, 5));

    // Set opening and closing times on Date objects
    open.setHours(openHour, openMinute, 0);
    close.setHours(closeHour, closeMinute, 0);

    // Compare current time to opening and closing times
    if (now >= open && now <= close) {
        return true; // location is open
    } else {
        return false; // location is closed
    }
}

export function formatTime(date: Date): string {
    const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return timeString;
}

export function formatDate(date: Date): string {
    const paddedDate = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
    const paddedMonth = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const formattedDate = `${paddedDate}/${paddedMonth}/${year}`;
    return formattedDate;
}

export function formatDateString(date: string): string {
    const dateType = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = dateType.toLocaleDateString('vi-VN');
    return formattedDate;
}

export function formatDateTime(date: Date): string {
    const paddedDate = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
    const paddedMonth = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formattedDate = `${paddedDate}/${paddedMonth}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export function formatDateTimeFull(date: Date): string {
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

export function getHour(time: string | null | undefined): number {
    if (!time) {
        return 0;
    }
    return +time.split(':')[0];
}
export function formatDateEn(date: Date): string {
    return date.toLocaleDateString();
}

export function timeSince(date: Date) {
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' năm trước';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' tháng trước';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' ngày trước';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' giờ trước';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' phút trước';
    }
    return 'vài giây trước';
}
