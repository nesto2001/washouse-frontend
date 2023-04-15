import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Header';
import UserSidebar from '../../components/Sidebar/UserSidebar';

type Props = {
    children?: JSX.Element;
};

const CustomerSidebarLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px] container mx-auto px-4 max-w-[1240px] mb-10">
                <div className="userpage__wrapper flex justify-between gap-[40px]">
                    <UserSidebar basis="basis-1/4" />
                    <div className="userpage__main text-left basis-3/4 mt-16">{children}</div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerSidebarLayout;
