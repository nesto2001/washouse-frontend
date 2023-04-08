import { Layout, MenuProps, message, theme } from 'antd';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets//images/washouse-tagline.png';
import Laundromat from '../../assets/images/store.png';
import UserPlaceholder from '../../assets/images/user-placeholder.png';
import DropdownMenu from '../../components/Dropdown/DropdownMenu';
import NotificationDropdown from '../../components/NotificationDropdown/NotificationDropdown';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import style from '../DashboardLayout/DashboardLayout.module.scss';

type Props = {
    children?: JSX.Element;
};

const { Header, Sider, Content } = Layout;

const UnregisteredLayout = ({ children }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const userJson = localStorage.getItem('currentUser');
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<UserModel>(userJson && JSON.parse(userJson));
    const navigate = useNavigate();

    useMemo(() => {
        const fetchData = async () => {
            return await getMe();
        };
        fetchData().catch((error) => {
            // if (error) {
            //     message.error('Vui lòng đăng nhập để xem trang này');
            //     navigate('/provider/login');
            // }
        });
    }, [user]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
        <>
            {contextHolder}
            <Layout hasSider className="text-left">
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            paddingLeft: 420,
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 200,
                        }}
                    >
                        <div className="max-h-[50px] max-w-[150px] mx-auto">
                            <img className="h-full w-full object-cover" src={Logo} alt="" />
                        </div>
                        <div className="flex justify-end items-center gap-9 h-full">
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
                                            {user.name}
                                        </div>
                                    }
                                    className=""
                                />
                            </div>
                        </div>
                    </Header>
                    <Content style={{ overflow: 'initial', minHeight: `calc(100vh - 88px)` }}>{children}</Content>
                </Layout>
            </Layout>
        </>
    );
};

export default UnregisteredLayout;
