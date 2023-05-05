import { AdminCenterDetailedReponse } from './AdminCenterDetailedResponse';
import { AdminCenterFeedbackResponse } from './AdminCenterFeedbackResponse';
import { AdminCenterServiceResponse } from './AdminCenterServiceResponse';
import { AdminCenterStaffResponse } from './AdminCenterStaffResponse';

export type AdminCenterRequestDetailsResponse = {
    alias?: string | null;
    centerAddress: string;
    centerPhone: string;
    description: string;
    hasDelivery: true;
    hasOnlinePayment: true;
    id: number;
    isAvailable: boolean;
    lastDeactivate: string;
    locationId: number;
    managerEmail: string;
    managerId: number;
    managerName: string;
    managerPhone: string;
    numOfRating: number;
    rating: number;
    ratings: number[];
    status: string;
    taxCode: string;
    taxRegistrationImage: string;
    thumbnail: string;
    title: string;
};
