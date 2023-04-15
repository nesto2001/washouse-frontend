import { API_ADMIN_POST } from '../common/Constant';
import { PaginationResponse } from '../models/CommonModel';
import { PostModel } from '../models/Post/PostModel';
import { PostResponse } from '../models/Post/PostResponse';
import instance from '../services/axios/AxiosInstance';

export const getAdminPosts = async ({
    page,
    pageSize,
    type,
    status,
}: {
    page?: number;
    pageSize?: number;
    type?: string;
    status?: string;
}): Promise<PostModel[]> => {
    const { data } = await instance.get<PaginationResponse<PostResponse>>(API_ADMIN_POST, {
        params: {
            page: page,
            pageSize: pageSize,
            type: type,
            status: status,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.items.map((item): PostModel => {
        return {
            id: item.id,
            type: item.type,
            thumbnail: item.thumbnail,
            title: item.title,
            content: item.content,
            status: item.status,
            createdDate: item.createdDate,
            updatedDate: item.updatedDate,
        };
    });
};
