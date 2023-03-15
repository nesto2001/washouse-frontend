export function getToday(): number {
    const now = new Date();
    const dayIndex = now.getDay();
    return dayIndex;
}

export function compareTime(start: Date, end: Date): boolean {
    const now = new Date().getHours();
    const opening = start.getHours();
    const closing = end.getHours();
    const open = now >= opening && now <= closing;
    return open;
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
