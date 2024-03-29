import { Badge, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { BiPowerOff, BiSearch } from 'react-icons/bi';
import { FaRegBell, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Order from '../../assets/images/order-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import User from '../../assets/images/user-pf.png';
import Logo from '../../assets/images/washouse-tagline.png';
import ChatboxContainer from '../../containers/ChatboxContainer';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import { getDistricts, getUserDistrict } from '../../repositories/LocationRepository';
import { RootState } from '../../store/CartStore';
import { Option } from '../../types/Options';
import { getCurrentLocation } from '../../utils/CommonUtils';
import Button from '../Button';
import DropdownMenu from '../Dropdown/DropdownMenu';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import OrderDropdown from '../OrderDropdown/OrderDropdown';
import Selectbox from '../Selectbox';
import './Navbar.scss';

const Navbar = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const districtJson = sessionStorage.getItem('userDistrict');
    const [district, setDistrict] = useState<LocationPlaceModel | null>(districtJson ? JSON.parse(districtJson) : null);
    const [districts, setDistricts] = useState<LocationPlaceModel[]>([]);
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel | null>(userJson ? JSON.parse(userJson) : null);
    const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity) ?? 0;
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue] = useSearchParams();
    const [searchString, setSearchString] = useState<string>();

    const handleSearch = () => {
        if (searchString) {
            navigate(`/trung-tam?district=${district ? district.id : ''}&search=${searchString ?? ''}`);
        }
    };

    useEffect(() => {
        getMe().then((res) => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            setUser(res);
        });
        getCurrentLocation(setState, locationError);
    }, []);

    useEffect(() => {
        setSearchString(searchValue.get('search') ?? '');
    }, [location]);

    const locationError = (error: any) => {
        console.log(`Gặp lỗi khi lấy vị trí hoặc quyền sử dụng vị trí chưa được cấp: ${error.message}`);
    };

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setLatitude(latitude);
        setLongitude(longitude);
    };

    useEffect(() => {
        const userDistrictJson = sessionStorage.getItem('userDistrict');
        const userDistrict: LocationPlaceModel = userDistrictJson ? JSON.parse(userDistrictJson) : null;
        if (userDistrict) {
            setDistrict(userDistrict);
        } else {
            if (latitude && longitude) {
                getUserDistrict({ lat: latitude, long: longitude }).then((res) => {
                    setDistrict({ id: res.id, name: res.name });
                    sessionStorage.setItem('userDistrict', JSON.stringify(res));
                });
            }
        }
    }, [latitude, longitude]);

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const label = districts.find((option) => option.id === value)?.name;

        if (label) {
            const newDistrict = { id: value, name: label };
            setDistrict(newDistrict);
            sessionStorage.setItem('userDistrict', JSON.stringify(newDistrict));
        } else {
            setDistrict(null);
            sessionStorage.removeItem('userDistrict');
        }
    };

    useEffect(() => {
        getDistricts().then((res) => {
            setDistricts(res);
        });
    }, []);

    useEffect(() => {
        if (!window.location.pathname.includes('/trung-tam/') && window.location.pathname.includes('/trung-tam')) {
            navigate(`/trung-tam?district=${district ? district.id : ''}&search=${searchString ?? ''}`);
        }
    }, [district]);

    const items: MenuProps['items'] = [
        {
            label: (
                <>
                    <Link to="/user/account/profile" className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1">
                        <img className="w-5 object-scale-down mr-5" src={User} alt="" />
                        Tài khoản
                    </Link>
                </>
            ),
            key: '0',
        },
        {
            label: (
                <>
                    <Link to="/user/order" className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1">
                        <img className="w-5 object-scale-down mr-5" src={Order} alt="" /> Đơn hàng
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

    return (
        <div className="w-full" id="navbar">
            <div className="w-full" id="navbar-top">
                <div className="w-full mx-auto container px-4 py-1.5 flex justify-between items-center">
                    <div className="topnav-left flex items-center gap-2 text-sm">
                        <Link className="wh-link" to="/provider/login">
                            Kênh Đối tác
                        </Link>
                        <div className="w-[1px] h-[14px] bg-wh-gray"></div>
                        <Link className="wh-link" to="/provider/register">
                            Trở thành Đối tác Washouse
                        </Link>
                    </div>
                    <div className="topnav-right flex items-center gap-2 text-sm">
                        <NotificationDropdown
                            child={
                                <div className="wh-link flex items-center gap-1 cursor-pointer text-sm">
                                    <FaRegBell /> Thông báo
                                </div>
                            }
                            showBadge={false}
                        />
                        <div className="w-[1px] h-[14px] bg-wh-gray"></div>
                        <OrderDropdown
                            child={
                                <div className="wh-link flex items-center gap-1 cursor-pointer">
                                    <BiSearch size={16} /> Tra cứu đơn hàng
                                </div>
                            }
                        ></OrderDropdown>
                    </div>
                </div>
            </div>
            {user && <ChatboxContainer user={user} />}
            <div className="mx-auto flex gap-8 justify-between items-center px-4 container w-full">
                <Link to={user ? '/trung-tam' : '/'}>
                    <div className="w-[200px] h-[75px]">
                        <img src={Logo} alt="logo" className="cursor-pointer" />
                    </div>
                </Link>
                <Selectbox
                    type="vị trí"
                    id="navbarsb"
                    options={districts.map((district): Option => {
                        return {
                            label: district.name,
                            value: district.id,
                        };
                    })}
                    onChange={handleDistrictChange}
                    selectedValue={district?.id}
                    className="max-h-[40px]"
                ></Selectbox>
                <div className="nav__searchbar w-[450px] h-[40px] grow justify-end hidden md:flex items-center">
                    <form className="md:flex" action="">
                        <input
                            type="text"
                            value={searchString ?? ''}
                            onChange={(e) => {
                                setSearchString(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                            className="w-full basis-full grow"
                            placeholder="Tìm kiếm"
                        />
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                            className="ml-2 px-2 w-[50px] text-sub flex justify-center items-center cursor-pointer"
                        >
                            <FaSearch size={24} />
                        </div>
                    </form>
                </div>
                <div className="nav__action--cart">
                    <Link to="/cart" className="text-sub">
                        <Badge size="small" color="red" count={cartQuantity}>
                            <FaShoppingCart size={26} />
                        </Badge>
                    </Link>
                </div>
                {user ? (
                    <>
                        <div className="user__navbar--action flex">
                            <div className="user__navbar--profile flex items-center font-medium">
                                <DropdownMenu
                                    items={items}
                                    content={
                                        <div className="flex items-center justify-center">
                                            <div className="user__navbar--avatar w-[50px] h-[50px] rounded-full overflow-hidden mr-3">
                                                <Link to="/user/account/profile">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={user.avatar ?? Placeholder}
                                                        alt=""
                                                    />
                                                </Link>
                                            </div>
                                            {user.name}
                                        </div>
                                    }
                                    className=""
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="guest__action flex gap-5">
                        <div className="guest__action--signup">
                            <Button type="primary" link="/register" size="small">
                                Đăng ký
                            </Button>
                        </div>
                        <div className="guest__action--login">
                            <Button type="sub" link="/login" size="small">
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
