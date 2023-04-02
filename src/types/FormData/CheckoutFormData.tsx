import { DeliveryFormData } from './DeliveryFormData';

export type CheckoutFormData = {
    fullname: string;
    address: string;
    city: number;
    district: number;
    wardId: number;
    email: string;
    phone: string;
    deliveryType: number;
    deliveryPrice: number;
    paymentType: number;
    deliveryInfo: DeliveryFormData[];
    promoCode?: string;
    preferredDropoffTime: string;
    preferredDeliverTime: string;
};
