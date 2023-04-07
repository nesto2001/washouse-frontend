import { RcFile } from 'antd/es/upload';
import { API_LOGIN, API_MEDIA } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { MediaResponse } from '../models/Media/MediaResponse';
import instance from '../services/axios/AxiosInstance';

export const uploadSingle = async (file: File | RcFile) => {
    const formData = new FormData();
    formData.append('Photo', file);
    const response = await instance.post<Response<MediaResponse>>(API_MEDIA, formData);
    return response;
};
