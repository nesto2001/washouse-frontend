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
        path: '/centers/center', //fix to :id
        layout: CenteredLayout,
        component: CenterPage,
    },
    {
        path: '/centers/center/service', //fix to :id
        layout: CenteredLayout,
        component: CenterServicePage,
    },
    {
        path: '/cart', //fix to :id
        layout: CenteredLayout,
        component: CartPage,
    },
    {
        path: '/cart/checkout', //fix to :id
        layout: BlankCenteredLayout,
        component: CheckoutPage,
    },
    {
        path: '/cart/checkout/confirm', //fix to :id
        layout: BlankCenteredLayout,
        component: CheckoutConfirmPage,
    },
    {
        path: '/login', //fix to :id
        layout: AuthenticateLayout,
        component: LoginPage,
    },
    {
        path: '/register', //fix to :id
        layout: AuthenticateLayout,
        component: RegisterPage,
    },
    {
        path: '/orders/details', //fix to :id
        layout: CenteredLayout,
        component: OrderDetailsPage,
    },
    {
        path: '/user/account/profile', //fix to :id
        layout: CustomerSidebarLayout,
        component: ProfilePage,
    },
    {
        path: '/user/account/',
        component: ProfilePage,
        redirectUrl: '/user/account/profile',
    },
    {
        path: '/user/account/address', //fix to :id
        layout: CustomerSidebarLayout,
        component: AddressPage,
    },
    {
        path: '/user/account/password', //fix to :id
        layout: CustomerSidebarLayout,
        component: CustomerPasswordPage,
    },
    {
        path: '/user/order', //fix to :id
        layout: CustomerSidebarLayout,
        component: CustomerOrdersPage,
    },
];

export { publicRoutes };
