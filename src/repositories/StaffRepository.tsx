import {
    API_MANAGER_ASSIGN_STAFF,
    API_MANAGER_CENTER,
    API_MANAGER_CENTER_CUSTOMER,
    API_MANAGER_CENTER_ORDER,
    API_MANAGER_CENTER_ORDER_DETAILS,
    API_MANAGER_CENTER_SERVICE,
    API_MANAGER_VERIFY_STAFF,
    API_STAFF_CANCEL_ORDER,
    API_STAFF_PROCEED_ORDER,
    API_STAFF_PROCEED_ORDERED_SERVICE,
} from '../common/Constant';
import { ServiceSearchParamsData } from '../containers/ManagerContainer/CenterServicesContainer/ServiceListingContainer';
import { ListResponse, PaginationModel } from '../models/CommonModel';
import { PaginationResponse, Response } from '../models/CommonModel';
import { CenterDeliveryPriceModel } from '../models/DeliveryPrice/DeliveryPriceModel';
import { ManagerCenterModel } from '../models/Manager/ManagerCenterModel';
import { ManagerCenterResponse } from '../models/Manager/ManagerCenterResponse';
import { ManagerServiceItem } from '../models/Manager/ManagerServiceItem';
import { ManagerServiceResponse } from '../models/Manager/ManagerServiceResponse';
import { CenterCustomerModel } from '../models/Staff/CenterCustomerModel';
import { CenterCustomerResponse } from '../models/Staff/CenterCustomerResponse';
import { CenterOrderDeliveryModel } from '../models/Staff/CenterOrderDeliveryModel';
import { CenterOrderDetailsModel } from '../models/Staff/CenterOrderDetailsModel';
import { CenterOrderDetailsReponse } from '../models/Staff/CenterOrderDetailsResponse';
import { CenterOrderModel } from '../models/Staff/CenterOrderModel';
import { CenterOrderResponse } from '../models/Staff/CenterOrderResponse';
import { CenterOrderTrackingModel } from '../models/Staff/CenterOrderTrackingModel';
import { CenterOrderedServiceModel } from '../models/Staff/CenterOrderedServiceModel';
import instance from '../services/axios/AxiosInstance';
import { OperatingDay } from '../types/OperatingDay';

export const getManagerCenter = async (): Promise<ManagerCenterModel> => {
    const { data } = await instance.get<Response<ManagerCenterResponse>>(API_MANAGER_CENTER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return {
        id: data.data.id,
        additionServices: [],
        alias: data.data.alias,
        centerAddress: data.data.centerAddress,
        centerDeliveryPrices: data.data.centerDeliveryPrices.map((deliPrice): CenterDeliveryPriceModel => {
            return {
                maxDistance: deliPrice.maxDistance,
                maxWeight: deliPrice.maxWeight,
                price: deliPrice.price,
            };
        }),
        centerFeedbacks: data.data.centerFeedbacks,
        centerGalleries: data.data.centerGalleries,
        centerLocation: data.data.centerLocation,
        centerOperatingHours: data.data.centerOperatingHours.map((day): OperatingDay => {
            return {
                day: day.day,
                start: day.openTime,
                end: day.closeTime,
            };
        }),
        centerResourses: data.data.centerResourses,
        description: data.data.description,
        hasDelivery: data.data.hasDelivery,
        isAvailable: data.data.isAvailable,
        locationId: data.data.locationId,
        monthOff: data.data.monthOff,
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        rating: data.data.rating,
        status: data.data.status,
        taxCode: data.data.taxCode,
        taxRegistrationImage: data.data.taxRegistrationImage,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
    };
};

export const getManagerCenterOrders = async ({
    page,
    pageSize,
    searchString,
    fromDate,
    toDate,
    status,
}: {
    page?: number;
    pageSize?: number;
    searchString?: string;
    fromDate?: string;
    toDate?: string;
    status?: string;
}): Promise<PaginationModel<CenterOrderModel>> => {
    const { data } = await instance.get<PaginationResponse<CenterOrderResponse>>(API_MANAGER_CENTER_ORDER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            page: page,
            PageSize: pageSize,
            searchString: searchString,
            fromDate: fromDate,
            toDate: toDate,
            status: status,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return {
        itemsPerPage: data.data.itemsPerPage,
        pageNumber: data.data.pageNumber,
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        items: data.data.items.map((item): CenterOrderModel => {
            return {
                id: item.orderId,
                customerName: item.customerName,
                discount: item.discount,
                orderedDate: item.orderDate,
                status: item.status,
                totalPayment: item.totalOrderPayment,
                totalValue: item.totalOrderValue,
                orderedServices: item.orderedServices.map((ordered): CenterOrderedServiceModel => {
                    return {
                        name: ordered.serviceName,
                        category: ordered.serviceCategory,
                        measurement: ordered.measurement,
                        customerNote: ordered.customerNote,
                        id: ordered.orderDetailId,
                        image: ordered.image,
                        orderDetailTrackings: ordered.orderDetailTrackings,
                        staffNote: ordered.staffNote,
                        status: ordered.status,
                        price: ordered.price,
                        unitPrice: ordered.unitPrice,
                        unit: ordered.unit,
                    };
                }),
            };
        }),
    };
};

export const getManagerCenterOrderDetails = async (id: string): Promise<CenterOrderDetailsModel> => {
    const { data } = await instance.get<Response<CenterOrderDetailsReponse>>(
        API_MANAGER_CENTER_ORDER_DETAILS.replace('${id}', id),
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    if (data === null) {
        throw new Error();
    }
    return {
        id: data.data.id,
        customerName: data.data.customerName,
        customerEmail: data.data.customerEmail,
        customerMessage: data.data.customerMessage,
        customerMobile: data.data.customerMobile,
        customerOrdered: data.data.customerOrdered,
        deliveryPrice: data.data.deliveryPrice,
        deliveryType: data.data.deliveryType,
        locationId: data.data.locationId,
        preferredDropoffTime: data.data.preferredDropoffTime,
        preferredDeliverTime: data.data.preferredDeliverTime,
        totalOrderValue: data.data.totalOrderValue,
        status: data.data.status,
        orderDeliveries: data.data.orderDeliveries.map((delivery): CenterOrderDeliveryModel => {
            return {
                shipperName: delivery.shipperName,
                shipperPhone: delivery.shipperPhone,
                date: delivery.deliveryDate,
                estimated: delivery.estimatedTime,
                locationId: delivery.locationId,
                status: delivery.status,
                type: delivery.deliveryType,
            };
        }),
        orderPayment: {
            total: data.data.orderPayment.paymentTotal,
            platformFee: data.data.orderPayment.platformFee,
            promoCode: data.data.orderPayment.promoCode,
            discount: data.data.orderPayment.discount,
            status: data.data.orderPayment.status,
            createdDate: data.data.orderPayment.createdDate,
            dateIssue: data.data.orderPayment.dateIssue,
            method: data.data.orderPayment.paymentMethod,
            updatedDate: data.data.orderPayment.updatedDate,
        },
        orderTrackings: data.data.orderTrackings.map((tracking): CenterOrderTrackingModel => {
            return {
                status: tracking.status,
                createdDate: tracking.createdDate,
                updatedDate: tracking.updatedDate,
            };
        }),
        orderedDetails: data.data.orderedDetails.map((ordered): CenterOrderedServiceModel => {
            return {
                name: ordered.serviceName,
                category: ordered.serviceCategory,
                measurement: ordered.measurement,
                customerNote: ordered.customerNote,
                id: ordered.orderDetailId,
                image: ordered.image,
                orderDetailTrackings: ordered.orderDetailTrackings,
                staffNote: ordered.staffNote,
                status: ordered.status,
                price: ordered.price,
                unitPrice: ordered.unitPrice,
                unit: ordered.unit,
            };
        }),
    };
};

export const getManagerServices = async (
    queryData: ServiceSearchParamsData,
): Promise<PaginationModel<ManagerServiceItem>> => {
    const { data } = await instance.get<PaginationResponse<ManagerServiceResponse>>(API_MANAGER_CENTER_SERVICE, {
        params: {
            page: queryData.page,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return {
        itemsPerPage: data.data.itemsPerPage,
        pageNumber: data.data.pageNumber,
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        items: data.data.items.map((item): ManagerServiceItem => {
            return {
                id: item.serviceId,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                homeFlag: item.homeFlag,
                hotFlag: item.hotFlag,
                isAvailable: item.isAvailable,
                minPrice: item.minPrice,
                name: item.serviceName,
                numOfRating: item.numOfRating,
                price: item.price,
                prices: item.prices.map((price) => {
                    return {
                        maxValue: price.maxValue,
                        price: price.price,
                    };
                }),
                priceType: item.priceType,
                rating: item.rating,
                status: item.status,
            };
        }),
    };
};

export const getCenterCustomer = async (): Promise<CenterCustomerModel[]> => {
    const { data } = await instance.get<ListResponse<CenterCustomerResponse>>(API_MANAGER_CENTER_CUSTOMER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.map((item): CenterCustomerModel => {
        return {
            id: item.id,
            address: item.addressString,
            email: item.email,
            fullname: item.fullname,
            phone: item.phone,
        };
    });
};

export const proceedOrder = async (orderId: string) => {
    const response = await instance.put<Response<number>>(API_STAFF_PROCEED_ORDER.replace('${orderId}', orderId), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const proceedOrderDetails = async (orderId: string, orderDetailId: number) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_PROCEED_ORDERED_SERVICE.replace('${orderId}', orderId).replace(
            '${orderDetailId}',
            orderDetailId.toString(),
        ),
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const cancelOrder = async (orderId: string) => {
    const response = await instance.put<Response<number>>(API_STAFF_CANCEL_ORDER.replace('${orderId}', orderId), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const assignStaff = async (email: string, phone: string) => {
    const response = await instance.get<Response<number>>(API_MANAGER_ASSIGN_STAFF, {
        params: {
            email: email,
            phone: phone,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const verifyStaff = async (code: string) => {
    const response = await instance.put<Response<number>>(API_MANAGER_VERIFY_STAFF, code, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};
