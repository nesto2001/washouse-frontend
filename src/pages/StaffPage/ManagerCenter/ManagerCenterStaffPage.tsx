import React from 'react';
import CenterStaffListingContainer from '../../../containers/ManagerContainer/CenterStaffContainer/CenterStaffListingContainer';

type Props = {};

const ManagerCenterStaffPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Nhân viên</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý nhân viên của trung tâm
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <CenterStaffListingContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerCenterStaffPage;
