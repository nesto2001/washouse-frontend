import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import OrderDetailsContainer from '../../containers/OrderContainer/OrderDetailsContainer';

type Props = {};

const OrderDetailsPage = () => {
    return (
        <>
            <Breadcrumb />
            <OrderDetailsContainer/>
        </>
    );
};

export default OrderDetailsPage;
