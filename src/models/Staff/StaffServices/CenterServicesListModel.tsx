import { CenterServiceModel } from './CenterServiceModel';

export type CenterServicesListModel = {
    serviceCategoryID: number;
    serviceCategoryName: string;
    services: CenterServiceModel[];
};
