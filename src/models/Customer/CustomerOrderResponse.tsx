import { CenterOrderedServiceResponse } from '../Staff/CenterOrderedServiceResponse';

export type CustomerOrderResponse = {
    orderId: string;
    orderDate: string;
    customerName: string;
    totalOrderValue: number;
    discount: number;
    totalOrderPayment: number;
    centerId: number;
    centerName: string;
    status: string;
    isFeedback: boolean;
    orderedServices: CenterOrderedServiceResponse[];
};
