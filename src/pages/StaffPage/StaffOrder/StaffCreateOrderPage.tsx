import React from 'react';
import CenterCreateOrderContainer from '../../../containers/StaffContainer/CenterCreateOrderContainer/CenterCreateOrderContainer';

type Props = {};

const StaffCreateOrderPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/5 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Tạo mới đơn hàng</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base"></div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <CenterCreateOrderContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCreateOrderPage;
