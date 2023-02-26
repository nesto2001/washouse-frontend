
function formatTime(date: Date): string {
    const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return timeString;
}

export default formatTime;
