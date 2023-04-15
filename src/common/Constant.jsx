const BASE_URL = process.env.REACT_APP_FIREBASE_API_URL;

//AUTH API
const API_LOGIN = '/api/accounts/login';
const API_LOGIN_STAFF = '/api/accounts/login-staff';
const API_ME = '/api/accounts/me';
const API_REGISTER_CUSTOMER = '/api/accounts/customers';
const API_REGISTER_PROVIDER = '/api/accounts/managers';
const API_REFRESH_TOKEN = '/api/accounts/token';

//ACCOUNT API
const API_ACCOUNT = '/api/accounts/';
const API_ACCOUNT_DETAILS = '/api/accounts/${id}';
const API_ACCOUNT_PROFILE = '/api/accounts/profile';
const API_ACCOUNT_PROFILE_PIC = '/api/accounts/profile-picture';
const API_ACCOUNT_PROFILE_ADDRESS = '/api/accounts/address';
const API_ACCOUNT_WALLET = '/api/accounts/my-wallet';

//UPLOAD API
const API_MEDIA = '/api/medias';

//CENTER API
const API_CENTER = '/api/centers';
const API_CENTER_DETAILS = '/api/centers/${id}';

//SERVICE CATEGORY API
const API_CATEGORY = '/api/service-categories';

//SERVICE API
const API_SERVICE_DETAILS = '/api/centers/${centerId}/services/${serviceId}';
const API_CENTER_SERVICES = '/api/centers/${centerId}/services';
const API_SERVICES = '/api/services';
const API_SERVICES_CENTER = '/api/centers/${centerId}/services';

//LOCATION API
const API_DISTRICT = '/api/districts';
const API_DISTRICT_SEARCH = '/api/districts/search';
const API_DISTRICT_WARDS = '/api/districts/${id}/wards';
const API_LOCATION_SEARCH = '/api/locations/search';
const API_LOCATION_DETAILS = 'api/locations/${locationId}';

//ADMIN API
const API_ADMIN_CENTER = '/api/admin/centers';
const API_ADMIN_POST = '/api/admin/posts';

//CENTER REQUEST API
const API_REQUEST = '/api/requests/centers';
const API_REQUEST_DETAILS = '/api/requests/centers/${id}';
const API_REQUEST_APPROVE = '/api/requests/centers/${id}/approve';
const API_REQUEST_REJECT = '/api/requests/centers/${id}/reject';

//ORDER API
const API_ORDER_EST = '/api/orders/estimated-time';
const API_ORDER_DELIVERY = '/api/orders/delivery-price';
const API_ORDER_CREATE = '/api/orders';
const API_ORDER_SEARCH = '/api/orders/search';

//MANAGER API
const API_MANAGER_CENTER = '/api/manager/my-center';
const API_MANAGER_CENTER_ORDER = '/api/manager/my-center/orders';
const API_MANAGER_CENTER_ORDER_DETAILS = '/api/manager/my-center/orders/${id}';
const API_MANAGER_CENTER_SERVICE = '/api/manager/services';
const API_MANAGER_CENTER_CUSTOMER = '/api/manager/my-center/customers';
const API_MANAGER_ASSIGN_STAFF = '/api/staffs/assign';
const API_MANAGER_VERIFY_STAFF = '/api/staffs/verify';

const API_STAFF_PROCEED_ORDER = '/api/tracking/orders/${orderId}/tracking';
const API_STAFF_PROCEED_ORDERED_SERVICE = '/api/tracking/orders/${orderId}/order-details/${orderDetailId}/tracking';
const API_STAFF_CANCEL_ORDER = '/api/tracking/orders/${orderId}/cancelled';

//PROMOTION API
const API_PROMOTION = '/api/manager/promotions';
const API_PROMOTION_CODE = '/api/promotions/code/${code}';
const API_PROMOTION_CENTER = '/api/manager/promotions';

//CUSTOMER API
const API_CUSTOMER = '/api/customers';
const API_CUSTOMER_ORDER = '/api/orders';

//NOTIFICATION API
const API_NOTIFICATION = '/api/notifications/me-noti';
const API_NOTIFICATION_READ = '/api/notifications/read';

//REGEX
const RE_DIGIT = new RegExp(/^\d+$/);

export {
    API_ADMIN_POST,
    API_ACCOUNT_WALLET,
    API_MANAGER_VERIFY_STAFF,
    API_MANAGER_ASSIGN_STAFF,
    RE_DIGIT,
    API_ACCOUNT_PROFILE_ADDRESS,
    API_ACCOUNT_PROFILE_PIC,
    API_ACCOUNT_PROFILE,
    API_STAFF_CANCEL_ORDER,
    API_CUSTOMER_ORDER,
    API_ADMIN_CENTER,
    API_ORDER_SEARCH,
    API_STAFF_PROCEED_ORDER,
    API_STAFF_PROCEED_ORDERED_SERVICE,
    API_MANAGER_CENTER_ORDER_DETAILS,
    API_PROMOTION_CODE,
    API_ORDER_DELIVERY,
    API_MANAGER_CENTER_CUSTOMER,
    API_MANAGER_CENTER_SERVICE,
    API_MANAGER_CENTER_ORDER,
    API_LOCATION_DETAILS,
    API_MANAGER_CENTER,
    API_REGISTER_PROVIDER,
    API_LOGIN_STAFF,
    API_ORDER_CREATE,
    API_ORDER_EST,
    API_REQUEST_REJECT,
    API_REQUEST_APPROVE,
    API_REQUEST_DETAILS,
    API_SERVICES_CENTER,
    API_REQUEST,
    API_LOCATION_SEARCH,
    API_DISTRICT,
    API_DISTRICT_SEARCH,
    API_DISTRICT_WARDS,
    API_CENTER_DETAILS,
    API_REGISTER_CUSTOMER,
    API_SERVICE_DETAILS,
    BASE_URL,
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
};
