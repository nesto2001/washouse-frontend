import { API_WALLET_ACTIVATE } from '../common/Constant';
import { Response } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';

export const activateWallet = async (): Promise<number> => {
    const { data } = await instance.get<Response<number>>(API_WALLET_ACTIVATE, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data;
};
