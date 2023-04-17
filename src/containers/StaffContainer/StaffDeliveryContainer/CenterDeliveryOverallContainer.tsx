import * as React from 'react';
import { useState, useEffect } from 'react';

import CenterDeliveryContainer from './CenterDeliveryContainer';
import CenterDeliveryOrderContainer from './CenterDeliveryOrderContainer';
import { CenterOrderDetailsModel } from '../../../models/Staff/CenterOrderDetailsModel';
import { getManagerCenterOrderDetails } from '../../../repositories/StaffRepository';
import { CloseOutlined } from '@ant-design/icons';

type Props = {};

const CenterDeliveryOverallContainer = (props: Props) => {
    const [selectedOrder, setSelectedOrder] = useState<string>();
    const [selectedOrderDetails, setSelectedOrderDetails] = useState<CenterOrderDetailsModel>();
    const [openPanel, setOpenPanel] = useState(false);

    useEffect(() => {
        if (selectedOrder) {
            getManagerCenterOrderDetails(selectedOrder).then((res) => {
                setSelectedOrderDetails(res);
                setOpenPanel(true);
            });
        } else {
            setSelectedOrderDetails(undefined);
            setOpenPanel(false);
        }
    }, [selectedOrder]);

    const handleCloseDetails = () => {
        setSelectedOrder(undefined);
    };

    return (
        <>
            <div className="bg-white mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Vận chuyển</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý vận chuyển các đơn hàng
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <CenterDeliveryContainer
                            setSelectedOrder={setSelectedOrder}
                            selectedOrder={selectedOrder}
                            openPanel={openPanel}
                        />
                    </div>
                </div>
            </div>
            {
                <div
                    className={`relative ${
                        openPanel ? 'w-[2100px] opacity-100' : 'w-0 opacity-0'
                    } transition-all ease-out duration-[500] max-w-[1070px] `}
                >
                    {selectedOrderDetails && (
                        <div className="bg-white mx-autorounded border border-wh-lightgray sticky top-6">
                            <div className="flex justify-between pt-4 px-6">
                                <div className="provider__page--title  font-semibold text-2xl">
                                    Thông tin vận chuyển
                                </div>
                                <div
                                    className="provider__page--closebtn cursor-pointer"
                                    onClick={() => setSelectedOrder(undefined)}
                                >
                                    <CloseOutlined />
                                </div>
                            </div>
                            <div className="provider__page--content mt-2 px-6">
                                <CenterDeliveryOrderContainer orderDetails={selectedOrderDetails} />
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default CenterDeliveryOverallContainer;
