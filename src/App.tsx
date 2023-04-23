import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DefaultLayout } from './Layouts';
import themeConfig from './antd-theme.json';
import ScrollToTop from './components/ScrollTop/ScrollToTop';
import { publicRoutes } from './routers/Router';
import CartStore from './store/CartStore';

function App() {
    return (
        <React.StrictMode>
            <ConfigProvider theme={themeConfig}>
                <Provider store={CartStore}>
                    <BrowserRouter>
                        <ScrollToTop />
                        <div className="App">
                            <Routes>
                                {publicRoutes.map(
                                    (
                                        route: {
                                            path: string;
                                            component: () => JSX.Element;
                                            layout?: () => JSX.Element;
                                            redirectUrl?: string;
                                        },
                                        index: number,
                                    ) => {
                                        const Page: () => JSX.Element = route.component;
                                        let Layout: ({ children }: { children?: JSX.Element }) => JSX.Element =
                                            route.layout ?? DefaultLayout;

                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                }
                                            />
                                        );
                                    },
                                )}
                            </Routes>
                        </div>
                    </BrowserRouter>
                </Provider>
            </ConfigProvider>
        </React.StrictMode>
    );
}

export default App;
