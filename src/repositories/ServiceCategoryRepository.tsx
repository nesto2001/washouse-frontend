import { API_CATEGORY, API_PIN_CATEGORY, API_UNPIN_CATEGORY } from '../common/Constant';
import { CategoryOptionsModel } from '../models/Category/CategoryOptionsModel';
import { CategoryResponse } from '../models/Category/CategoryResponse';
import { ServiceCategoryDetailModel } from '../models/Category/ServiceCategoryDetailModel';
import { ListResponse, Response } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';

export const getCategoryOptions = async (): Promise<CategoryOptionsModel[]> => {
    const { data } = await instance.get<ListResponse<CategoryResponse>>(API_CATEGORY, {});
    return data.data.map((item): CategoryOptionsModel => {
        return {
            id: item.categoryId,
            name: item.categoryName,
        };
    });
};

export const getServiceCategories = async (): Promise<ServiceCategoryDetailModel[]> => {
    const { data } = await instance.get<ListResponse<CategoryResponse>>(API_CATEGORY, {});
    return data.data.map((item): ServiceCategoryDetailModel => {
        return {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            categoryAlias: item.categoryAlias,
            description: item.description,
            image: item.image,
            homeFlag: item.homeFlag,
        };
    });
};

export const pinCategory = async (id: number): Promise<null> => {
    const { data } = await instance.put<Response<null>>(
        API_PIN_CATEGORY.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return data.data;
};

export const unpinCategory = async (id: number): Promise<null> => {
    const { data } = await instance.put<Response<null>>(
        API_UNPIN_CATEGORY.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return data.data;
};
