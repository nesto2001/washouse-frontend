import { FeedbackOrderResponse } from '../Feedback/FeedbackOrderResponse';
import { CenterOrderDeliveryResponse } from '../Staff/CenterOrderDeliveryResponse';
import { CenterOrderPaymentResponse } from '../Staff/CenterOrderPaymentResponse';
import { CenterOrderTrackingResponse } from '../Staff/CenterOrderTrackingResponse';
import { CenterOrderedServiceResponse } from '../Staff/CenterOrderedServiceResponse';
import { CenterFeedbackResponse } from '../Staff/StaffFeedback/CenterFeedbackResponse';

export type CustomerOrderDetailsReponse = {
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
    orderedDetails: CenterOrderedServiceResponse[];
    orderTrackings: CenterOrderTrackingResponse[];
    orderDeliveries: CenterOrderDeliveryResponse[];
    orderPayment: CenterOrderPaymentResponse;
    feedback: FeedbackOrderResponse | null;
    center: {
        centerId: number;
        centerName: string;
        centerAddress: string;
        centerPhone: string;
    };
};
