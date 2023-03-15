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

export const getUserDistricts = async ({ lat, long }: { lat: number; long: number }): Promise<DistrictType> => {
    const { data } = await instance.get<DistrictReponse>('/api/googleMaps/getDistrictFromLatLong', {
        params: {
            latitude: lat,
            longitude: long,
        },
        headers: {
            Accept: 'application/json',
        },
    });
    return { id: data.districtID, name: data.districtName };
};
