import { ServiceCategoryResponse } from '../Service/ServiceCategoryResponse';

export type CenterResponse = {
    id: number;
    thumbnail: string;
    title: string;
    alias: string;
    description: string;
    centerServices: ServiceCategoryResponse[];
    rating: number;
    numOfRating: number;
    phone: string;
    centerAddress: string;
    centerLocation: {
        latitude: number;
        longitude: number;
    };
    centerOperatingHours: [
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
        {
            day: string;
            openTime: string;
            closeTime: string;
        },
    ];
};
