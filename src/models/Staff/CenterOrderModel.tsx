import { CenterOrderDeliveryBriefModel } from './CenterOrderDeliveryBriefModel';
import { CenterOrderedServiceModel } from './CenterOrderedServiceModel';

export type CenterOrderModel = {
    id: string;
    orderedDate: string;
    customerName: string;
    totalValue: number;
    discount: number;
    totalPayment: number;
    status: string;
    deliveryType: number;
    centerId: number;
    centerName: string;
    deliveries: CenterOrderDeliveryBriefModel[];
    orderedServices: CenterOrderedServiceModel[];
};
