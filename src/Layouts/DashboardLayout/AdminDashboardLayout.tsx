import {
    CalendarOutlined,
    CarOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets//images/washouse-notag.png';
import UserPlaceholder from '../../assets/images/user-placeholder.png';
import LogoSmall from '../../assets/images/washouse-notext.png';
import DropdownMenu from '../../components/Dropdown/DropdownMenu';
import style from './DashboardLayout.module.scss';
import { BiPowerOff } from 'react-icons/bi';
import { UserModel } from '../../models/User/UserModel';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

type MenuItemData = {
    label: string;
    key: string;
    url: string;
    state?: { keyTabs: string };
    icon?: string | JSX.Element;
    children?: MenuItemData[];
};

const AdminDashboardLayout = ({ children }: Props) => {
    const navigate = useNavigate();
    const userJson = localStorage.getItem('currentUser');
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<UserModel | null>(userJson && JSON.parse(userJson));
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const datas: MenuItemData[] = [
        {
            key: '1',
            url: '/admin/dashboard',
            icon: <LineChartOutlined />,
            label: 'Bảng chính',
        },
        {
            key: '2',
            url: '/admin/centers/request',
            state: { keyTabs: '3' },
            icon: <SolutionOutlined />,
            label: 'Kiểm duyệt',
        },
        {
            key: '3',
            state: { keyTabs: '1' },
            url: '/admin/centers/',
            icon: <SolutionOutlined />,
            label: 'Trung tâm',
        },
        {
            key: '4',
            url: '/admin/service-categories',
            icon: <CarOutlined />,
            label: 'Dịch vụ',
        },
        {
            key: '5',
            url: '/admin/posts',
            icon: <CalendarOutlined />,
            label: 'Bài đăng',
        },
        {
            key: '6',
            url: '/admin/accounts',
            icon: <CalendarOutlined />,
            label: 'Tài khoản',
        },
    ];

    const items: MenuItem[] = datas.map((data) => {
        return getItem(
            <div
                onClick={() => {
                    navigate(data.url, data.state && { state: { keyTab: data.state.keyTabs } });
                }}
            >
                {data.label}
            </div>,
            data.key,
            <div className="sidenav__nav--icon max-h-[22px] h-6">
                {typeof data.icon === 'string' ? (
                    <img className="object-contain h-full" src={data.icon} alt="" />
                ) : (
                    data.icon
                )}
            </div>,
            data.children?.map((child) => {
                return getItem(
                    <div
                        onClick={() => {
                            navigate(child.url);
                        }}
                    >
                        {child.label}
                    </div>,
                    child.key,
                );
            }),
        );
    });

    const userDropdown: MenuProps['items'] = [
        {
            label: (
                <>
                    <Link
                        to="/"
                        onClick={() => {
                            setUser(null);
                            localStorage.clear();
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
                        <DropdownMenu
                            items={userDropdown}
                            content={
                                <div className="flex items-center justify-center">
                                    <div
                                        className={clsx(
                                            'w-[40px] h-[40px] rounded-full overflow-hidden',
                                            style.active__staff_avatar,
                                        )}
                                    >
                                        <img className="w-full h-full object-cover" src={UserPlaceholder} alt="" />
                                    </div>
                                    {user?.name}
                                </div>
                            }
                        />
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 24px', overflow: 'initial', minHeight: `calc(100vh - 88px)` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboardLayout;
