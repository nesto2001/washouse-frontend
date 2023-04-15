import { CenterOrderDeliveryBriefResponse } from './CenterOrderDeliveryBriefResponse';
import { CenterOrderedServiceResponse } from './CenterOrderedServiceResponse';

export type CenterOrderResponse = {
    orderId: string;
    orderDate: string;
    customerName: string;
    totalOrderValue: number;
    discount: number;
    totalOrderPayment: number;
    status: string;
    deliveryType: number;
    centerId: number;
    centerName: string;
    deliveries: CenterOrderDeliveryBriefResponse[];
    orderedServices: CenterOrderedServiceResponse[];
};
