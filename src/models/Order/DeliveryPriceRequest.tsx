export type DeliveryPriceRequest = {
    centerId: number;
    totalWeight: number;
    dropoffAddress?: string;
    dropoffWardId?: number;
    deliverAddress?: string;
    deliverWardId?: number;
    deliveryType: number;
};
