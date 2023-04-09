import { CenterOrderDeliveryModel } from './CenterOrderDeliveryModel';
import { CenterOrderPaymentModel } from './CenterOrderPaymentModel';
import { CenterOrderTrackingModel } from './CenterOrderTrackingModel';
import { CenterOrderedServiceModel } from './CenterOrderedServiceModel';

export type CenterOrderDetailsModel = {
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
    orderedDetails: CenterOrderedServiceModel[];
    orderTrackings: CenterOrderTrackingModel[];
    orderDeliveries: CenterOrderDeliveryModel[];
    orderPayment: CenterOrderPaymentModel;
};
