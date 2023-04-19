import { API_CUSTOMER_ORDER } from '../common/Constant';
import { PaginationModel, PaginationResponse } from '../models/CommonModel';
import { CustomerOrderModel } from '../models/Customer/CustomerOrderModel';
import { CustomerOrderResponse } from '../models/Customer/CustomerOrderResponse';
import { CustomerOrderedServiceModel } from '../models/Customer/CustomerOrderedServiceModel';
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
                orderedServices: item.orderedServices.map((ordered): CustomerOrderedServiceModel => {
                    return {
                        id: ordered.serviceId,
                        name: ordered.serviceName,
                        category: ordered.serviceCategory,
                        measurement: ordered.measurement,
                        image: ordered.image,
                        price: ordered.price,
                        unit: ordered.unit,
                    };
                }),
            };
        }),
    };
};
