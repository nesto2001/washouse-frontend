import React from 'react';
import { formatCurrency } from '../../../utils/FormatUtils';

export type OrderPayment = {
    paymentTotal: number;
    platformFee: number;
    dateIssue: string | null;
    status: string;
    paymentMethod: number;
    promoCode: string | null;
    discount: number | null;
    createdDate: string | null;
    updatedDate: string | null;
};

type Props = {
    orderTotal: number;
    orderPayment: OrderPayment;
};

const CenterOrderDetailsPayment = ({ orderPayment, orderTotal }: Props) => {
    return (
        <div className="grid grid-cols-2 text-base items-baseline mb-6">
            <div className="font-medium">Tổng đơn hàng</div>
            <div className="text-right text-primary font-bold text-xl">{formatCurrency(orderTotal)}</div>
            <div className="font-medium">Phí vận chuyển</div>
            <div className="text-right text-primary font-bold text-xl">{formatCurrency(0)}</div>
            <div className="font-medium">Phí nền tảng</div>
            <div className="text-right text-primary font-bold text-xl">{formatCurrency(orderPayment.platformFee)}</div>
            <div className="font-medium">Chiết khấu</div>
            <div className="text-right text-primary font-bold text-xl">
                {formatCurrency(orderPayment.discount ?? 0)}
            </div>
            <hr className="col-span-2 my-3" />
            <div className="font-medium text-lg">Tổng thanh toán</div>
            <div className="text-right text-primary font-bold text-2xl">
                {formatCurrency(orderPayment.paymentTotal)}
            </div>
        </div>
    );
};

export default CenterOrderDetailsPayment;
