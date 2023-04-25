export type CenterOrderDeliveryModel = {
    addressString: string;
    shipperName: string;
    shipperPhone: string;
    locationId: number;
    type: true; //false = to, true = back
    estimated: number;
    date: string;
    status: string;
};
