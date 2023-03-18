import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DistrictType } from '../../types/DistrictType';
import { getDistricts, getUserDistrict } from '../../repositories/LocationRepository';
import { Option } from '../../types/Options';
import { getCurrentLocation } from '../../utils/CommonUtils';
import { MenuProps } from 'antd';
import { FaChessKing, FaSearch, FaShoppingCart } from 'react-icons/fa';
import Selectbox from '../Selectbox';
import Button from '../Button';
import Logo from '../../assets/images/washouse-tagline.png';
import User from '../../assets/images/user-pf.png';
import Order from '../../assets/images/order-pf.png';
import Placeholder from '../../assets/images/placeholder.png';
import DropdownMenu from '../Dropdown/DropdownMenu';
import './Navbar.scss';
import { BiPowerOff } from 'react-icons/bi';
import { getMe } from '../../repositories/AuthRepository';
import { UserModel } from '../../models/User/UserModel';

const Navbar = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const districtJson = localStorage.getItem('userDistrict');
    const [district, setDistrict] = useState<DistrictType | null>(districtJson ? JSON.parse(districtJson) : null);
    const [searchValue, setSearchValue] = useState('');
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel>(userJson ? JSON.parse(userJson) : null);
    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (searchValue) {
        }
    };

    useEffect(() => {
        getCurrentLocation(setState);
    }, []);

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setLatitude(latitude);
        setLongitude(longitude);
    };
    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) setUser(JSON.parse(userJson));
    }, []);

    useEffect(() => {
        const userDistrictJson = localStorage.getItem('userDistrict');
        const userDistrict: DistrictType = userDistrictJson ? JSON.parse(userDistrictJson) : null;
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
                    localStorage.setItem('userDistrict', JSON.stringify(res));
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
            localStorage.setItem('userDistrict', JSON.stringify(newDistrict));
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
                    <Link to="user/account/profile" className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1">
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
                    <Link to="user/order" className="navbar__dropdown--item flex text-sm py-3 px-2 pl-1">
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
                        to="/login"
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
            <div className="mx-auto flex gap-8 justify-between items-center px-4 py-4 container w-full">
                <Link to={user ? '/centers' : '/'}>
                    <div className="w-[221px] h-[75px]">
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
                ></Selectbox>
                <div className="nav__searchbar w-[450px] h-[55px] grow justify-end hidden md:flex items-center">
                    <form className="md:flex" action="">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full basis-full grow"
                            placeholder="Tìm kiếm"
                        />
                        <button onClick={handleSearch} className="ml-2 px-2 w-[50px] text-sub ">
                            <FaSearch size={30} />
                        </button>
                    </form>
                </div>
                <div className="nav__action--cart">
                    <Link to="/cart" className="text-sub">
                        <FaShoppingCart size={28} />
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
                            <Button type="primary" link="/register">
                                Đăng ký
                            </Button>
                        </div>
                        <div className="guest__action--login">
                            <Button type="sub" link="/login">
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
