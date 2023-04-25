import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../utils/FormatUtils';
import { CenterOrderPaymentModel } from '../../../models/Staff/CenterOrderPaymentModel';
import { Button, Popconfirm, message } from 'antd';

export type OrderPaymentInfo = {
    payment: CenterOrderPaymentModel;
    orderTotal: number;
    orderDeliveryPrice: number;
};

type Props = {
    orderStatus: string;
    orderPayment: OrderPaymentInfo;
    forceUpdate: () => void;
};

const CenterOrderDetailsPayment = ({ orderPayment, orderStatus, forceUpdate }: Props) => {
    const [openProceedPop, setOpenProceedPop] = useState(false);
    const [confirmProceedLoading, setConfirmProceedLoading] = useState(false);

    const showPopconfirm = () => {
        setOpenProceedPop(true);
    };

    const handleOk = () => {
        setConfirmProceedLoading(true);
        message.success('Cập nhật trạng thái thanh toán thành công');
        setConfirmProceedLoading(false);

        // if (orderPayment) {
        //     const proceed = async () => {
        //         return await proceedOrder(orderDetails.id);
        //     };
        //     proceed()
        //         .then((res) => {
        //             if (res.status === 200) {
        //                 message.success('Cập nhật tiến trình đơn hàng thành công!');
        //                 setOpenProceedPop(false);
        //                 setConfirmProceedLoading(false);
        //                 forceUpdate();
        //             }
        //         })
        //         .catch(() => {
        //             message.error('Xảy ra lỗi trong lúc cập nhật tiến trình đơn hàng');
        //             setConfirmProceedLoading(false);
        //         });
        // }
    };

    const handleCancel = () => {
        setOpenProceedPop(false);
    };

    return (
        <div
            className={`grid grid-cols-2 text-base items-baseline ${
                orderPayment.payment.status.toLowerCase() === 'paid' ? 'mb-6' : 'mb-3'
            }`}
        >
            <div className="font-medium">Tổng đơn hàng</div>
            <div className="text-right text-primary font-bold text-xl">
                {formatCurrency(orderPayment.orderTotal ?? 0)}
            </div>
            <div className="font-medium">Phí vận chuyển</div>
            <div className="text-right text-primary font-bold text-xl">
                {formatCurrency(orderPayment.orderDeliveryPrice ?? 0)}
            </div>
            <div className="font-medium">Phí nền tảng</div>
            <div className="text-right text-primary font-bold text-xl">
                {formatCurrency(orderPayment.payment.platformFee ?? 0)}
            </div>
            <div className="font-medium">Chiết khấu</div>
            <div className="text-right text-primary font-bold text-xl">
                - {formatCurrency((orderPayment.orderTotal ?? 0) * (orderPayment.payment.discount ?? 0))}
            </div>
            <hr className="col-span-2 my-3" />
            <div className="font-medium text-lg">Tổng thanh toán</div>
            <div className="text-right text-primary font-bold text-2xl">
                {formatCurrency(orderPayment.payment.total ?? 0)}
            </div>
            {orderPayment.payment.status.toLowerCase() === 'pending' && (
                <div className="center__orderpayment--footer flex justify-end my-3 mt-6 gap-4 col-span-2">
                    <Popconfirm
                        title="Thanh toán"
                        description="Xác nhận đơn hàng hoàn tất thanh toán?"
                        open={openProceedPop}
                        onConfirm={handleOk}
                        okButtonProps={{ loading: confirmProceedLoading }}
                        onCancel={handleCancel}
                        cancelButtonProps={{ style: { background: 'white' } }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" size="large" className="capitalize" onClick={showPopconfirm}>
                            Hoàn tất thanh toán
                        </Button>
                    </Popconfirm>
                </div>
            )}
        </div>
    );
};

export default CenterOrderDetailsPayment;
