export type AddressDataType = {
    addressString: string;
    ward: {
        wardId: number;
        wardName: string;
        district: {
            districtId: number;
            districtName: string;
        };
    };
    latitude: number;
    longitude: number;
};
