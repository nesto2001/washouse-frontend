import { CenterOrderedServiceResponse } from './CenterOrderedServiceResponse';

export type CenterOrderResponse = {
    orderId: string;
    orderDate: string;
    customerName: string;
    totalOrderValue: number;
    discount: number;
    totalOrderPayment: number;
    status: string;
    orderedServices: CenterOrderedServiceResponse[];
};
