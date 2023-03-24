export interface CenterRequest {
    center: {
        centerName: string;
        alias?: string;
        phone: string;
        description: string;
        monthOff?: string;
        savedFileName?: string;
        hasDelivery: boolean;
    };
    location: {
        addressString: string;
        wardId: number;
        latitude: number;
        longitude: number;
    };
    centerOperatingHours: {
        day: number;
        openTime: string | null;
        closeTime: string | null;
    }[];
}
