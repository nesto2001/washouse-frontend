export type OrderOverviewResponse = {
    numOfPendingOrder: number;
    numOfProcessingOrder: number;
    numOfReadyOrder: number;
    numOfPendingDeliveryOrder: number;
    numOfCompletedOrder: number;
    numOfCancelledOrder: number;
};
