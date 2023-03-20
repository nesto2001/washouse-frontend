import DashboardMenu from '../../DashboardMenu/DashboardMenu';

import { Layout, Menu, theme } from 'antd';
import React, { Children, useState } from 'react';
import {
    LineChartOutlined,
    SolutionOutlined,
    CalendarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { GrClipboard, GrDeliver } from 'react-icons/gr';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { VscCalendar } from 'react-icons/vsc';
import Logo from '../../../assets//images/washouse-notag.png';
import LogoSmall from '../../../assets//images/washouse-notext.png';
import { Link } from 'react-router-dom';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

const ManagerDashboardLayout = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
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
            icon: <GrDeliver />,
            label: 'Vận chuyển',
        },
        {
            key: '4',
            icon: <CalendarOutlined />,
            label: 'Đặt lịch',
        },
        {
            key: '5',
            icon: <ShopOutlined />,
            label: 'Trung tâm',
            children: [{ key: '6', label: <Link to="/provider/settings/center/profile">Hồ sơ trung tâm</Link> }],
        },
        {
            key: '7',
            icon: <UserOutlined />,
            label: 'Khách hàng',
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
                <Header style={{ padding: 0, paddingLeft: 20, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight: `calc(100vh - 88px)` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ManagerDashboardLayout;
