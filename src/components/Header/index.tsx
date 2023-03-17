import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DistrictType } from '../../types/DistrictType';
import { getDistricts, getUserDistrict } from '../../repositories/LocationRepository';
import { Option } from '../../types/Options';
import { getCurrentLocation } from '../../utils/CommonUtils';
import { FaAngleDown, FaSearch, FaShoppingCart } from 'react-icons/fa';
import Selectbox from '../Selectbox';
import Button from '../Button';
import Logo from '../../assets/images/washouse-tagline.png';
import Placeholder from '../../assets/images/placeholder.png';
import './Navbar.scss';

const Navbar = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [district, setDistrict] = useState<DistrictType>();
    const [searchValue, setSearchValue] = useState('');
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const [user, setUser] = useState(true);

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
        if (latitude && longitude) {
            console.log(latitude, longitude);
            const fetchData = async () => {
                return await getUserDistrict({ lat: latitude, long: longitude });
            };
            fetchData().then((res) => {
                setDistrict({ id: res.id, name: res.name });
                console.log(district);
            });
        }
    }, [latitude, longitude]);

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const label = districts.find((option) => option.id === value)?.name;
        if (label) {
            const newDistrict = { id: value, name: label };
            setDistrict(newDistrict);
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
                            <div className="user__navbar--profile flex items-center">
                                <div className="user__navbar--avatar w-[50px] h-[50px] rounded-full overflow-hidden">
                                    <img className="h-full w-full object-cover" src={Placeholder} alt="" />
                                </div>
                                <div className="user__navbar--name font-bold ml-3 mr-2">Trần Tân Long</div>
                                <FaAngleDown />
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
