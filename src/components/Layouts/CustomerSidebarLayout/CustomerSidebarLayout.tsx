import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Footer';
import Navbar from '../../Header';
import UserSidebar from '../../Sidebar/UserSidebar';

type Props = {
    children?: JSX.Element;
};

const CustomerSidebarLayout = ({ children }: Props) => {
    const location = useLocation();
    const [activeNav, setActiveNav] = useState('');

    useEffect(() => {
        const pathname = location.pathname;
        const pathArr = pathname.split('/').filter((path) => path !== '');
        setActiveNav(pathArr[pathArr.length - 1]);
    }, [location]);
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px] container mx-auto px-4 max-w-[1240px]">
                <div className="userpage__wrapper flex justify-between gap-[40px]">
                    <UserSidebar basis="basis-1/4" activeNav={activeNav} />
                    <div className="userpage__main text-left basis-3/4 mt-16">{children}</div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerSidebarLayout;
