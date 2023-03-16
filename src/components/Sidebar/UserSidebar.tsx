import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Noti from '../../assets/images/noti-pf.png';
import Order from '../../assets/images/order-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import User from '../../assets/images/user-pf.png';
import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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

const items: MenuItem[] = [
    getItem(
        <Link to="/user/account/profile">Tài khoản</Link>,
        'account',
        <div className="sidenav__nav--icon max-h-[22px] h-6">
            <img className="object-contain h-full" src={User} alt="" />
        </div>,
        [
            getItem(<Link to="/user/account/profile">Hồ sơ</Link>, 'profile'),
            getItem(<Link to="/user/account/address">Địa chỉ</Link>, 'address'),
            getItem(<Link to="/user/account/password">Đổi mật khẩu</Link>, 'password'),
        ],
    ),
    getItem(
        <Link to="/user/order">Thông báo</Link>,
        'order',
        <div className="sidenav__nav--icon max-h-[22px] h-6">
            <img className="object-contain h-full" src={Order} alt="" />
        </div>,
    ),
    getItem(
        <Link to="/user/noti">Thông báo</Link>,
        'noti',
        <div className="sidenav__nav--icon max-h-[22px] h-6">
            <img className="object-contain h-full" src={Noti} alt="" />
        </div>,
    ),
];

type UserSidebarProps = {
    basis: string;
    activeNav: string;
};
const rootSubmenuKeys = ['account', 'order', 'noti'];

interface Map {
    [key: string]: string;
}

const mapSubmenu: Map = {
    account: 'profile',
};

const UserSidebar = ({ basis, activeNav }: UserSidebarProps) => {
    const [openKeys, setOpenKeys] = useState(['account']);
    const [selectedKey, setSelectedKey] = useState<Array<string>>(['profile']);

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
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }

        if (latestOpenKey && mapSubmenu[latestOpenKey]) {
            setSelectedKey([mapSubmenu[latestOpenKey]]);
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
