import { DeliveryEnum } from './enum/DeliveryEnum';

export type DeliveryOption = {
    type: DeliveryEnum;
    freight: number;
};
