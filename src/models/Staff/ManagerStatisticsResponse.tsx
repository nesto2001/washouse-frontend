export type ManagerStatisticsResponse = {
    orderOverview: {
        numOfPendingOrder: number;
        numOfProcessingOrder: number;
        numOfReadyOrder: number;
        numOfPendingDeliveryOrder: number;
        numOfCompletedOrder: number;
        numOfCancelledOrder: number;
    };
    dailystatistics: [
        {
            day: string;
            totalOrder: number;
            successfulOrder: number;
            cancelledOrder: number;
            revenue: number;
        },
    ];
};
