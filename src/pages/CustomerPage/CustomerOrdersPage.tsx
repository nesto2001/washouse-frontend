import React from 'react';
import CustomerOrdersContainer from '../../containers/CustomerContainer/CustomerOrdersContainer';

type Props = {};

const CustomerOrdersPage = () => {
    return (
        <>
            <div className="userorders w-full border border-wh-gray rounded-2xl mb-10">
                <div className="userorders--header pt-4 pl-6 font-bold text-xl">Đơn hàng</div>
                <hr className="mt-3 mb-3" />
                <div className="userorders--content flex justify-between mb-16">
                    <CustomerOrdersContainer />
                </div>
            </div>
        </>
    );
};

export default CustomerOrdersPage;
