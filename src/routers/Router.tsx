import {
    CenteredLayout,
    BlankCenteredLayout,
    SidebarLayout,
    AuthenticateLayout,
    CustomerSidebarLayout,
    ManagerDashboardLayout,
    AdminDashboardLayout,
} from '../components/Layouts/';
import {
    CartPage,
    CenterPage,
    CenterServicePage,
    CentersPage,
    CheckoutPage,
    HomePage,
    CheckoutConfirmPage,
    LoginPage,
    RegisterPage,
    OrderDetailsPage,
    CustomerProfilePage,
    CustomerAddressPage,
    CustomerOrdersPage,
    CustomerPasswordPage,
    ManagerDashboardPage,
    ManagerCenterPage,
    ManagerCenterRegistrationPage,
    ManagerServicePage,
    ManagerCreateServicePage,
    StaffCustomerPage,
    AdminDashboardPage,
    AdminCenterPage,
    ResetPasswordPage,
} from '../pages/';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }?: any) => JSX.Element;
    redirectUrl?: string;
}

const publicRoutes: Array<RouteProps> = [
    { path: '/', component: HomePage },
    {
        path: '/trung-tâm',
        layout: SidebarLayout,
        component: CentersPage,
    },
    {
        path: '/trung-tâm/:name',
        layout: CenteredLayout,
        component: CenterPage,
    },
    {
        path: '/centers/center/:id/service/:id',
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
        path: '/admin/dashboard',
        layout: AdminDashboardLayout,
        component: AdminDashboardPage,
    },
    {
        path: '/admin/centers/request',
        layout: AdminDashboardLayout,
        component: AdminCenterPage,
    },
    {
        path: '/admin/centers/',
        layout: AdminDashboardLayout,
        component: AdminCenterPage,
    },
];

export { publicRoutes };
