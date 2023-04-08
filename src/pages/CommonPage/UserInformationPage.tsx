import React from 'react';
import UserInformationContainer from '../../containers/CommonContainer/UserInformationContainer';

type Props = {};

const UserInformationPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Bổ sung thông tin</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Bổ sung thêm một số thông tin để tiếp tục
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <UserInformationContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformationPage;
