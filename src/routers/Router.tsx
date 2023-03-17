import {
    CenteredLayout,
    BlankCenteredLayout,
    SidebarLayout,
    AuthenticateLayout,
    CustomerSidebarLayout,
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
    ProfilePage,
    AddressPage,
    CustomerOrdersPage,
    CustomerPasswordPage,
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
        path: '/centers',
        layout: SidebarLayout,
        component: CentersPage,
    },
    {
        path: '/centers/center/:id',
        layout: CenteredLayout,
        component: CenterPage,
    },
    {
        path: '/centers/center/service',
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
        component: ProfilePage,
    },
    {
        path: '/user/account/',
        component: ProfilePage,
        redirectUrl: '/user/account/profile',
    },
    {
        path: '/user/account/address',
        layout: CustomerSidebarLayout,
        component: AddressPage,
    },
    {
        path: '/user/account/password',
        layout: CustomerSidebarLayout,
        component: CustomerPasswordPage,
    },
    {
        path: '/user/order',
        layout: CustomerSidebarLayout,
        component: CustomerOrdersPage,
    },
];

export { publicRoutes };
