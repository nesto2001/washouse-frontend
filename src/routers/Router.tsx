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
    AdminAccountPage,
    AdminCenterDetailsPage,
    AdminCenterPage,
    AdminDashboardPage,
    CartPage,
    CenterPage,
    CenterServicePage,
    CentersPage,
    CheckoutConfirmPage,
    CheckoutPage,
    CustomerAddressPage,
    CustomerNotificationPage,
    CustomerOrdersPage,
    CustomerPasswordPage,
    CustomerProfilePage,
    CustomerWalletPage,
    HomePage,
    LoginPage,
    ManagerCenterGalleryPage,
    ManagerCenterPage,
    ManagerCenterRegistrationPage,
    ManagerCenterSettingsPage,
    ManagerCenterStaffPage,
    ManagerCreateServicePage,
    ManagerDashboardPage,
    ManagerFinanceSettingsPage,
    ManagerFinanceWalletPage,
    ManagerServicePage,
    OrderDetailsPage,
    ProviderRoleChoosingPage,
    RegisterPage,
    ResetPasswordPage,
    StaffCalendarPage,
    StaffCreateOrderPage,
    StaffCustomerPage,
    StaffDashboardPage,
    StaffDayTimelinePage,
    StaffDeliveryPage,
    StaffFeedbacksPage,
    StaffLoginPage,
    StaffOrderDetailsPage,
    StaffOrdersPage,
    StaffRegisterPage,
    StaffVerificationPage,
    UserInformationPage,
    BlogPage,
} from '../pages/';
import AdminCenterRequestPage from '../pages/AdminPage/AdminCenterRequest/AdminCenterRequestPage';
import AdminCenterUpdateRequestPage from '../pages/AdminPage/AdminCenterRequest/AdminCenterUpdateRequestPage';
import AdminCreatePostPage from '../pages/AdminPage/AdminPost/AdminCreatePostPage';
import AdminPostDetailPage from '../pages/AdminPage/AdminPost/AdminPostDetailPage';
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
        path: '/blogs/:id',
        component: BlogPage,
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
        path: '/provider/orders/create',
        layout: ManagerDashboardLayout,
        component: StaffCreateOrderPage,
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
        path: '/provider/finance/wallet',
        layout: ManagerDashboardLayout,
        component: ManagerFinanceWalletPage,
    },
    {
        path: '/provider/finance/settings',
        layout: ManagerDashboardLayout,
        component: ManagerFinanceSettingsPage,
    },
    {
        path: '/provider/settings/center/rating',
        layout: ManagerDashboardLayout,
        component: StaffFeedbacksPage,
    },
    {
        path: '/provider/settings/center/gallery',
        layout: ManagerDashboardLayout,
        component: ManagerCenterGalleryPage,
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
        path: '/admin/centers/update-request',
        layout: AdminDashboardLayout,
        component: AdminCenterUpdateRequestPage,
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
        path: '/admin/posts/:id',
        layout: AdminDashboardLayout,
        component: AdminPostDetailPage,
    },
    {
        path: '/admin/posts',
        layout: AdminDashboardLayout,
        component: AdminPostPage,
    },
    {
        path: '/admin/posts/create',
        layout: AdminDashboardLayout,
        component: AdminCreatePostPage,
    },
];

export { publicRoutes };
