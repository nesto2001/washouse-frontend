import { SubService } from '../types/ServiceType/SubService';

function calculatePrice(service: SubService, weightOrQuantity: number): number | null {
    if (!service.priceChart) {
        return null;
    }

    for (let i = 0; i < service.priceChart.length; i++) {
        const { maxValue, price } = service.priceChart[i];
        if (weightOrQuantity <= maxValue) {
            return price;
        }
    }

    return null; // Return null if the weight or quantity exceeds the maximum value in the price chart
}

export default calculatePrice;
