import HomePage from '../pages/HomePage/HomePage';
import CentersPage from '../pages/CentersPage/CentersPage';
import SidebarLayout from '../components/Layouts/SidebarLayout';
import CenterPage from '../pages/CenterPage/CenterPage';
import CenteredLayout from '../components/Layouts/CenteredLayout';
import CenterServicePage from '../pages/CenterServicePage/CenterServicePage';
import CartPage from '../pages/CartPage/CartPage';

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
];

export { publicRoutes };
