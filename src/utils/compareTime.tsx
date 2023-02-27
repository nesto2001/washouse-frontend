function compareTime(start: Date, end: Date): boolean {
    const now = new Date().getHours();
    const opening = start.getHours();
    const closing = end.getHours();
    const open = now >= opening && now <= closing;
    return open;
}

export default compareTime;
