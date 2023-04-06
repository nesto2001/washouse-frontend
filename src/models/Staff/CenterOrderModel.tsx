import { CenterOrderedServiceModel } from './CenterOrderedServiceModel';

export type CenterOrderModel = {
    id: string;
    orderedDate: string;
    customerName: string;
    totalValue: number;
    discount: number;
    totalPayment: number;
    status: string;
    orderedServices: CenterOrderedServiceModel[];
};