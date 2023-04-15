import {
    AdminDashboardLayout,
    AuthenticateLayout,
    BlankCenteredLayout,
    CenteredLayout,
    CustomerSidebarLayout,
    ManagerDashboardLayout,
    SidebarLayout,
    StaffAuthenticateLayout,
    StaffDashboardLayout,
    UnregisteredLayout,
} from '../Layouts';
import {
    AdminCenterPage,
    AdminDashboardPage,
    CartPage,
    CenterPage,
    CenterServicePage,
    CentersPage,
    CheckoutConfirmPage,
    CheckoutPage,
    CustomerAddressPage,
    CustomerOrdersPage,
    CustomerPasswordPage,
    CustomerProfilePage,
    HomePage,
    LoginPage,
    ManagerCenterPage,
    ManagerCenterRegistrationPage,
    ManagerCreateServicePage,
    ManagerDashboardPage,
    ManagerServicePage,
    OrderDetailsPage,
    RegisterPage,
    ResetPasswordPage,
    StaffCustomerPage,
    StaffLoginPage,
    StaffRegisterPage,
    AdminAccountPage,
    StaffOrdersPage,
    StaffCalendarPage,
    StaffDayTimelinePage,
    StaffOrderDetailsPage,
    ManagerCenterStaffPage,
    UserInformationPage,
    ProviderRoleChoosingPage,
    StaffDashboardPage,
    CustomerNotificationPage,
    StaffVerificationPage,
    ManagerCenterSettingsPage,
    CustomerWalletPage,
    AdminCenterDetailsPage,
    StaffDeliveryPage,
} from '../pages/';
import AdminCenterRequestPage from '../pages/AdminPage/AdminCenterRequest/AdminCenterRequestPage';
import AdminPostPage from '../pages/AdminPage/AdminPost/AdminPostPage';
import AdminServicePage from '../pages/AdminPage/AdminService/AdminServicePage';
import ManagerPromotionsPage from '../pages/StaffPage/ManagerPromotion/ManagerPromotionsPage';
import ManagerUpdateServicePage from '../pages/StaffPage/ManagerService/ManagerUpdateServicePage';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }?: any) => JSX.Element;
    redirectUrl?: string;
}

const publicRoutes: Array<RouteProps> = [
    { path: '/', component: HomePage },
    {
        path: '/trung-tam',
        layout: SidebarLayout,
        component: CentersPage,
    },
    {
        path: '/trung-tam/:name',
        layout: CenteredLayout,
        component: CenterPage,
    },
    {
        path: '/centers/center/:centerId/service/:id',
        layout: CenteredLayout,
        component: CenterServicePage,
    },
    {
        path: '/cart',
        layout: CenteredLayout,
        component: CartPage,
    },
    {
        path: '/cart/checkout',
        layout: BlankCenteredLayout,
        component: CheckoutPage,
    },
    {
        path: '/cart/checkout/confirm',
        layout: BlankCenteredLayout,
        component: CheckoutConfirmPage,
    },
    {
        path: '/login',
        layout: AuthenticateLayout,
        component: LoginPage,
    },
    {
        path: '/register',
        layout: AuthenticateLayout,
        component: RegisterPage,
    },
    {
        path: '/orders/details',
        layout: CenteredLayout,
        component: OrderDetailsPage,
    },
    {
        path: '/user/account/profile',
        layout: CustomerSidebarLayout,
        component: CustomerProfilePage,
    },
    {
        path: '/user/account/',
        component: CustomerProfilePage,
        redirectUrl: '/user/account/profile',
    },
    {
        path: '/user/account/address',
        layout: CustomerSidebarLayout,
        component: CustomerAddressPage,
    },
    {
        path: '/user/account/password',
        layout: CustomerSidebarLayout,
        component: CustomerPasswordPage,
    },
    {
        path: '/account/reset',
        layout: BlankCenteredLayout,
        component: ResetPasswordPage,
    },
    {
        path: '/user/order',
        layout: CustomerSidebarLayout,
        component: CustomerOrdersPage,
    },
    {
        path: '/user/notification',
        layout: CustomerSidebarLayout,
        component: CustomerNotificationPage,
    },
    {
        path: '/user/wallet',
        layout: CustomerSidebarLayout,
        component: CustomerWalletPage,
    },
    {
        path: '/provider/login',
        layout: StaffAuthenticateLayout,
        component: StaffLoginPage,
    },
    {
        path: '/provider/register',
        layout: StaffAuthenticateLayout,
        component: StaffRegisterPage,
    },
    {
        path: '/provider/dashboard',
        layout: ManagerDashboardLayout,
        component: ManagerDashboardPage,
    },
    {
        path: '/provider/staff/dashboard',
        layout: StaffDashboardLayout,
        component: StaffDashboardPage,
    },
    {
        path: '/provider/settings/center/profile',
        layout: ManagerDashboardLayout,
        component: ManagerCenterPage,
    },
    {
        path: '/provider/settings/center',
        layout: ManagerDashboardLayout,
        component: ManagerCenterSettingsPage,
    },
    {
        path: '/provider/registration',
        layout: UnregisteredLayout,
        component: ManagerCenterRegistrationPage,
    },
    {
        path: '/provider/role',
        layout: UnregisteredLayout,
        component: ProviderRoleChoosingPage,
    },
    {
        path: '/provider/staff/verify',
        layout: BlankCenteredLayout,
        component: StaffVerificationPage,
    },
    {
        path: '/account/information',
        layout: UnregisteredLayout,
        component: UserInformationPage,
    },
    {
        path: '/provider/settings/center/staff',
        layout: ManagerDashboardLayout,
        component: ManagerCenterStaffPage,
    },
    {
        path: '/provider/services',
        layout: ManagerDashboardLayout,
        component: ManagerServicePage,
    },
    {
        path: '/provider/services/create',
        layout: ManagerDashboardLayout,
        component: ManagerCreateServicePage,
    },
    {
        path: '/provider/services/:serviceId',
        layout: ManagerDashboardLayout,
        component: ManagerUpdateServicePage,
    },
    {
        path: '/provider/customers',
        layout: ManagerDashboardLayout,
        component: StaffCustomerPage,
    },
    {
        path: '/provider/orders',
        layout: ManagerDashboardLayout,
        component: StaffOrdersPage,
    },
    {
        path: '/provider/orders/:orderId',
        layout: ManagerDashboardLayout,
        component: StaffOrderDetailsPage,
    },
    {
        path: '/provider/promotions',
        layout: ManagerDashboardLayout,
        component: ManagerPromotionsPage,
    },
    {
        path: '/provider/calendar',
        layout: ManagerDashboardLayout,
        component: StaffCalendarPage,
    },
    {
        path: '/provider/calendar/day/:year/:month/:day',
        layout: ManagerDashboardLayout,
        component: StaffDayTimelinePage,
    },
    {
        path: '/provider/delivery',
        layout: ManagerDashboardLayout,
        component: StaffDeliveryPage,
    },
    {
        path: '/admin/dashboard',
        layout: AdminDashboardLayout,
        component: AdminDashboardPage,
    },
    {
        path: '/admin/centers/request',
        layout: AdminDashboardLayout,
        component: AdminCenterRequestPage,
    },
    {
        path: '/admin/centers',
        layout: AdminDashboardLayout,
        component: AdminCenterPage,
    },
    {
        path: '/admin/centers/:name',
        layout: AdminDashboardLayout,
        component: AdminCenterDetailsPage,
    },
    {
        path: '/admin/accounts',
        layout: AdminDashboardLayout,
        component: AdminAccountPage,
    },
    {
        path: '/admin/service-categories',
        layout: AdminDashboardLayout,
        component: AdminServicePage,
    },
    {
        path: '/admin/posts',
        layout: AdminDashboardLayout,
        component: AdminPostPage,
    },
];

export { publicRoutes };
