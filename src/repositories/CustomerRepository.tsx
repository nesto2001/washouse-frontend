import { API_ACCOUNT_DETAILS, API_CUSTOMER_ORDER } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { PaginationModel, PaginationResponse } from '../models/CommonModel';
import { CustomerOrderModel } from '../models/Customer/CustomerOrderModel';
import { CustomerOrderResponse } from '../models/Customer/CustomerOrderResponse';
import { CenterOrderedServiceModel } from '../models/Staff/CenterOrderedServiceModel';
import instance from '../services/axios/AxiosInstance';

export const getCustomerOrders = async ({
    page,
    pageSize,
    searchString,
    fromDate,
    toDate,
    orderType,
    status,
}: {
    page?: number;
    pageSize?: number;
    orderType: string | null;
    searchString?: string;
    fromDate?: string;
    toDate?: string;
    status?: string;
}): Promise<PaginationModel<CustomerOrderModel>> => {
    const { data } = await instance.get<PaginationResponse<CustomerOrderResponse>>(API_CUSTOMER_ORDER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            page: page,
            pageSize: pageSize,
            searchString: searchString,
            orderType: orderType,
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
        items: data.data.items.map((item): CustomerOrderModel => {
            return {
                id: item.orderId,
                centerId: item.centerId,
                centerName: item.centerName,
                customerName: item.customerName,
                discount: item.discount,
                orderedDate: item.orderDate,
                status: item.status,
                totalPayment: item.totalOrderPayment,
                totalValue: item.totalOrderValue,
                isFeedback: item.isFeedback,
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
