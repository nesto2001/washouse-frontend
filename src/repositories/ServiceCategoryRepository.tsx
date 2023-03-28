import { List } from 'reselect/es/types';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { LocationModel } from '../models/LocationModel';
import { CategoryOptionsModel } from '../models/Category/CategoryOptionsModel';
import { CategoryResponse } from '../models/Category/CategoryResponse';
import { API_CATEGORY } from '../common/Constant';

export const getCategoryOptions = async (): Promise<CategoryOptionsModel[]> => {
    const { data } = await instance.get<List<CategoryResponse>>(API_CATEGORY, {});
    const categoryOptions = data.map((item): CategoryOptionsModel => {
        return {
            id: item.id,
            name: item.categoryName,
        };
    });
    return [{ id: 0, name: 'Chọn phân loại' }, ...categoryOptions];
};
