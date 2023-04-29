import { DeliveryPriceType } from '../../types/Price/DeliveryPriceType';

export type CenterDeliveryPriceRequest = {
    hasDelivery: boolean;
    deliveryPrice?: DeliveryPriceType[];
};
