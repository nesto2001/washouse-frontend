import * as React from 'react';
import { useState, useEffect } from 'react';

import OrderListItem from './OrderListItem';
import { formatCurrency } from '../../utils/FormatUtils';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';

import './OrderList.scss';

type Props = {
    order: CenterOrderModel;
};

const OrderCard = ({ order }: Props) => {
    return (
        <div key={order.id} className="order__item flex flex-col mb-6 border border-wh-gray rounded-xl overflow-hidden">
            <div className="order__item--id w-full text-right py-1 bg-wh-lightgray pr-6">Mã đơn hàng: {order.id}</div>
            <div className="order__item--content flex pt-3">
                <div className="order__item--services w-[400px] pl-4">
                    <OrderListItem orderedService={order.orderedServices} />
                </div>
                <div className="order__item--value mx-1">{formatCurrency(order.totalValue)}</div>
                <div className="order__item--payment mx-1">{formatCurrency(order.totalPayment)}</div>{' '}
                {/* insert tooltip here */}
                <div className="order__item--discount mx-1">{order.discount}</div>
                <div className="order__item--date mx-1">{order.orderedDate}</div>
                <div className="order__item--status mx-1">{order.status}</div>
            </div>
        </div>
    );
};

export default OrderCard;
