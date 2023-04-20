import React from 'react';
import { formatCurrency } from '../../../utils/FormatUtils';
import { CenterOrderPaymentModel } from '../../../models/Staff/CenterOrderPaymentModel';

export type OrderPaymentInfo = {
    payment: CenterOrderPaymentModel;
    orderTotal: number;
    orderDeliveryPrice: number;
};

type Props = {
    orderPayment: OrderPaymentInfo;
};

const CenterOrderDetailsPayment = ({ orderPayment }: Props) => {
    return (
        <div className="grid grid-cols-2 text-base items-baseline mb-6">
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
        </div>
    );
};

export default CenterOrderDetailsPayment;
