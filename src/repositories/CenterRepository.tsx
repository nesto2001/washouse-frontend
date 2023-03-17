import { List } from 'reselect/es/types';
import { CenterModel } from '../models/Center/CenterModel';
import { CenterResponse } from '../models/Center/CenterResponse';
import instance from '../services/axios/AxiosInstance';
import { ServiceTag } from '../types/ServiceType/ServiceTag';

export const getAllCenter = async (): Promise<CenterModel[]> => {
    const { data } = await instance.get<List<CenterResponse>>('/api/center/getAll', {
        headers: {
            Accept: 'application/json',
        },
    });
    return data.map((item): CenterModel => {
        return {
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            description: item.description,
            service: item.centerServices.map((service): ServiceTag => {
                return {
                    id: service.serviceCategoryID,
                    title: service.serviceCategoryName,
                };
            }),
            additions: [],
            rating: item.rating,
            numOfRating: item.numOfRating,
            phone: item.phone,
            address: item.centerAddress,
            alias: item.alias,
            location: item.centerLocation,
            operatingHours: [
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            ],
        };
    });
};

export const getCenter = async (id : number): Promise<CenterModel> => {
    const { data } = await instance.get<CenterResponse>(`/api/center/${id}`, {
        headers: {
            Accept: 'application/json',
        },
    });
    return {
        id: data.id,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        service: data.centerServices.map((service): ServiceTag => {
            return {
                id: service.serviceCategoryID,
                title: service.serviceCategoryName,
            };
        }),
        additions: [],
        rating: data.rating,
        numOfRating: data.numOfRating,
        phone: data.phone,
        address: data.centerAddress,
        alias: data.alias,
        location: data.centerLocation,
        operatingHours: [
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
        ],
    };
};