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
import { Layout, Menu, MenuProps, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets//images/washouse-notag.png';
import UserPlaceholder from '../../assets/images/user-placeholder.png';
import LogoSmall from '../../assets/images/washouse-notext.png';
import User from '../../assets/images/user-pf.png';
import Order from '../../assets/images/order-pf.png';
import Laundromat from '../../assets/images/store.png';
import DropdownMenu from '../../components/Dropdown/DropdownMenu';
import style from './DashboardLayout.module.scss';
import { BiPowerOff } from 'react-icons/bi';
import { UserModel } from '../../models/User/UserModel';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

const ManagerDashboardLayout = ({ children }: Props) => {
    const userJson = localStorage.getItem('currentUser');
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<UserModel>(userJson && JSON.parse(userJson));

    useEffect(() => {
        const fetchData = async () => {};
    }, []);

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

    const userDropdown: MenuProps['items'] = [
        // {
        //     label: (
        //         <>
        //             <Link to="/user/account/profile" className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1">
        //                 <img className="w-5 object-scale-down mr-5" src={User} alt="" />
        //                 Tài khoản
        //             </Link>
        //         </>
        //     ),
        //     key: '0',
        // },
        {
            label: (
                <>
                    <Link
                        to="/provider/settings/center/profile"
                        className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1"
                    >
                        <img className="w-5 object-scale-down mr-5" src={Laundromat} alt="" /> Trung tâm
                    </Link>
                </>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <>
                    <Link
                        to="/"
                        onClick={() => {
                            localStorage.clear();
                            //handle Logout
                        }}
                        className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1"
                        id="logout"
                    >
                        <BiPowerOff size={20} className="mr-5" />
                        Đăng xuất
                    </Link>
                </>
            ),
            key: '3',
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
                        <DropdownMenu items={userDropdown} menuText={user.name} className="" />
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
