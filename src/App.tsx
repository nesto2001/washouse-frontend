import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DefaultLayout } from './components/Layouts';
import { publicRoutes } from './routers/Router';
import { Provider } from 'react-redux';
import CartStore from './store/CartStore';
import { ConfigProvider } from 'antd';
import themeConfig from './antd-theme.json';

function App() {
    return (
        <React.StrictMode>
            <ConfigProvider theme={themeConfig}>
                <Provider store={CartStore}>
                    <BrowserRouter>
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
