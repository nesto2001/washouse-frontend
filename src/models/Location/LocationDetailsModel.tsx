export type LocationDetailsModel = {
    id: number;
    address: string;
    ward: {
        id: number;
        name: string;
        district: {
            id: number;
            name: number;
        };
    };
    latitude: number;
    longitude: number;
};
