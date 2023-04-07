import {
    AdminDashboardLayout,
    AuthenticateLayout,
    BlankCenteredLayout,
    CenteredLayout,
    CustomerSidebarLayout,
    ManagerDashboardLayout,
    SidebarLayout,
    StaffAuthenticateLayout,
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
} from '../pages/';
import AdminCenterRequestPage from '../pages/AdminPage/AdminCenterRequest/AdminCenterRequestPage';
import AdminPostPage from '../pages/AdminPage/AdminPost/AdminPostPage';
import AdminServicePage from '../pages/AdminPage/AdminService/AdminServicePage';
import ManagerPromotionsPage from '../pages/StaffPage/ManagerPromotion/ManagerPromotionsPage';

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
        path: '/provider/settings/center/profile',
        layout: ManagerDashboardLayout,
        component: ManagerCenterPage,
    },
    {
        path: '/provider/registration',
        layout: ManagerDashboardLayout,
        component: ManagerCenterRegistrationPage,
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
        path: '/admin/centers/',
        layout: AdminDashboardLayout,
        component: AdminCenterPage,
    },
    {
        path: '/admin/accounts/',
        layout: AdminDashboardLayout,
        component: AdminAccountPage,
    },
    {
        path: '/admin/service-categories/',
        layout: AdminDashboardLayout,
        component: AdminServicePage,
    },
    {
        path: '/admin/posts/',
        layout: AdminDashboardLayout,
        component: AdminPostPage,
    },
];

export { publicRoutes };
