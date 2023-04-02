import React from 'react';
import Navbar from '../../components/Header';
import Footer from '../../components/Footer';

import './DefaultLayout.scss';
type Props = {
    children?: JSX.Element;
};

function DefaultLayout({ children }: Props) {
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px]">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
