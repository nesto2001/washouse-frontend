export const getToday = (): number => {
    const now = new Date();
    const dayIndex = now.getDay();
    return dayIndex;
};

export default getToday;
