import { CenterServiceResponse } from "./CenterServiceResponse";

export type CenterServicesListResponse = {
    serviceCategoryID: number;
    serviceCategoryName: string;
    services: CenterServiceResponse[];
};
