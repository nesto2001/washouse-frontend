import { DeliveryEnum } from './enum/DeliveryEnum';

export type DeliveryOption = {
    type: DeliveryEnum;
    title: string;
    children: JSX.Element;
};
