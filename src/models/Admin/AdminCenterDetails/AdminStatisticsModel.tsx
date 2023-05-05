import dayjs from 'dayjs';

export type AdminStatisticsModel = {
    centerOverview: {
        numberOfPendingCenters: number;
        numberOfActiveCenters: number;
        numberOfClosedCenters: number;
    };
    dailystatistics: Array<{
        day: dayjs.Dayjs;
        numberOfNewPosts: number;
        numberOfNewUsers: number;
        numberOfNewCenters: number;
    }>;
};
