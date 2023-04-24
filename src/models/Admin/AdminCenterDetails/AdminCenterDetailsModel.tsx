import { AdminCenterDetailedModel } from './AdminCenterDetailedModel';
import { AdminCenterFeedbackModel } from './AdminCenterFeedbackModel';
import { AdminCenterServiceModel } from './AdminCenterServiceModel';
import { AdminCenterStaffModel } from './AdminCenterStaffModel';

export type AdminCenterDetailsModel = {
    center: AdminCenterDetailedModel;
    staffs: AdminCenterStaffModel[];
    services: AdminCenterServiceModel[];
    feedbacks: AdminCenterFeedbackModel[];
};
