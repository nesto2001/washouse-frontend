import React from 'react';
import CreateServiceContainer from '../../../containers/ManagerContainer/CenterServicesContainer/CreateServiceContainer';

type Props = {};

const ManagerCreateServicePage = () => {
    return (
        <>
            <div className="bg-white w-1/2 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thêm dịch vụ</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">Thêm dịch vụ mới</div>
                <div className="provider__page--content px-6 my-8">
                    <div className="provider__services--wrapper">
                        <CreateServiceContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagerCreateServicePage;
