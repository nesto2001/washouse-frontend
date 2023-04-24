import {
    API_ADMIN_POST,
    API_ADMIN_POST_DETAIL,
    API_ADMIN_POST_DETAIL_PUBLIC,
    API_PUBLIC_POST,
} from '../common/Constant';
import { AddPostRequest } from '../containers/AdminContainer/PostContainer/AdminCreatePostContainer';
import { PaginationResponse, Response } from '../models/CommonModel';
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
            description: item.description,
            thumbnail: item.thumbnail,
            title: item.title,
            content: item.content,
            status: item.status,
            createdDate: item.createdDate,
            updatedDate: item.updatedDate,
        };
    });
};

export const createPost = async (request: AddPostRequest) => {
    const { status } = await instance.post(API_ADMIN_POST, request);
    if (status !== 200) {
        return Promise.reject();
    }
};

export const getPostDetail = async (id: number): Promise<PostModel> => {
    const { data } = await instance.get<Response<PostResponse>>(API_ADMIN_POST_DETAIL.replace('${id}', id.toString()), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return {
        id: data.data.id,
        type: data.data.type,
        description: data.data.description,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
        content: data.data.content,
        status: data.data.status,
        createdDate: data.data.createdDate,
        updatedDate: data.data.updatedDate,
    };
};

export const getPublicPosts = async (): Promise<PostModel[]> => {
    const { data } = await instance.get<PaginationResponse<PostResponse>>(API_PUBLIC_POST);
    return data.data.items.map((item): PostModel => {
        return {
            id: item.id,
            type: item.type,
            description: item.description,
            thumbnail: item.thumbnail,
            title: item.title,
            content: item.content,
            status: item.status,
            createdDate: item.createdDate,
            updatedDate: item.updatedDate,
        };
    });
};

export const getPostDetailPublic = async (id: number): Promise<PostModel> => {
    const { data } = await instance.get<Response<PostResponse>>(
        API_ADMIN_POST_DETAIL_PUBLIC.replace('${id}', id.toString()),
    );
    return {
        id: data.data.id,
        type: data.data.type,
        description: data.data.description,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
        content: data.data.content,
        status: data.data.status,
        createdDate: data.data.createdDate,
        updatedDate: data.data.updatedDate,
    };
};
