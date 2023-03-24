import React from 'react';
import Footer from '../../Footer';
import Navbar from '../../Header';
import Sidebar from '../../Sidebar';

type Props = {
    children?: JSX.Element;
};

const SidebarLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px] flex">
                <div className="main__listing w-full flex mb-20">{children}</div>
            </div>
            <Footer />
        </>
    );
};

export default SidebarLayout;
