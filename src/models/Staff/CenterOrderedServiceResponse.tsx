import { CenterOrderTrackingResponse } from "./CenterOrderTrackingResponse";

export type CenterOrderedServiceResponse = {
    orderDetailId: number;
    serviceName: string;
    serviceCategory: string;
    measurement: number;
    unit: string;
    image: string;
    customerNote: string;
    staffNote: string | null;
    status: string | null;
    price: number | null;
    orderDetailTrackings: CenterOrderTrackingResponse[];
};
