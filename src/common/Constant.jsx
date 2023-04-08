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

//UPLOAD API
const API_MEDIA = '/api/medias';

//CENTER API
const API_CENTER = '/api/centers';
const API_CENTER_DETAILS = '/api/centers/${id}';

//SERVICE CATEGORY API
const API_CATEGORY = '/api/service-categories';

//SERVICE API
const API_SERVICE_DETAILS = '/api/centers/${centerId}/services/${serviceId}';
const API_SERVICES = '/api/centers/${centerId}/services';

//LOCATION API
const API_DISTRICT = '/api/districts';
const API_DISTRICT_SEARCH = '/api/districts/search';
const API_DISTRICT_WARDS = '/api/districts/${id}/wards';
const API_LOCATION_SEARCH = '/api/locations/search';
const API_LOCATION_DETAILS = 'api/locations/${locationId}';

//CENTER REQUEST API
const API_REQUEST = '/api/requests/centers';
const API_REQUEST_DETAILS = '/api/requests/centers/${id}';
const API_REQUEST_APPROVE = '/api/requests/centers/${id}/approve';
const API_REQUEST_REJECT = '/api/requests/centers/${id}/reject';

//ORDER API
const API_ORDER_EST = '/api/orders/estimated-time';
const API_ORDER_DELIVERY = '/api/orders/delivery-price';
const API_ORDER_CREATE = '/api/orders';

//MANAGER API
const API_MANAGER_CENTER = '/api/manager/my-center';
const API_MANAGER_CENTER_ORDER = '/api/manager/my-center/orders';
const API_MANAGER_CENTER_SERVICE = '/api/manager/services';
const API_MANAGER_CENTER_CUSTOMER = '/api/manager/my-center/customers';

//PROMOTION API
const API_PROMOTION = '/api/promotions';

//CUSTOMER API
const API_CUSTOMER = '/api/customers';

//NOTIFICATION API
const API_NOTIFICATION = '/api/notifications/me-noti';
const API_NOTIFICATION_READ = '/api/notifications/read';

export {
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
};
