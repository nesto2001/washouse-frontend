import dayjs from 'dayjs';
import { API_ADMIN_CENTER, API_ADMIN_CENTER_DETAILS, API_ADMIN_CENTER_REQUEST } from '../common/Constant';
import { AdminCenterDetailsModel } from '../models/Admin/AdminCenterDetails/AdminCenterDetailsModel';
import { AdminCenterDetailsResponse } from '../models/Admin/AdminCenterDetails/AdminCenterDetailsResponse';
import { AdminCenterFeedbackModel } from '../models/Admin/AdminCenterDetails/AdminCenterFeedbackModel';
import { AdminCenterServiceModel } from '../models/Admin/AdminCenterDetails/AdminCenterServiceModel';
import { AdminCenterStaffModel } from '../models/Admin/AdminCenterDetails/AdminCenterStaffModel';
import { AdminCenterModel } from '../models/Admin/AdminCenterModel';
import { AdminCenterResponse } from '../models/Admin/AdminCenterResponse';
import { CenterDetailsModel } from '../models/Center/CenterDetailsModel';
import { CenterDetailsResponse } from '../models/Center/CenterDetailsResponse';
import { PaginationResponse, Response } from '../models/CommonModel';
import { ServiceCategoryModel } from '../models/Service/ServiceCategoryModel';
import { ServiceModel } from '../models/Service/ServiceModel';
import instance from '../services/axios/AxiosInstance';
import { OperatingDay } from '../types/OperatingDay';

export const getCenterList = async ({
    page,
    pageSize,
    status,
    searchString,
}: {
    page?: number;
    pageSize?: number;
    status?: string;
    searchString?: string | null;
}): Promise<AdminCenterModel[]> => {
    const { data } = await instance.get<PaginationResponse<AdminCenterResponse>>(API_ADMIN_CENTER, {
        params: {
            Page: page,
            PageSize: pageSize,
            Status: status,
            SearchString: searchString,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.items.map((item): AdminCenterModel => {
        return {
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            alias: item.alias,
            rating: item.rating,
            numOfRating: item.numOfRating,
            phone: item.phone,
            address: item.centerAddress,
            status: item.status,
            taxCode: item.taxCode,
            managerId: item.managerId,
            managerName: item.managerName,
        };
    });
};

export const getCenterRequestList = async ({
    page,
    pageSize,
    searchString,
}: {
    page?: number;
    pageSize?: number;
    searchString?: string | null;
}): Promise<AdminCenterModel[]> => {
    const { data } = await instance.get<PaginationResponse<AdminCenterResponse>>(API_ADMIN_CENTER_REQUEST, {
        params: {
            Page: page,
            PageSize: pageSize,
            SearchString: searchString,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.items.map((item): AdminCenterModel => {
        return {
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            alias: item.alias,
            rating: item.rating,
            numOfRating: item.numOfRating,
            phone: item.phone,
            address: item.centerAddress,
            status: item.status,
            taxCode: item.taxCode,
            managerId: item.managerId,
            managerName: item.managerName,
        };
    });
};

export const getCenterDetails = async (id: number): Promise<AdminCenterDetailsModel> => {
    const { data } = await instance.get<Response<AdminCenterDetailsResponse>>(
        API_ADMIN_CENTER_DETAILS.replace('${centerId}', id.toString()),
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return {
        center: {
            id: data.data.center.id,
            title: data.data.center.title,
            alias: data.data.center.alias,
            thumbnail: data.data.center.thumbnail,
            description: data.data.center.description,
            centerAddress: data.data.center.centerAddress,
            centerPhone: data.data.center.centerPhone,
            locationId: data.data.center.locationId,
            hasDelivery: data.data.center.hasDelivery,
            hasOnlinePayment: data.data.center.hasOnlinePayment,
            isAvailable: data.data.center.isAvailable,
            lastDeactivate: data.data.center.lastDeactivate,
            numOfRating: data.data.center.numOfRating,
            rating: data.data.center.rating,
            status: data.data.center.status,
            taxCode: data.data.center.taxCode,
            taxRegistrationImage: data.data.center.taxRegistrationImage,
            managerId: data.data.center.managerId,
            managerName: data.data.center.managerName,
            managerEmail: data.data.center.managerEmail,
            managerPhone: data.data.center.managerPhone,
        },
        feedbacks: data.data.feedbacks.map((item): AdminCenterFeedbackModel => {
            return {
                id: item.id,
                content: item.content,
                rating: item.rating,
                createdBy: item.createdBy,
                createdDate: dayjs(item.createdDate, 'DD-MM-YYYY HH:mm:ss'),
                replyBy: item.replyBy,
                orderId: item.orderId,
                services: item.services,
                replyMessage: item.replyMessage,
                replyDate: dayjs(item.replyDate, 'DD-MM-YYYY HH:mm:ss'),
            };
        }),
        services: data.data.services.map((item): AdminCenterServiceModel => {
            return {
                serviceId: item.serviceId,
                serviceName: item.serviceName,
                alias: item.alias,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                isAvailable: item.isAvailable,
                minPrice: item.minPrice,
                numOfRating: item.numOfRating,
                price: item.price,
                prices: item.prices,
                priceType: item.priceType,
                rate: item.rate,
                rating: item.rating,
                status: item.status,
                unit: item.unit,
            };
        }),
        staffs: data.data.staffs.map((item): AdminCenterStaffModel => {
            return {
                accountId: item.accountId,
                email: item.email,
                fullName: item.fullName,
                gender: item.gender,
                id: item.id,
                isManager: item.isManager,
                idBackImg: item.idBackImg,
                idFrontImg: item.idFrontImg,
                idNumber: item.idNumber,
                phone: item.phone,
                status: item.status,
            };
        }),
    };
};
