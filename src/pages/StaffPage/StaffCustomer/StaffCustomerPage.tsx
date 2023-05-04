import React from 'react';
import CustomerListingContainer from '../../../containers/StaffContainer/CenterCustomerContainer/CustomerListingContainer';

type Props = {};

const StaffCustomerPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-9/12 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Khách hàng</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Thông tin khách hàng của trung tâm
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <CustomerListingContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCustomerPage;
