import { List } from 'reselect/es/types';
import { Response } from '../models/CommonModel';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { LocationModel } from '../models/LocationModel';
import { WardReponse } from '../models/WardResponse';
import { LocationType } from '../types/LocationType';
import { LocationResponse } from '../models/Location/LocationResponse';

export const getDistricts = async (): Promise<LocationModel[]> => {
    const { data } = await instance.get<Response<List<DistrictReponse>>>('/api/district/getAll', {});
    return data.data.map((item): LocationModel => {
        return {
            id: item.districtId,
            name: item.districtName,
        };
    });
};

export const getUserDistrict = async ({ lat, long }: { lat: number; long: number }): Promise<LocationModel> => {
    const { data } = await instance.get<Response<DistrictReponse>>('/api/district/getDistrictByLatLong', {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return { id: data.data.districtId, name: data.data.districtName };
};

export const getWards = async (id: number): Promise<LocationModel[]> => {
    const { data } = await instance.get<Response<List<WardReponse>>>(`/api/ward/getWardListByDistrict/${id}`, {});
    return data.data.map((item): LocationModel => {
        return {
            id: item.wardId,
            name: item.wardName,
        };
    });
};

export const searchLocation = async (address: string, wardId: number): Promise<LocationType> => {
    const { data } = await instance.get<Response<LocationResponse>>(`/api/locations/search`, {
        params: {
            AddressString: address,
            WardId: wardId,
        },
    });
    return {
        latitude: data.data.latitude,
        longitude: data.data.longitude,
    };
};
