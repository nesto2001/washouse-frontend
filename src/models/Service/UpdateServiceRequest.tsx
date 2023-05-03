export type UpdateServiceRequest = {
    description: string;
    image?: string;
    timeEstimate: number;
    price?: number;
    minPrice?: number;
    servicePrices?: Array<{
        maxValue: number;
        price: number;
    }>;
    rate: number;
};
