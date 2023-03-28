import {
    CalendarOutlined,
    CarOutlined,
    HeartOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets//images/washouse-notag.png';
import LogoSmall from '../../../assets/images/washouse-notext.png';
import UserPlaceholder from '../../../assets/images/user-placeholder.png';
import style from './DashboardLayout.module.scss';
import clsx from 'clsx';
import DropdownMenu from '../../Dropdown/DropdownMenu';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

const ManagerDashboardLayout = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState({ name: 'Le thanh Dat' });
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
            icon: <LineChartOutlined />,
            label: <Link to="/provider/dashboard">Bảng chính</Link>,
        },
        {
            key: '2',
            icon: <SolutionOutlined />,
            label: 'Đơn hàng',
        },
        {
            key: '3',
            icon: <CarOutlined />,
            label: 'Vận chuyển',
        },
        {
            key: '4',
            icon: <CalendarOutlined />,
            label: 'Đặt lịch',
        },
        {
            key: '6',
            icon: <HeartOutlined />,
            label: 'Dịch vụ',
            children: [{ key: '7', label: <Link to="/provider/services">Tất cả dịch vụ</Link> }],
        },
        {
            key: '8',
            icon: <ShopOutlined />,
            label: 'Trung tâm',
            children: [{ key: '9', label: <Link to="/provider/settings/center/profile">Hồ sơ trung tâm</Link> }],
        },
        {
            key: '10',
            icon: <UserOutlined />,
            label: <Link to="/provider/customers">Khách hàng</Link>,
        },
    ];
    return (
        <Layout hasSider className="text-left">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width={256}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    filter: 'drop-shadow(2px 0 5px rgba(0,0,0,0.15))',
                }}
            >
                <div className="logo flex justify-center pt-4">
                    {collapsed ? <img width={'40%'} src={LogoSmall} alt="" /> : <img width={'80%'} src={Logo} alt="" />}
                </div>
                <Menu className="mt-5" theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout className="site-layout" style={collapsed ? { marginLeft: 80 } : { marginLeft: 256 }}>
                <Header
                    style={{
                        padding: 0,
                        paddingLeft: 20,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: 200,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div className={style.active__staff}>
                        <div
                            className={clsx(
                                'w-[50px] h-[50px] rounded-full overflow-hidden',
                                style.active__staff_avatar,
                            )}
                        >
                            <img className="w-full h-full object-cover" src={UserPlaceholder} alt="" />
                        </div>
                        <DropdownMenu items={items} menuText={user.name} className="" />
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 24px', overflow: 'initial', minHeight: `calc(100vh - 88px)` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ManagerDashboardLayout;
