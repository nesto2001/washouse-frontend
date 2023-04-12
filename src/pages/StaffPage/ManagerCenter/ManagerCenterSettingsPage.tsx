import React from 'react';

type Props = {};

const ManagerCenterSettingsPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thiết lập</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Chỉnh sửa các thiết lập liên quan đến trung tâm
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper"></div>
                </div>
            </div>
        </div>
    );
};

export default ManagerCenterSettingsPage;
