import React from 'react';
import Navbar from './Header/Navbar';

import './DefaultLayout.scss';
type Props = {
    children?: JSX.Element;
};

function DefaultLayout({ children }: Props) {
    return (
        <>
            <Navbar></Navbar>
            <div>{children}</div>
        </>
    );
}

export default DefaultLayout;
