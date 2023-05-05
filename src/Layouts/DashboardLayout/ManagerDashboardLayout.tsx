import {
    CalendarOutlined,
    CarOutlined,
    GiftOutlined,
    HeartOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    SolutionOutlined,
    UserOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, message, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets//images/washouse-notag.png';
import Laundromat from '../../assets/images/store.png';
import UserPlaceholder from '../../assets/images/user-placeholder.png';
import LogoSmall from '../../assets/images/washouse-notext.png';
import DropdownMenu from '../../components/Dropdown/DropdownMenu';
import NotificationDropdown from '../../components/NotificationDropdown/NotificationDropdown';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import { getManagerCenter } from '../../repositories/StaffRepository';
import style from './DashboardLayout.module.scss';
import ChatBox from '../../components/Chat/ChatBox';
import ChatboxContainer from '../../containers/ChatboxContainer';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

const ManagerDashboardLayout = ({ children }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const userJson = localStorage.getItem('currentUser');
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<UserModel | null>(userJson && JSON.parse(userJson));
    const [userRole, setUserRole] = useState(user?.roleType ?? '');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useMemo(() => {
        const fetchData = async () => {
            return await getManagerCenter();
        };
        fetchData().catch((error) => {
            if (user?.roleType == 'User') {
                navigate('/provider/registration');
            }
            // if (error) {
            //     navigate('/provider/registration');
            // }
        });
    }, [user]);

    useMemo(
        () =>
            getManagerCenter().then((res) => {
                if (res.status.toLowerCase() === 'pending') {
                    if (
                        !(
                            pathname.includes('/provider/pending') ||
                            pathname.includes('/provider/dashboard') ||
                            pathname.includes('/provider/settings')
                        )
                    ) {
                        navigate('/provider/pending');
                    }
                }
            }),
        [pathname],
    );

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
            icon: <LineChartOutlined />,
            label: (
                <Link
                    to={`${
                        (userRole.toLowerCase() === 'manager' && '/provider/dashboard') ||
                        (userRole.toLowerCase() === 'staff' && '/provider/staff/dashboard')
                    }`}
                >
                    Bảng chính
                </Link>
            ),
        },
        {
            key: '2',
            icon: <SolutionOutlined />,
            label: <Link to="/provider/orders">Đơn hàng</Link>,
        },
        {
            key: '3',
            icon: <CarOutlined />,
            label: <Link to="/provider/delivery">Vận chuyển</Link>,
        },
        {
            key: '4',
            icon: <CalendarOutlined />,
            label: <Link to="/provider/calendar">Đặt lịch</Link>,
        },
        {
            key: '5',
            icon: <HeartOutlined />,
            label: <Link to="/provider/services">Dịch vụ</Link>,
        },
        {
            key: '6',
            icon: <GiftOutlined />,
            label: <Link to="/provider/promotions">Khuyến mãi</Link>,
        },
        {
            key: '7',
            icon: <WalletOutlined />,
            label: <Link to="/provider/promotions">Tài chính</Link>,
            children: [
                { key: '8', label: <Link to="/provider/finance/wallet">Số dư</Link> },
                { key: '9', label: <Link to="/provider/finance/settings">Thiết lập thanh toán</Link> },
            ],
        },
        {
            key: '10',
            icon: <ShopOutlined />,
            label: 'Trung tâm',
            children: [
                { key: '11', label: <Link to="/provider/settings/center/profile">Hồ sơ trung tâm</Link> },
                // { key: '12', label: <Link to="/provider/settings/center/gallery">Hình ảnh trung tâm</Link> },
                { key: '13', label: <Link to="/provider/settings/center/rating">Đánh giá trung tâm</Link> },
                { key: '14', label: <Link to="/provider/settings/center/">Thiết lập trung tâm</Link> },
                { key: '15', label: <Link to="/provider/settings/center/staff">Danh sách nhân viên</Link> },
            ],
        },
        {
            key: '16',
            icon: <UserOutlined />,
            label: <Link to="/provider/customers">Khách hàng</Link>,
        },
    ];

    const userDropdown: MenuProps['items'] = [
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

    useEffect(() => {
        getMe().then((res) => {
            setUser(res);
        });
    }, []);

    return (
        <>
            {contextHolder}
            {user && <ChatboxContainer user={user} manager />}
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
                        {collapsed ? (
                            <img width={'40%'} src={LogoSmall} alt="" />
                        ) : (
                            <img width={'80%'} src={Logo} alt="" />
                        )}
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
                        <div className="flex justify-center items-center gap-9 h-full">
                            <NotificationDropdown child={<FaBell />} showBadge />
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
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={UserPlaceholder}
                                                    alt=""
                                                />
                                            </div>
                                            {user?.name}
                                        </div>
                                    }
                                    className=""
                                />
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 24px', overflow: 'initial', minHeight: `calc(100vh - 88px)` }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default ManagerDashboardLayout;
