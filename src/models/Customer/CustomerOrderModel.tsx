import { CenterOrderedServiceModel } from '../Staff/CenterOrderedServiceModel';
import { CustomerOrderedServiceModel } from './CustomerOrderedServiceModel';

export type CustomerOrderModel = {
    id: string;
    orderedDate: string;
    customerName: string;
    totalValue: number;
    discount: number;
    totalPayment: number;
    status: string;
    centerId: number;
    centerName: string;
    isFeedback: boolean;
    orderedServices: CustomerOrderedServiceModel[];
};
