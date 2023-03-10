import { CenteredLayout, BlankCenteredLayout, SidebarLayout, AuthenticateLayout } from '../components/Layouts/';
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
} from '../pages/';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }?: any) => JSX.Element;
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
    },{
        path: '/orders/details', //fix to :id
        layout: CenteredLayout,
        component: OrderDetailsPage,
    },
];

export { publicRoutes };
