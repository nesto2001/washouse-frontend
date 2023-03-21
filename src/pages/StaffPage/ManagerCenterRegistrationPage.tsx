import React from 'react';
import CenterRegistrationContainer from '../../containers/ManagerContainer/CenterRegistrationContainer';

type Props = {};

const ManagerCenterRegistrationPage = () => {
    return (
        <div className="bg-white w-2/3 mx-auto rounded border border-wh-lightgray">
            <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Đăng ký trung tâm</div>
            <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                Đăng ký trở thành đối tác của Washouse và bắt đầu kinh doanh ngay
            </div>
            <div className="provider__page--content px-6 mt-6">
                <CenterRegistrationContainer />
            </div>
        </div>
    );
};

export default ManagerCenterRegistrationPage;
