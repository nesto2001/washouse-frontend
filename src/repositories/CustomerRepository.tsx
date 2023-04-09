import { API_ACCOUNT_DETAILS, API_CUSTOMER, API_CUSTOMER_ORDER } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { PaginationModel, PaginationResponse } from '../models/CommonModel';
import { UpdateCustomerRequest } from '../models/Customer/UpdateCustomerRequest';
import { CenterOrderModel } from '../models/Staff/CenterOrderModel';
import { CenterOrderResponse } from '../models/Staff/CenterOrderResponse';
import { CenterOrderedServiceModel } from '../models/Staff/CenterOrderedServiceModel';
import instance from '../services/axios/AxiosInstance';

export const getCustomerProfile = async (id: number): Promise<AccountModel> => {
    const { data } = await instance.get<AccountResponse>(API_ACCOUNT_DETAILS.replace('${id}', id.toString()), {});
    return {
        accountId: data.id,
        avatar: data.profilePic,
        email: data.email,
        fullName: data.fullName,
        dob: data.dob,
        phone: data.phone,
        locationId: data.locationId,
    };
};

export const updateCustomerProfile = async (id: number, request: UpdateCustomerRequest) => {
    const { status } = await instance.put(API_CUSTOMER, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            customerId: id,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};

export const getCustomerOrders = async ({
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
    const { data } = await instance.get<PaginationResponse<CenterOrderResponse>>(API_CUSTOMER_ORDER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            page: page,
            pageSize: pageSize,
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
                        unit: ordered.unit,
                    };
                }),
            };
        }),
    };
};
