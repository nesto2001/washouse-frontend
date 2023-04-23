import { MenuProps, message } from 'antd';
import { Menu } from 'antd';
import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Order from '../../assets/images/order-pf.png';
import Noti from '../../assets/images/noti-pf.png';
import Wallet from '../../assets/images/wallet-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import User from '../../assets/images/user-pf.png';
import './Sidebar.scss';
import { AccountModel } from '../../models/Account/AccountModel';
import { getUserProfile } from '../../repositories/AccountRepository';
import { CustomerAccountModel } from '../../models/Account/CustomerAccountModel';
import { UserModel } from '../../models/User/UserModel';

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
    icon?: string;
    children?: MenuItemData[];
};

type UserSidebarProps = {
    basis: string;
};

const UserSidebar = ({ basis }: UserSidebarProps) => {
    const [openKeys, setOpenKeys] = useState(['account']);
    const [selectedKey, setSelectedKey] = useState<Array<string>>(['profile']);
    const [userProfile, setUserProfile] = useState<CustomerAccountModel>();

    const navigate = useNavigate();

    const datas: MenuItemData[] = useMemo(
        () => [
            {
                label: 'Tài khoản',
                key: 'account',
                url: '/user/account/profile',
                icon: User,
                children: [
                    {
                        label: 'Hồ sơ',
                        url: '/user/account/profile',
                        key: 'profile',
                    },
                    {
                        label: 'Địa chỉ',
                        url: '/user/account/address',
                        key: 'address',
                    },
                    {
                        label: 'Đổi mật khẩu',
                        url: '/user/account/password',
                        key: 'password',
                    },
                ],
            },
            {
                label: 'Đơn hàng',
                url: '/user/order',
                key: 'order',
                icon: Order,
            },
            {
                label: 'Thông báo',
                url: '/user/notification',
                key: 'noti',
                icon: Noti,
            },
            {
                label: 'Ví Washouse',
                url: '/user/wallet',
                key: 'wallet',
                icon: Wallet,
            },
        ],
        [],
    );

    const rootSubmenuKeys = datas.map((data) => data.key);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey: string | undefined = keys.find((key) => openKeys.indexOf(key) === -1);
        const openedKey: MenuItemData | undefined = datas.find(
            (data) => data.key === openKeys[0] && data.children && data.children?.length !== 0,
        );
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            if (!openedKey?.children?.find((child) => child.key === selectedKey[0])) {
                setOpenKeys(keys);
            }
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }

        const targetParent: MenuItemData | undefined = datas.find(
            (data) => data.key === latestOpenKey && data.children && data.children?.length !== 0,
        );

        if (targetParent && targetParent.children) {
            setSelectedKey([targetParent.children[0].key]);
            navigate(targetParent.children[0].url);
        }
    };

    const onSelect: MenuProps['onSelect'] = (key) => {
        setSelectedKey([key.key]);
        if (rootSubmenuKeys.indexOf(key.key) !== -1) {
            setOpenKeys([]);
        }
    };

    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        const user: UserModel = userJson && JSON.parse(userJson);

        const fetchData = async () => {
            return await getUserProfile(user.accountId);
        };
        fetchData()
            .then((res) => {
                setUserProfile(res);
            })
            .catch((error) => {
                console.log(error);
                message.error('Vui lòng đăng nhập để xem trang này');
                // navigate('/login');
            });
    }, []);

    const items: MenuItem[] = useMemo(
        () =>
            datas.map((data) => {
                return getItem(
                    <Link to={data.url}>{data.label}</Link>,
                    data.key,
                    <div className="sidenav__nav--icon max-h-[22px] h-6">
                        <img className="object-contain h-full" src={data.icon} alt="" />
                    </div>,
                    data.children?.map((child) => {
                        return getItem(
                            <div
                                onClick={() => {
                                    navigate(child.url, { state: { id: userProfile?.accountId } });
                                }}
                            >
                                {child.label}
                            </div>,
                            child.key,
                        );
                    }),
                );
            }),
        [],
    );

    return (
        <div className={clsx('userpage__sidenav text-left px-7 mt-16', basis ?? '')}>
            <div className="userpage__sidenav--user flex items-center">
                <div className="sidenav__user--avatar max-w-[72px] max-h-[72px] h-[72px] w-[72px] rounded-full overflow-hidden border-[1.5px]">
                    <img className="object-cover h-full w-full" src={userProfile?.profilePic ?? Placeholder} alt="" />
                </div>
                <div className="sidenav__user--info ml-4">
                    <div className="user__info--name font-bold">{userProfile?.fullname}</div>
                    <div className="user__info--action font-medium text-sub-gray">
                        <Link to="/user/account/profile">Sửa hồ sơ</Link>
                    </div>
                </div>
            </div>
            <hr className="my-4 border-wh-gray" />
            <div className="userpage__sidenav--nav">
                <Menu
                    className="border-none"
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{ width: 256, borderRight: 'none' }}
                    items={items}
                    onSelect={onSelect}
                    selectedKeys={selectedKey}
                />
            </div>
        </div>
    );
};

export default UserSidebar;
