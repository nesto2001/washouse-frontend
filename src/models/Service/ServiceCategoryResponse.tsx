import { ServiceResponse } from "./ServiceResponse";

export type ServiceCategoryResponse = {
    serviceCategoryID: number;
    serviceCategoryName: string;
    services: ServiceResponse[];
};
