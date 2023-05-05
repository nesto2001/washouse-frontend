export type AdminStatisticsResponse = {
    orderOverview: {
        numOfPendingOrder: number;
        numOfProcessingOrder: number;
        numOfReadyOrder: number;
        numOfPendingDeliveryOrder: number;
        numOfCompletedOrder: number;
        numOfCancelledOrder: number;
    };
    dailystatistics: Array<{
        day: string;
        totalOrder: number;
        successfulOrder: number;
        cancelledOrder: number;
        revenue: number;
    }>;
};
