import React from 'react';
import CenterFinanceSettingsContainer from '../../../containers/StaffContainer/CenterFinanceContainer/CenterFinanceSettingsContainer';

type Props = {};


const ManagerFinanceSettingsPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thiết lập thanh toán</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Chỉnh sửa các thiết lập thanh toán của trung tâm
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <CenterFinanceSettingsContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerFinanceSettingsPage;
