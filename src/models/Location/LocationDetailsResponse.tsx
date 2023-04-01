export type LocationDetailsResponse = {
    id: number;
    addressString: string;
    ward: {
        wardId: number;
        wardName: string;
        district: {
            districtId: number;
            districtName : number;
        }
    }
    latitude: number;
    longitude: number;
};
