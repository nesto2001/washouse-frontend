import React from 'react';
import CenterGalleryContainer from '../../../containers/ManagerContainer/CenterProfileManager/CenterGalleryContainer';

type Props = {};

const ManagerCenterGalleryPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Hình ảnh trung tâm</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Thêm các hình ảnh thực tế của trung tâm có thể giúp tăng doanh số một cách hiệu quả!
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <CenterGalleryContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerCenterGalleryPage;
