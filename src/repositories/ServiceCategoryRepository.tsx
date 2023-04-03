import { API_CATEGORY } from '../common/Constant';
import { CategoryOptionsModel } from '../models/Category/CategoryOptionsModel';
import { CategoryResponse } from '../models/Category/CategoryResponse';
import { ListResponse } from '../models/CommonModel';
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
