export type CenterOrderDeliveryModel = {
    shipperName: string;
    shipperPhone: string;
    locationId: number;
    type: true; //false = to, true = back
    estimated: number;
    date: string;
    status: string;
};
