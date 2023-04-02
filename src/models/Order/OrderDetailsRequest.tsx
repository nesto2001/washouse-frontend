export type OrderDetailsRequest = {
    serviceId: number;
    measurement: number;
    price: number;
    customerNote?: string;
    staffNote?: string;
};
