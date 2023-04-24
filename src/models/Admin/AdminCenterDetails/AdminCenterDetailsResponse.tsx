import { AdminCenterDetailedReponse } from './AdminCenterDetailedResponse';
import { AdminCenterFeedbackResponse } from './AdminCenterFeedbackResponse';
import { AdminCenterServiceResponse } from './AdminCenterServiceResponse';
import { AdminCenterStaffResponse } from './AdminCenterStaffResponse';

export type AdminCenterDetailsResponse = {
    center: AdminCenterDetailedReponse;
    staffs: AdminCenterStaffResponse[];
    services: AdminCenterServiceResponse[];
    feedbacks: AdminCenterFeedbackResponse[];
};
