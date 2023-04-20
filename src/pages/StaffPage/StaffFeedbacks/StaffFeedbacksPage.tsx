import React from 'react';
import CenterFeedbackContainer from '../../../containers/StaffContainer/CenterFeedbackContainer/CenterFeedbackContainer';
type Props = {};

const StaffFeedbacksPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Đánh giá</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Xem các đánh giá về chất lượng dịch vụ và mức độ hài lòng của khách hàng
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <CenterFeedbackContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffFeedbacksPage;
