import { ServiceResponse } from '../Service/ServiceResponse';

export type CategoryResponse = {
    id: number;
    categoryName: string;
    alias: string;
    parentId: null;
    description: string;
    image: string;
    status: boolean;
    homeFlag: boolean;
    services?: ServiceResponse[];
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
};
