import HomePage from '../pages/HomePage/HomePage';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout?: () => JSX.Element;
}

const publicRoutes: Array<RouteProps> = [{ path: '/', component: HomePage },
];

export { publicRoutes };
