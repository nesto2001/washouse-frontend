import { API_ADMIN_CENTER } from '../common/Constant';
import { AdminCenterModel } from '../models/Admin/AdminCenterModel';
import { AdminCenterResponse } from '../models/Admin/AdminCenterResponse';
import { PaginationResponse } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';

export const getCenterList = async ({
    page,
    pageSize,
    status,
    searchString,
}: {
    page?: number;
    pageSize?: number;
    status?: string;
    searchString?: string | null;
}): Promise<AdminCenterModel[]> => {
    const { data } = await instance.get<PaginationResponse<AdminCenterResponse>>(API_ADMIN_CENTER, {
        params: {
            Page: page,
            PageSize: pageSize,
            Status: status,
            SearchString: searchString,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.items.map((item): AdminCenterModel => {
        return {
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            alias: item.alias,
            rating: item.rating,
            numOfRating: item.numOfRating,
            phone: item.phone,
            address: item.centerAddress,
            status: item.status,
            taxCode: item.taxCode,
            managerId: item.managerId,
            managerName: item.managerName,
        };
    });
};
