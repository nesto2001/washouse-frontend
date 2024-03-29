export type AdminStatisticsResponse = {
    centerOverview: {
        numberOfPendingCenters: number;
        numberOfActiveCenters: number;
        numberOfClosedCenters: number;
    };
    dailystatistics: Array<{
        day: string;
        numberOfNewPosts: number;
        numberOfNewUsers: number;
        numberOfNewCenters: number;
    }>;
};
