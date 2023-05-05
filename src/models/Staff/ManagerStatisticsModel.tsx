import dayjs from 'dayjs';

export type ManagerStatisticsModel = {
    orderOverview: {
        numOfPendingOrder: number;
        numOfProcessingOrder: number;
        numOfReadyOrder: number;
        numOfPendingDeliveryOrder: number;
        numOfCompletedOrder: number;
        numOfCancelledOrder: number;
    };
    dailystatistics: Array<{
        day: dayjs.Dayjs;
        totalOrder: number;
        successfulOrder: number;
        cancelledOrder: number;
        revenue: number;
    }>;
};
