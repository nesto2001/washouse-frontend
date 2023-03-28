import React from 'react';
import AdminCenterListingContainer from '../../../containers/AdminContainer/AdminCenterListingContainer';

type Props = {};

const AdminCenterPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Trung tâm</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý các trung tâm có trong hệ thống
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <AdminCenterListingContainer />
                    </div>
                </div>
            </div>
            {/* <div className="bg-white basis-1/3 mx-auto rounded border border-wh-lightgray">
        <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Chi tiết</div>
        <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
            Quản lý các dịch vụ của trung tâm.
        </div>
        <div className="provider__page--content px-6 mt-6"></div>
    </div> */}
        </div>
    );
};

export default AdminCenterPage;
