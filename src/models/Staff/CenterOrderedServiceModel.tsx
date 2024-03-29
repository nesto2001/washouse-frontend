import { CenterOrderTrackingModel } from './CenterOrderTrackingModel';

export type CenterOrderedServiceModel = {
    id: number;
    name: string;
    category: string;
    measurement: number;
    unit: string;
    image: string;
    customerNote: string;
    staffNote: string | null;
    status: string | null;
    price: number;
    unitPrice: number;
    orderDetailTrackings: CenterOrderTrackingModel[];
};
