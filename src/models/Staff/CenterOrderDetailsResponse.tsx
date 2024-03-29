import { FeedbackOrderResponse } from '../Feedback/FeedbackOrderResponse';
import { CenterOrderDeliveryResponse } from './CenterOrderDeliveryResponse';
import { CenterOrderPaymentResponse } from './CenterOrderPaymentResponse';
import { CenterOrderTrackingResponse } from './CenterOrderTrackingResponse';
import { CenterOrderedServiceResponse } from './CenterOrderedServiceResponse';

export type CenterOrderDetailsReponse = {
    id: string;
    customerName: string;
    locationId: number; //location id
    customerEmail: string;
    customerMobile: string;
    customerMessage: string;
    customerOrdered: number; //customerid
    totalOrderValue: number; //total ordered service value
    deliveryType: number; //0 no deli, 1 one way to, 2 one way back, 3 two way
    deliveryPrice: number;
    preferredDropoffTime: string;
    preferredDeliverTime: string;
    status: string;
    feedback: FeedbackOrderResponse | null;
    orderedDetails: CenterOrderedServiceResponse[];
    orderTrackings: CenterOrderTrackingResponse[];
    orderDeliveries: CenterOrderDeliveryResponse[];
    orderPayment: CenterOrderPaymentResponse;
};
