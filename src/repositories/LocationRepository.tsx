import { List } from 'reselect/es/types';
import { Response } from '../models/CommonModel';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { LocationModel } from '../models/LocationModel';
import { WardReponse } from '../models/WardResponse';
import { LocationType } from '../types/LocationType';
import { LocationResponse } from '../models/Location/LocationResponse';
import { API_DISTRICT, API_DISTRICT_SEARCH, API_DISTRICT_WARDS, API_LOCATION_SEARCH } from '../common/Constant';

export const getDistricts = async (): Promise<LocationModel[]> => {
    const { data } = await instance.get<Response<List<DistrictReponse>>>(API_DISTRICT, {});
    return data.data.map((item): LocationModel => {
        return {
            id: item.districtId,
            name: item.districtName,
        };
    });
};

export const getUserDistrict = async ({ lat, long }: { lat: number; long: number }): Promise<LocationModel> => {
    const { data } = await instance.get<Response<DistrictReponse>>(API_DISTRICT_SEARCH, {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return { id: data.data.districtId, name: data.data.districtName };
};

export const getWards = async (id: number): Promise<LocationModel[]> => {
    const { data } = await instance.get<Response<List<WardReponse>>>(
        API_DISTRICT_WARDS.replace('${id}', id.toString()),
        {
            params: { id: id },
        },
    );
    return data.data.map((item): LocationModel => {
        return {
            id: item.wardId,
            name: item.wardName,
        };
    });
};

export const searchLocation = async (address: string, wardId: number): Promise<LocationType> => {
    const { data } = await instance.get<Response<LocationResponse>>(API_LOCATION_SEARCH, {
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
