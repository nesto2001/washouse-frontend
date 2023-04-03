import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationModel } from '../../models/LocationModel';
import { getDistricts, getUserDistrict } from '../../repositories/LocationRepository';
import { Option } from '../../types/Options';
import { getCurrentLocation } from '../../utils/CommonUtils';
import { Badge, MenuProps } from 'antd';
import { FaChessKing, FaRegBell, FaSearch, FaShoppingCart } from 'react-icons/fa';
import Selectbox from '../Selectbox';
import Button from '../Button';
import Logo from '../../assets/images/washouse-tagline.png';
import User from '../../assets/images/user-pf.png';
import Order from '../../assets/images/order-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import DropdownMenu from '../Dropdown/DropdownMenu';
import './Navbar.scss';
import { BiPowerOff, BiSearch } from 'react-icons/bi';
import { getMe } from '../../repositories/AuthRepository';
import { UserModel } from '../../models/User/UserModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/CartStore';
import { reloadCart } from '../../reducers/CartReducer';

const Navbar = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const districtJson = sessionStorage.getItem('userDistrict');
    const [district, setDistrict] = useState<LocationModel | null>(districtJson ? JSON.parse(districtJson) : null);
    const [searchValue, setSearchValue] = useState('');
    const [districts, setDistricts] = useState<LocationModel[]>([]);
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel>(userJson ? JSON.parse(userJson) : null);
    const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (searchValue) {
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reloadCart());
        getCurrentLocation(setState, locationError);
    }, []);

    const locationError = (error: any) => {
        console.log(`Gặp lỗi khi lấy vị trí hoặc quyền sử dụng vị trí chưa được cấp: ${error.message}`);
    };

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setLatitude(latitude);
        setLongitude(longitude);
    };
    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) setUser(JSON.parse(userJson));
    }, []);

    useEffect(() => {
        const userDistrictJson = sessionStorage.getItem('userDistrict');
        const userDistrict: LocationModel = userDistrictJson ? JSON.parse(userDistrictJson) : null;
        if (userDistrict) {
            setDistrict(userDistrict);
        } else {
            if (latitude && longitude) {
                console.log(latitude, longitude);
                const fetchData = async () => {
                    return await getUserDistrict({ lat: latitude, long: longitude });
                };
                fetchData().then((res) => {
                    setDistrict({ id: res.id, name: res.name });
                    sessionStorage.setItem('userDistrict', JSON.stringify(res));
                    console.log(district);
                });
            }
        }
    }, [latitude, longitude]);

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const label = districts.find((option) => option.id === value)?.name;
        console.log(value, 'change');
        if (label) {
            const newDistrict = { id: value, name: label };
            setDistrict(newDistrict);
            sessionStorage.setItem('userDistrict', JSON.stringify(newDistrict));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistricts(res);
        });
    }, []);

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
                            localStorage.removeItem('currentUser');
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
                        <div className="wh-link flex items-center gap-1 cursor-pointer">
                            <FaRegBell /> Thông báo
                        </div>
                        <div className="w-[1px] h-[14px] bg-wh-gray"></div>
                        <div className="wh-link flex items-center gap-1 cursor-pointer">
                            <BiSearch size={16} /> Tra cứu đơn hàng
                        </div>
                        {/* <div className="w-[1px] h-[14px] bg-wh-gray"></div>
                        <Link className="wh-link" to="/provider/login">
                            Tải ứng dụng
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className="mx-auto flex gap-8 justify-between items-center px-4 container w-full">
                <Link to={user ? '/trung-tâm' : '/'}>
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
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full basis-full grow"
                            placeholder="Tìm kiếm"
                        />
                        <button onClick={handleSearch} className="ml-2 px-2 w-[50px] text-sub bg-transparent">
                            <FaSearch size={24} />
                        </button>
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
                                <div className="user__navbar--avatar w-[50px] h-[50px] rounded-full overflow-hidden mr-3">
                                    <Link to="/user/account/profile">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={user.avatar ?? Placeholder}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <DropdownMenu items={items} menuText={user.name} className="" />
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
