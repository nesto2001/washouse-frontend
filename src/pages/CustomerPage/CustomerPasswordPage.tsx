import React from 'react';
import ChangePasswordContainer from '../../containers/CustomerContainer/ChangePasswordContainer';

type Props = {};

const CustomerPasswordPage = () => {
    return (
        <>
            <div className="userprofile w-full border border-wh-gray rounded-2xl mb-10">
                <div className="userprofile--header pt-4 pl-6 font-bold text-xl">Đổi mật khẩu</div>
                <hr className="mt-3 mb-8" />
                <div className="userprofile--content flex justify-between px-14 mb-16">
                    <div className="userprofile__update--form">
                        <ChangePasswordContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerPasswordPage;
