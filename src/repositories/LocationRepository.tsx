import { List } from 'reselect/es/types';
import { Response } from '../models/CommonModel';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { LocationPlaceModel } from '../models/LocationPlaceModel';
import { WardReponse } from '../models/WardResponse';
import { LocationType } from '../types/LocationType';
import { LocationResponse } from '../models/Location/LocationResponse';
import {
    API_DISTRICT,
    API_DISTRICT_SEARCH,
    API_DISTRICT_WARDS,
    API_LOCATION_DETAILS,
    API_LOCATION_SEARCH,
    API_SEARCH_ADDRESS,
} from '../common/Constant';
import { LocationDetailsResponse } from '../models/Location/LocationDetailsResponse';
import { LocationDetailsModel } from '../models/Location/LocationDetailsModel';
import { AddressModel } from '../models/Location/AddressModel';
import { AddressResponse } from '../models/Location/AddressResponse';

export const getDistricts = async (): Promise<LocationPlaceModel[]> => {
    const { data } = await instance.get<Response<List<DistrictReponse>>>(API_DISTRICT, {});
    return data.data.map((item): LocationPlaceModel => {
        return {
            id: item.districtId,
            name: item.districtName,
        };
    });
};

export const getUserDistrict = async ({ lat, long }: { lat: number; long: number }): Promise<LocationPlaceModel> => {
    const { data } = await instance.get<Response<DistrictReponse>>(API_DISTRICT_SEARCH, {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return { id: data.data.districtId, name: data.data.districtName };
};

export const getWards = async (id: number): Promise<LocationPlaceModel[]> => {
    const { data } = await instance.get<Response<List<WardReponse>>>(
        API_DISTRICT_WARDS.replace('${id}', id.toString()),
        {
            params: { id: id },
        },
    );
    return data.data.map((item): LocationPlaceModel => {
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

export const getLocation = async (id: number): Promise<LocationDetailsModel> => {
    const { data } = await instance.get<Response<LocationDetailsResponse>>(
        API_LOCATION_DETAILS.replace('${locationId}', id.toString()),
        {},
    );
    return {
        id: data.data.id,
        address: data.data.addressString,
        ward: {
            id: data.data.ward.wardId,
            name: data.data.ward.wardName,
            district: {
                id: data.data.ward.district.districtId,
                name: data.data.ward.district.districtName,
            },
        },
        latitude: data.data.latitude,
        longitude: data.data.longitude,
    };
};

export const searchAddress = async ({ lat, long }: { lat: number; long: number }): Promise<AddressModel> => {
    const { data } = await instance.get<Response<AddressResponse>>(API_SEARCH_ADDRESS, {
        params: {
            latitude: lat,
            longitude: long,
        },
    });
    return {
        districtId: data.data.districtId,
        displayName: data.data.displayName,
        wardId: data.data.wardId,
        wardName: data.data.wardName,
        addressName: data.data.addressName,
        districtName: data.data.districtName,
    };
};
