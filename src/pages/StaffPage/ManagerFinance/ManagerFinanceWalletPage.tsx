import React from 'react';
import CenterFinanceWalletContainer from '../../../containers/StaffContainer/CenterFinanceContainer/CenterFinanceWalletContainer';

type Props = {};

const ManagerFinanceWalletPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Tổng quan ví</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base"></div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <CenterFinanceWalletContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerFinanceWalletPage;
