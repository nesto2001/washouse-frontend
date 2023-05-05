import { ManagerDeliveryPriceChartRequest } from './ManagerDeliveryPriceChartRequest';

export type ManagerDeliveryPriceRequest = {
    hasDelivery: boolean;
    deliveryPriceCharts: ManagerDeliveryPriceChartRequest[];
};
