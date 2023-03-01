import React, { useEffect, useState, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';

import Selectbox from '../Selectbox';
import Button from '../Button';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import Logo from '../../assets/images/washouse-tagline.png';
import './Navbar.scss';
import { LocationContextValue } from '../../types/LocationContext';

export const LocationContext = createContext<LocationContextValue>({
    district: '',
    handleDistrictChange: () => {},
});

const Navbar = () => {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [district, setDistrict] = useState<string>('');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (searchValue) {
        }
    };

    const districtUser = [
        {
            value: 1,
            label: district,
        },
    ];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(`Gặp lỗi khi lấy vị trí: ${error.message}`);
                },
            );
        } else {
            console.error('Geolocation không được hỗ trợ trên trình duyệt này.');
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=295e5cdc8a0d4db8afa13b83067c5d05`,
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        const components = data.results[0].components;
                        setDistrict(components.city_district);
                    }
                })
                .catch((error) => console.error(`Lỗi khi cố gắng truy xuất Quận / huyện: ${error.message}`));
        }
    }, [latitude, longitude]);
    const handleDistrictChange = (newDistrict: string) => {
        setDistrict(newDistrict);
    };
    return (
        <LocationContext.Provider value={{ district, handleDistrictChange }}>
            <div className="w-full" id="navbar">
                <div className="mx-auto flex gap-8 justify-between items-center px-4 py-4 container w-full">
                    <Link to="/">
                        <div className="w-[221px] h-[75px]">
                            <img src={Logo} alt="logo" className="cursor-pointer" />
                        </div>
                    </Link>
                    <Selectbox id="navbarsb" options={districtUser}></Selectbox>
                    <div className="nav__searchbar w-[450px] h-[55px] grow justify-end hidden md:flex items-center">
                        <form className="md:flex" action="">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full basis-full grow"
                                placeholder="Tìm kiếm"
                            />
                            <button onClick={handleSearch} className="ml-2 px-2 w-[50px]">
                                <FaSearch size={30} />
                            </button>
                        </form>
                    </div>
                    <div className="nav__action--cart">
                        <Link to="/cart">
                            <FaShoppingCart size={28} />
                        </Link>
                    </div>
                    <div className="guest__action flex gap-5">
                        <div className="guest__action--signup">
                            <Button type="primary">Đăng ký</Button>
                        </div>
                        <div className="guest__action--login">
                            <Button type="sub">Đăng nhập</Button>
                        </div>
                    </div>
                </div>
            </div>
        </LocationContext.Provider>
    );
};

export default Navbar;
