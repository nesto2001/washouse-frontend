import { CenterOrderedServiceModel } from '../Staff/CenterOrderedServiceModel';

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
    orderedServices: CenterOrderedServiceModel[];
};
