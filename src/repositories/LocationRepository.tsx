import { List } from 'reselect/es/types';
import { Response } from '../models/CommonModel';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { DistrictType } from '../types/DistrictType';

export const getDistricts = async (): Promise<DistrictType[]> => {
    const { data } = await instance.get<Response<List<DistrictReponse>>>('/api/district/getAll', {});
    return data.data.map((item): DistrictType => {
        return {
            id: item.districtId,
            name: item.districtName,
        };
    });
};

export const getUserDistrict = async ({ lat, long }: { lat: number; long: number }): Promise<DistrictType> => {
    const { data } = await instance.get<Response<DistrictReponse>>('/api/district/getDistrictByLatLong', {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return { id: data.data.districtId, name: data.data.districtName };
};
