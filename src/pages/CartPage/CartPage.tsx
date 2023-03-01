import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CartContainer from '../../containers/CartContainer/CartContainer';

type Props = {};

const CartPage = () => {
    return (
        <>
            <Breadcrumb />
            <CartContainer />
        </>
    );
};

export default CartPage;
