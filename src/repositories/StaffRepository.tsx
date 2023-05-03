import {
    API_MANAGER_ASSIGN_STAFF,
    API_MANAGER_CENTER,
    API_MANAGER_CENTER_CUSTOMER,
    API_MANAGER_CENTER_ORDER,
    API_MANAGER_CENTER_ORDER_DETAILS,
    API_MANAGER_CENTER_SERVICE,
    API_MANAGER_CENTER_SERVICE_LIST,
    API_MANAGER_VERIFY_STAFF,
    API_STAFF,
    API_STAFF_ACTIVATE,
    API_STAFF_ASSIGN_DELIVERY,
    API_STAFF_CANCEL_ORDER,
    API_STAFF_COMPLETE_ORDER,
    API_STAFF_DEACTIVATE,
    API_STAFF_FEEDBACKS,
    API_STAFF_PAID_ORDER,
    API_STAFF_PROCEED_ORDER,
    API_STAFF_PROCEED_ORDERED_SERVICE,
    API_STAFF_STATS,
    API_STAFF_UPDATE_ORDERED_SERVICE,
} from '../common/Constant';
import { ServiceSearchParamsData } from '../containers/ManagerContainer/CenterServicesContainer/ServiceListingContainer';
import { ListResponse, PaginationModel, PaginationResponse, Response } from '../models/CommonModel';
import { CenterStatisticsModel } from '../models/Dashboard/CenterStatisticsModel';
import { CenterStatisticsResponse } from '../models/Dashboard/CenterStatisticsResponse';
import { DailyStatisticsModel } from '../models/Dashboard/DailyStatisticsModel';
import { CenterDeliveryPriceModel } from '../models/DeliveryPrice/DeliveryPriceModel';
import { ManagerCenterModel } from '../models/Manager/ManagerCenterModel';
import { ManagerCenterResponse } from '../models/Manager/ManagerCenterResponse';
import { ManagerServiceItem } from '../models/Manager/ManagerServiceItem';
import { ManagerServiceResponse } from '../models/Manager/ManagerServiceResponse';
import { CenterCustomerModel } from '../models/Staff/CenterCustomerModel';
import { CenterCustomerResponse } from '../models/Staff/CenterCustomerResponse';
import { CenterOrderDeliveryBriefModel } from '../models/Staff/CenterOrderDeliveryBriefModel';
import { CenterOrderDeliveryModel } from '../models/Staff/CenterOrderDeliveryModel';
import { CenterOrderDetailsModel } from '../models/Staff/CenterOrderDetailsModel';
import { CenterOrderDetailsReponse } from '../models/Staff/CenterOrderDetailsResponse';
import { CenterOrderModel } from '../models/Staff/CenterOrderModel';
import { CenterOrderResponse } from '../models/Staff/CenterOrderResponse';
import { CenterOrderTrackingModel } from '../models/Staff/CenterOrderTrackingModel';
import { CenterOrderedServiceModel } from '../models/Staff/CenterOrderedServiceModel';
import { CenterStaffModel } from '../models/Staff/CenterStaffModel';
import { CenterStaffResponse } from '../models/Staff/CenterStaffResponse';
import { CenterFeedbackModel } from '../models/Staff/StaffFeedback/CenterFeedbackModel';
import { CenterFeedbackResponse } from '../models/Staff/StaffFeedback/CenterFeedbackResponse';
import { AssignDeliveryRequest } from '../models/Staff/StaffOrder/AssignDeliveryRequest';
import { UpdateOrderDetailsRequest } from '../models/Staff/StaffOrder/UpdateOrderDetailsRequest';
import { CenterServiceModel } from '../models/Staff/StaffServices/CenterServiceModel';
import { CenterServicesListModel } from '../models/Staff/StaffServices/CenterServicesListModel';
import { CenterServicesListResponse } from '../models/Staff/StaffServices/CenterServicesListResponse';
import instance from '../services/axios/AxiosInstance';
import { OperatingDay } from '../types/OperatingDay';
import dayjs from 'dayjs';

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
        hasOnlinePayment: data.data.hasOnlinePayment,
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
    deliveryType,
    deliveryStatus,
}: {
    page?: number;
    pageSize?: number;
    searchString?: string;
    fromDate?: string;
    toDate?: string;
    status?: string;
    deliveryType?: boolean;
    deliveryStatus?: string;
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
            deliveryType: deliveryType,
            deliveryStatus: deliveryStatus,
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
                centerId: item.centerId,
                centerName: item.centerName,
                deliveries: item.deliveries.map((delivery): CenterOrderDeliveryBriefModel => {
                    return {
                        deliveryType: delivery.deliveryType,
                        addressString: delivery.addressString,
                        deliveryStatus: delivery.deliveryStatus,
                        districtName: delivery.districtName,
                        wardName: delivery.wardName,
                    };
                }),
                deliveryType: item.deliveryType,
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
                addressString: delivery.addressString,
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
    const { data } = await instance.get<PaginationResponse<CenterCustomerResponse>>(API_MANAGER_CENTER_CUSTOMER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return data.data.items.map((item): CenterCustomerModel => {
        let genderText = '';
        switch (item.gender) {
            case 0:
                genderText = 'Nam';
                break;
            case 1:
                genderText = 'Nữ';
                break;
            case 2:
                genderText = 'Khác';
                break;
            default:
                genderText = '-';
        }
        return {
            id: item.id,
            address: item.addressString,
            email: item.email,
            fullname: item.fullname,
            phone: item.phone,
            dob: item.dateOfBirth ?? '',
            gender: genderText,
        };
    });
};

export const proceedOrder = async (orderId: string) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_PROCEED_ORDER.replace('${orderId}', orderId),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const completeOrder = async (orderId: string) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_COMPLETE_ORDER.replace('${orderId}', orderId),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const proceedOrderDelivery = async (orderId: string, type: string) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_ASSIGN_DELIVERY.replace('${orderId}', orderId).replace('${type}', type),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const confirmPaidOrder = async (orderId: string) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_PAID_ORDER.replace('${id}', orderId),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const proceedOrderDetails = async (orderId: string, orderDetailId: number) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_PROCEED_ORDERED_SERVICE.replace('${orderId}', orderId).replace(
            '${orderDetailId}',
            orderDetailId.toString(),
        ),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const updateOrderDetails = async (
    orderId: string,
    orderDetailId: number,
    request: UpdateOrderDetailsRequest,
) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_UPDATE_ORDERED_SERVICE.replace('${orderId}', orderId).replace(
            '${orderDetailId}',
            orderDetailId.toString(),
        ),
        request,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const cancelOrder = async (orderId: string, reason: string) => {
    const response = await instance.put<Response<number>>(
        API_STAFF_CANCEL_ORDER.replace('${orderId}', orderId),
        {
            reason: reason,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
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
    const response = await instance.put<Response<number>>(
        API_MANAGER_VERIFY_STAFF,
        {},
        {
            params: {
                code: code,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const getAllStaff = async (): Promise<PaginationModel<CenterStaffModel>> => {
    const { data } = await instance.get<PaginationResponse<CenterStaffResponse>>(API_STAFF, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    console.log(data);
    return {
        itemsPerPage: data.data.itemsPerPage,
        pageNumber: data.data.pageNumber,
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        items: data.data.items.map((item): CenterStaffModel => {
            return {
                id: item.id,
                dob: item.dob ? dayjs(item.dob, 'DD-MM-YYYY') : null,
                email: item.email,
                fullname: item.fullName,
                idNumber: item.idNumber,
                isManager: item.isManager,
                phone: item.phone,
                status: item.status,
                idBackImg: item.idBackImg,
                idFrontImg: item.idFrontImg,
            };
        }),
    };
};

export const assignOrderDelivery = async (orderId: string, type: string, request: AssignDeliveryRequest) => {
    const response = await instance.put<Response<number>>(
        `/api/manager/my-center/orders/${orderId}/deliveries/${type}/assign`,
        request,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const activateStaff = async (id: number) => {
    const response = await instance.put(
        API_STAFF_ACTIVATE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const deactivateStaff = async (id: number) => {
    const response = await instance.put(
        API_STAFF_DEACTIVATE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const deactivateMyCenter = async (id: number) => {
    const response = await instance.put(
        API_STAFF_DEACTIVATE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return response;
};

export const getCenterFeedbacks = async (): Promise<CenterFeedbackModel[]> => {
    const { data } = await instance.get<PaginationResponse<CenterFeedbackResponse>>(API_STAFF_FEEDBACKS, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.items.map((item): CenterFeedbackModel => {
        return {
            id: item.id,
            rating: item.rating,
            content: item.content,
            orderId: item.orderId,
            centerId: item.centerId,
            centerName: item.centerName,
            serviceId: item.serviceId,
            serviceName: item.serviceName,
            createdBy: item.createdBy,
            createdDate: item.createdDate,
            replyBy: item.replyBy,
            replyMessage: item.replyMessage,
            replyDate: item.replyDate,
        };
    });
};

export const getCenterStatistics = async (): Promise<CenterStatisticsModel> => {
    const { data } = await instance.get<Response<CenterStatisticsResponse>>(API_STAFF_STATS, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return {
        orderOverview: data.data.orderOverview,
        dailystatistics: data.data.dailystatistics.map((stat): DailyStatisticsModel => {
            return {
                day: stat.day,
                cancelled: stat.cancelledOrder,
                success: stat.successfulOrder,
            };
        }),
    };
};

export const getCenterServices = async (): Promise<CenterServicesListModel[]> => {
    const { data } = await instance.get<ListResponse<CenterServicesListResponse>>(API_MANAGER_CENTER_SERVICE_LIST, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return data.data.map((item) => {
        return {
            serviceCategoryID: item.serviceCategoryID,
            serviceCategoryName: item.serviceCategoryName,
            services: item.services.map((service): CenterServiceModel => {
                return {
                    serviceId: service.serviceId,
                    categoryId: service.categoryId,
                    serviceName: service.serviceName,
                    minPrice: service.minPrice,
                    price: service.price,
                    prices: service.prices,
                    priceType: service.priceType,
                    rate: service.rate,
                    timeEstimate: service.timeEstimate,
                    unit: service.unit,
                };
            }),
        };
    });
};
