export type ServiceDetailsModel = {
    id: number;
    serviceName: string;
    alias: string;
    categoryId: number;
    description: string;
    priceType: boolean;
    image: string;
    price: number;
    timeEstimate: number;
    isAvailable: boolean;
    rating: number;
    numOfRating: number;
    centerId: number;
    serviceGalleries?: [];
    servicePrices?: [];
};
