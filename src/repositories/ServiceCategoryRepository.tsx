import { List } from 'reselect/es/types';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { DistrictType } from '../types/DistrictType';

export const getDistricts = async (): Promise<DistrictType[]> => {
    const { data } = await instance.get<List<DistrictReponse>>('/api/district/getAll', {
        headers: {
            Accept: 'application/json',
        },
    });
    return data.map((item): DistrictType => {
        return {
            id: item.districtID,
            name: item.districtName,
        };
    });
};
