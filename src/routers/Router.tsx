import HomePage from '../pages/HomePage/HomePage';
import CentersPage from '../pages/CentersPage/CentersPage';
import SidebarLayout from '../components/Layouts/SidebarLayout';

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
];

export { publicRoutes };
