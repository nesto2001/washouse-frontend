import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Order from '../../assets/images/order-pf.png';
import Noti from '../../assets/images/noti-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import User from '../../assets/images/user-pf.png';
import './Sidebar.scss';

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

const datas: MenuItemData[] = [
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
];

const items: MenuItem[] = datas.map((data) => {
    return getItem(
        <Link to={data.url}>{data.label}</Link>,
        data.key,
        <div className="sidenav__nav--icon max-h-[22px] h-6">
            <img className="object-contain h-full" src={data.icon} alt="" />
        </div>,
        data.children?.map((child) => {
            return getItem(<Link to={child.url}>{child.label}</Link>, child.key);
        }),
    );
});

type UserSidebarProps = {
    basis: string;
    activeNav: string;
};
const rootSubmenuKeys = datas.map((data) => data.key);

const UserSidebar = ({ basis, activeNav }: UserSidebarProps) => {
    const [openKeys, setOpenKeys] = useState(['account']);
    const [selectedKey, setSelectedKey] = useState<Array<string>>(['profile']);
    const navigate = useNavigate();

    useEffect(() => {
        const curr = document.querySelectorAll<HTMLElement>('.sidenav__nav--link');
        curr.forEach((element) => {
            element.classList.remove('active');
        });

        const activeElement = document.getElementById(`nav-${activeNav}`);
        activeElement?.classList.add('active');

        if (activeNav == 'profile' || activeNav == 'address' || activeNav == 'password') {
            document.getElementById('account-nav')?.classList.add('active');
        } else {
            document.getElementById('account-nav')?.classList.remove('active');
        }
    }, [activeNav]);

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

    return (
        <div className={clsx('userpage__sidenav text-left px-7 mt-16', basis ?? '')}>
            <div className="userpage__sidenav--user flex items-center">
                <div className="sidenav__user--avatar max-w-[72px] max-h-[72px] h-[72px] rounded-full overflow-hidden">
                    <img className="object-cover h-full" src={Placeholder} alt="" />
                </div>
                <div className="sidenav__user--info ml-4">
                    <div className="user__info--name font-bold">Trần Tân Long</div>
                    <div className="user__info--action font-medium text-sub-gray">Sửa hồ sơ</div>
                </div>
            </div>
            <hr className="my-4 border-wh-gray" />
            <div className="userpage__sidenav--nav">
                {/* <div className="sidenav__nav--account" id="account-nav">
                    <Link to="/user/account/profile" className="sidenav__nav--header flex items-center mb-2">
                        <div className="sidenav__nav--icon max-h-[22px] h-6">
                            <img className="object-contain h-full" src={User} alt="" />
                        </div>
                        <div className="sidenav__nav--link font-bold ml-2">Tài khoản</div>
                    </Link>
                    <ul className="sidenav__nav--sub pl-8">
                        <li className="sidenav__nav--link" id="nav-profile">
                            <Link to="/user/account/profile">Hồ sơ</Link>
                        </li>
                        <li className="sidenav__nav--link" id="nav-address">
                            <Link to="/user/account/address">Địa chỉ</Link>
                        </li>
                        <li className="sidenav__nav--link" id="nav-password">
                            <Link to="/user/account/password">Đổi mật khẩu</Link>
                        </li>
                    </ul>
                </div>
                <div className="sidenav__nav--order mt-4">
                    <Link to="/user/order" className="sidenav__nav--header flex items-center mb-2">
                        <div className="sidenav__nav--icon max-h-[22px] h-6">
                            <img className="object-contain h-full" src={Order} alt="" />
                        </div>
                        <div className="sidenav__nav--link font-bold ml-2" id="nav-order">
                            Đơn hàng
                        </div>
                    </Link>
                </div>
                <div className="sidenav__nav--notification mt-4">
                    <Link to="/user/notification" className="sidenav__nav--header flex items-center mb-2">
                        <div className="sidenav__nav--icon max-h-[22px] h-6">
                            <img className="object-contain h-full" src={Noti} alt="" />
                        </div>
                        <div className="sidenav__nav--link font-bold ml-2" id="nav-noti">
                            Thông báo
                        </div>
                    </Link>
                </div> */}
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{ width: 256 }}
                    items={items}
                    onSelect={onSelect}
                    selectedKeys={selectedKey}
                />
            </div>
        </div>
    );
};

export default UserSidebar;
