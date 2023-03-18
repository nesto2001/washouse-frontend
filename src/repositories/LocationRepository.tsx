import { List } from 'reselect/es/types';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { DistrictType } from '../types/DistrictType';

export const getDistricts = async (): Promise<DistrictType[]> => {
    const { data } = await instance.get<List<DistrictReponse>>('/api/district/getAll', {});
    return data.map((item): DistrictType => {
        return {
            id: item.districtId,
            name: item.districtName,
        };
    });
};

export const getUserDistrict = async ({ lat, long }: { lat: number; long: number }): Promise<DistrictType> => {
    const { data } = await instance.get<DistrictReponse>('/api/district/getDistrictByLatLong', {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return { id: data.districtId, name: data.districtName };
};
