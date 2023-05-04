export interface UpdateCenterRequest {
    centerName?: string;
    alias?: string;
    phone?: string;
    description?: string;
    monthOff?: string;
    savedFileName?: string;
    taxCode?: string;
    location?: {
        addressString?: string;
        wardId?: number;
        latitude?: number;
        longitude?: number;
    };
}
