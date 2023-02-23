import React from 'react';
import Navbar from './Header';
import Footer from './Footer';

import './DefaultLayout.scss';
type Props = {
    children?: JSX.Element;
};

function DefaultLayout({ children }: Props) {
    return (
        <>
            <Navbar></Navbar>
            <div className="main">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
