import React from 'react';

const AddressPage = () => {
    return (
        <div className="userprofile w-full border border-wh-gray rounded-2xl mb-10">
            <div className="userprofile--header pt-4 pl-6 font-bold text-xl">Hồ sơ của tôi</div>
            <hr className="mt-3 mb-8" />
            <div className="userprofile--content flex justify-between px-14 mb-16">
                <div className="userprofile__update--form">
                </div>
                <div className="mx-6 border border-wh-gray w-[1px]"></div>
                <div className="userprofile__update--avatar pl-10 pr-2">
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
