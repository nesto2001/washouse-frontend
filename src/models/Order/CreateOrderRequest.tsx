import { DeliveryInfoRequest } from './DeliveryInfoRequest';
import { OrderDetailsRequest } from './OrderDetailsRequest';

export type CreateOrderRequest = {
    centerId: number;
    order: {
        customerName: string;
        customerAddressString: string;
        customerWardId: number;
        customerEmail: string;
        customerMobile: string;
        customerMessage: string;
        customerId?: number;
        deliveryType: number;
        deliveryPrice: number;
        preferredDropoffTime: string;
        preferredDeliverTime: string;
    };
    orderDetails: OrderDetailsRequest[];
    deliveries: DeliveryInfoRequest[];
    promoCode?: string;
    paymentMethod: number;
};
