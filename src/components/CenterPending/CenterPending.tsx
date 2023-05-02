import React from 'react';
import CenterPendingImg from '../../assets/images/center-pending.png';

type Props = {};

const CenterPending = () => {
    return (
        <div className="md:min-h-[632px] md:min-w-[680px] flex justify-center items-center flex-grow">
            <div className="w-1/2">
                <img src={CenterPendingImg} alt="" />
                <div className="text-center text-2xl font-bold mt-10">Trung tâm đang trong trạng thái chờ duyệt</div>
                <div className="text-center text-lg text-sub-gray font-medium mt-1">
                    Vui lòng chờ quản trị viên duyệt trước khi thực hiện các thao tác
                </div>
            </div>
        </div>
    );
};

export default CenterPending;
