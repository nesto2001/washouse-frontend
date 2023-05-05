const BASE_URL = process.env.REACT_APP_FIREBASE_API_URL;

//AUTH API
const API_LOGIN = '/api/accounts/login';
const API_OTP = '/api/verifys/send/otp';
const API_OTP_LOGIN = '/api/verifys/send/otp';
const API_OTP_VERIFY = '/api/verifys/sms/check';
const API_OTP_VERIFY_LOGIN = '/api/accounts/login/otp';
const API_LOGIN_GOOGLE = '/api/accounts/login/google';
const API_LOGIN_STAFF = '/api/accounts/login-staff';
const API_ME = '/api/accounts/me';
const API_REGISTER_CUSTOMER = '/api/accounts/customers';
const API_REGISTER_PROVIDER = '/api/accounts/managers';
const API_REFRESH_TOKEN = '/api/accounts/token';
const API_CHANGE_PASSWORD = '/api/accounts/me/change-password';

//ACCOUNT API
const API_ACCOUNT = '/api/accounts/';
const API_ACCOUNT_DETAILS = '/api/customers/account/${id}';
const API_ACCOUNT_PROFILE = '/api/accounts/profile'; //PUT
const API_ACCOUNT_PROFILE_PIC = '/api/accounts/profile-picture'; //PUT
const API_ACCOUNT_PROFILE_ADDRESS = '/api/accounts/address';
const API_ACCOUNT_WALLET = '/api/accounts/my-wallet';
const API_ACCOUNT_DEACTIVATE = '/api/accounts/${id}/deactivate';
const API_ACCOUNT_ACTIVATE = '/api/accounts/${id}/activate';

//UPLOAD API
const API_MEDIA = '/api/medias';

//CENTER API
const API_CENTER = '/api/centers';
const API_CENTER_DETAILS = '/api/centers/${id}';

//SERVICE CATEGORY API
const API_CATEGORY = '/api/service-categories';
const API_PIN_CATEGORY = '/api/service-categories/${id}/pin';
const API_UNPIN_CATEGORY = '/api/service-categories/${id}/unpin';

//SERVICE API
const API_SERVICE_DETAILS = '/api/centers/${centerId}/services/${serviceId}';
const API_CENTER_SERVICES = '/api/centers/${centerId}/services';
const API_SERVICES = '/api/services';
const API_SERVICE_DETAILS_ID = '/api/services/${id}';
const API_SERVICES_CENTER = '/api/centers/${centerId}/services';

//LOCATION API
const API_DISTRICT = '/api/districts';
const API_DISTRICT_SEARCH = '/api/districts/search';
const API_DISTRICT_WARDS = '/api/districts/${id}/wards';
const API_LOCATION_SEARCH = '/api/locations/search';
const API_LOCATION_DETAILS = 'api/locations/${locationId}';
const API_SEARCH_ADDRESS = '/api/maps/location';

//ADMIN API
const API_ADMIN_CENTER = '/api/admin/centers';
const API_ADMIN_CENTER_DETAILS = '/api/admin/centers/${centerId}';
const API_ADMIN_CENTER_REQUEST = '/api/requests/centers/updating';
const API_ADMIN_POST = '/api/admin/posts';
const API_PUBLIC_POST = '/api/posts';
const API_ADMIN_POST_DETAIL = '/api/admin/posts/${id}';
const API_ADMIN_POST_DETAIL_PUBLIC = '/api/posts/${id}';
const API_ADMIN_STATISTICS = '/api/admin/statistics';

//CENTER REQUEST API
const API_REQUEST = '/api/requests/centers';
const API_REQUEST_DETAILS = '/api/requests/centers/${id}';
const API_REQUEST_APPROVE = '/api/requests/centers/pending/${id}/approve';
const API_REQUEST_REJECT = '/api/requests/centers/pending/${id}/reject';
const API_REQUEST_APPROVE_UPDATE = '/api/requests/centers/updating/${id}/approve';
const API_REQUEST_REJECT_UPDATE = '/api/requests/centers/updating/${id}/reject';

//ORDER API
const API_ORDER_EST = '/api/orders/estimated-time';
const API_ORDER_DELIVERY = '/api/orders/delivery-price';
const API_ORDER_CREATE = '/api/orders';
const API_ORDER_PAY = '/api/orders/${orderId}/payment';
const API_ORDER_SEARCH = '/api/orders/search';

//MANAGER API
const API_MANAGER_CENTER = '/api/manager/my-center';
const API_MANAGER_CENTER_OPERATINGS = '/api/manager/my-center/operating-hours';
const API_MANAGER_CENTER_DELIVERY = '/api/manager/my-center/delivery-prices';
const API_MANAGER_CENTER_DELIVERY_DELETE = '/api/manager/my-center/delivery-prices/delete';
const API_MANAGER_CENTER_CLOSE = '/api/manager/my-center/closed';
const API_MANAGER_CENTER_ORDER = '/api/manager/my-center/orders';
const API_MANAGER_CENTER_ORDER_DETAILS = '/api/manager/my-center/orders/${id}';
const API_MANAGER_CENTER_SERVICE = '/api/manager/services';
const API_MANAGER_CENTER_SERVICE_LIST = '/api/manager/my-center/services';
const API_MANAGER_CENTER_CUSTOMER = '/api/manager/my-center/customers';
const API_MANAGER_ASSIGN_STAFF = '/api/staffs/assign';
const API_MANAGER_VERIFY_STAFF = '/api/staffs/verify';
const API_MANAGER_WALLET = '/api/manager/my-center/wallet';
const API_MANAGER_STATISTICS = '/api/manager/my-center/manager-statistics';

const API_MANAGER_CENTER_DEACTIVATE = '/api/manager/my-center/deactivate';
const API_MANAGER_CENTER_ACTIVATE = '/api/manager/my-center/activate';

const API_STAFF_PROCEED_ORDER = '/api/tracking/orders/${orderId}/tracking';
const API_STAFF_COMPLETE_ORDER = '/api/tracking/orders/${orderId}/completed';
const API_STAFF_PAID_ORDER = '/api/manager/my-center/orders/${id}/paid';
const API_STAFF_PROCEED_ORDERED_SERVICE = '/api/tracking/orders/${orderId}/order-details/${orderDetailId}/tracking';
const API_STAFF_UPDATE_ORDERED_SERVICE = '/api/manager/my-center/orders/${orderId}/details/${orderDetailId}';
const API_STAFF_CANCEL_ORDER = '/api/tracking/orders/${orderId}/cancelled';
const API_STAFF_ASSIGN_DELIVERY = '/api/manager/my-center/orders/${orderId}/deliveries/${type}/change-status';
const API_STAFF_FEEDBACKS = '/api/manager/my-center/feedbacks';
const API_STAFF_STATS = '/api/manager/my-center/staff-statistics';
const API_STAFF_ORDER_CREATE = '/api/manager/my-center/orders'

//STAFF APT
const API_STAFF = '/api/staffs';
const API_STAFF_ACTIVATE = '/api/staffs/${id}/activate';
const API_STAFF_DEACTIVATE = '/api/staffs/${id}/deactivate';

//PROMOTION API
const API_PROMOTION = '/api/manager/promotions';
const API_PROMOTION_CODE = '/api/promotions/code/${code}';
const API_PROMOTION_CENTER = '/api/manager/promotions';
const API_PROMOTION_DEACTIVATE = '/api/manager/promotions/deactivate';
const API_PROMOTION_ACTIVATE = '/api/manager/promotions/activate';

//CUSTOMER API
const API_CUSTOMER = '/api/customers';
const API_CUSTOMER_ORDER = '/api/orders';

//NOTIFICATION API
const API_NOTIFICATION = '/api/notifications/me-noti';
const API_NOTIFICATION_READ = '/api/notifications/read';

const API_FEEDBACK_ORDER = '/api/feedbacks/orders';
const API_FEEDBACK_SERVICE = '/api/feedbacks/services';
const API_FEEDBACK_SERVICE_ID = '/api/feedbacks/services/${serviceId}';

//WALLET API
const API_WALLET_ACTIVATE = '/api/wallets/active';

//REGEX
const RE_DIGIT = new RegExp(/^\d+$/);

export {
    API_OTP_LOGIN,
    API_OTP_VERIFY_LOGIN,
    API_OTP,
    API_OTP_VERIFY,
    API_STAFF_ORDER_CREATE,
    API_MANAGER_CENTER_CLOSE,
    API_MANAGER_CENTER_DELIVERY_DELETE,
    API_MANAGER_CENTER_DELIVERY,
    API_MANAGER_CENTER_OPERATINGS,
    API_PIN_CATEGORY,
    API_UNPIN_CATEGORY,
    API_MANAGER_CENTER_DEACTIVATE,
    API_MANAGER_CENTER_ACTIVATE,
    API_WALLET_ACTIVATE,
    API_MANAGER_WALLET,
    API_STAFF_COMPLETE_ORDER,
    API_ORDER_PAY,
    API_MANAGER_CENTER_SERVICE_LIST,
    API_REQUEST_APPROVE_UPDATE,
    API_REQUEST_REJECT_UPDATE,
    API_STAFF_ASSIGN_DELIVERY,
    API_STAFF_PAID_ORDER,
    API_SEARCH_ADDRESS,
    API_STAFF_STATS,
    API_ADMIN_CENTER_DETAILS,
    API_STAFF_FEEDBACKS,
    API_STAFF_UPDATE_ORDERED_SERVICE,
    API_FEEDBACK_ORDER,
    API_FEEDBACK_SERVICE,
    API_PROMOTION_DEACTIVATE,
    API_ADMIN_POST,
    API_ACCOUNT_WALLET,
    API_MANAGER_VERIFY_STAFF,
    API_MANAGER_ASSIGN_STAFF,
    RE_DIGIT,
    API_ACCOUNT_PROFILE_ADDRESS,
    API_ACCOUNT_PROFILE_PIC,
    API_ACCOUNT_PROFILE,
    API_STAFF_CANCEL_ORDER,
    API_MANAGER_STATISTICS,
    API_CUSTOMER_ORDER,
    API_ADMIN_CENTER,
    API_ORDER_SEARCH,
    API_STAFF_PROCEED_ORDER,
    API_STAFF_PROCEED_ORDERED_SERVICE,
    API_MANAGER_CENTER_ORDER_DETAILS,
    API_PROMOTION_CODE,
    API_ORDER_DELIVERY,
    API_ADMIN_POST_DETAIL,
    API_MANAGER_CENTER_CUSTOMER,
    API_MANAGER_CENTER_SERVICE,
    API_CHANGE_PASSWORD,
    API_MANAGER_CENTER_ORDER,
    API_ACCOUNT_DEACTIVATE,
    API_ACCOUNT_ACTIVATE,
    API_FEEDBACK_SERVICE_ID,
    API_LOCATION_DETAILS,
    API_LOGIN_GOOGLE,
    API_MANAGER_CENTER,
    API_STAFF,
    API_ADMIN_CENTER_REQUEST,
    API_PUBLIC_POST,
    API_REGISTER_PROVIDER,
    API_LOGIN_STAFF,
    API_ORDER_CREATE,
    API_ORDER_EST,
    API_REQUEST_REJECT,
    API_REQUEST_APPROVE,
    API_SERVICE_DETAILS_ID,
    API_REQUEST_DETAILS,
    API_SERVICES_CENTER,
    API_REQUEST,
    API_LOCATION_SEARCH,
    API_DISTRICT,
    API_DISTRICT_SEARCH,
    API_ADMIN_POST_DETAIL_PUBLIC,
    API_DISTRICT_WARDS,
    API_CENTER_DETAILS,
    API_REGISTER_CUSTOMER,
    API_SERVICE_DETAILS,
    BASE_URL,
    API_PROMOTION_ACTIVATE,
    API_LOGIN,
    API_ME,
    API_ACCOUNT,
    API_MEDIA,
    API_CENTER,
    API_CATEGORY,
    API_ACCOUNT_DETAILS,
    API_REFRESH_TOKEN,
    API_PROMOTION,
    API_SERVICES,
    API_CUSTOMER,
    API_NOTIFICATION,
    API_NOTIFICATION_READ,
    API_CENTER_SERVICES,
    API_PROMOTION_CENTER,
    API_STAFF_ACTIVATE,
    API_STAFF_DEACTIVATE,
    API_ADMIN_STATISTICS,
};
