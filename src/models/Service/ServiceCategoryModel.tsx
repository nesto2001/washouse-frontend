import { ServiceModel } from './ServiceModel';

export type ServiceCategoryModel = {
    categoryID: number;
    categoryName: string;
    services: ServiceModel[] | null;
};
