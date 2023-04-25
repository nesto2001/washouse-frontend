import dayjs from 'dayjs';

export type PostModel = {
    id: number;
    title: string;
    content: string;
    description: string;
    thumbnail: string;
    type: string;
    status: string;
    createdDate: dayjs.Dayjs;
    updatedDate: dayjs.Dayjs;
};
