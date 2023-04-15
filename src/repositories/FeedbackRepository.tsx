import { API_FEEDBACK_ORDER } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { FeedbackOrderRequest } from '../models/Feedback/FeedbackOrderRequest';
import instance from '../services/axios/AxiosInstance';

export const feedbackOrder = async (request?: FeedbackOrderRequest) => {
    const response = await instance.post<Response<number>>(API_FEEDBACK_ORDER, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};
