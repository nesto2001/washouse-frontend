import { API_FEEDBACK_ORDER, API_FEEDBACK_SERVICE, API_FEEDBACK_SERVICE_ID } from '../common/Constant';
import { PaginationModel, PaginationResponse, Response } from '../models/CommonModel';
import { FeedbackModel } from '../models/Feedback/FeedbackModel';
import { FeedbackOrderRequest } from '../models/Feedback/FeedbackOrderRequest';
import { FeedbackResponse } from '../models/Feedback/FeedbackResponse';
import { FeedbackServiceRequest } from '../models/Feedback/FeedbackServiceRequest';
import instance from '../services/axios/AxiosInstance';
import dayjs from 'dayjs';

export const feedbackOrder = async (request?: FeedbackOrderRequest) => {
    const response = await instance.post<Response<number>>(API_FEEDBACK_ORDER, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const feedbackService = async (request?: FeedbackServiceRequest) => {
    const response = await instance.post<Response<number>>(API_FEEDBACK_SERVICE, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const getFeedbacks = async (serviceId: number): Promise<PaginationModel<FeedbackModel>> => {
    const { data } = await instance.get<PaginationResponse<FeedbackResponse>>(
        API_FEEDBACK_SERVICE_ID.replace('${serviceId}', serviceId.toString()),
    );
    return {
        itemsPerPage: data.data.itemsPerPage,
        pageNumber: data.data.pageNumber,
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        items: data.data.items.map((item): FeedbackModel => {
            return {
                id: item.orderId,
                centerId: item.centerId,
                centerName: item.centerName,
                content: item.content,
                orderId: item.orderId,
                rating: item.rating,
                replyMessage: item.replyMessage,
                serviceId: item.serviceId,
                serviceName: item.serviceName,
                createDate: dayjs(item.createdDate, 'DD-MM-YYYY HH:mm:ss'),
                replyDate: dayjs(item.replyDate, 'DD-MM-YYYY HH:mm:ss'),
                accountAvatar: item.accountAvatar,
                accountName: item.accountName,
            };
        }),
    };
};
