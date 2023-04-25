export type CenterOrderDeliveryResponse = {
    addressString: string;
    shipperName: string;
    shipperPhone: string;
    locationId: number;
    deliveryType: true; //false = to, true = back
    estimatedTime: number;
    deliveryDate: string;
    status: string;
};
