import dayjs from 'dayjs';

export interface BlogCardData {
    id: number;
    type: string;
    thumbnail: string;
    title: string;
    description: string | React.ReactNode;
    date: dayjs.Dayjs;
}
