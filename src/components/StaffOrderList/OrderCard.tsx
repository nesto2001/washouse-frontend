import * as React from 'react';
import { useState, useEffect } from 'react';

import OrderListItem from './OrderListItem';
import { formatCurrency, formatPercentage } from '../../utils/FormatUtils';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';

import './OrderList.scss';
import CouponTag from '../CouponTag/CouponTag';
import { OrderStatusEnum } from '../../types/enum/OrderStatusEnum';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';

type Props = {
    order: CenterOrderModel;
};

const OrderCard = ({ order }: Props) => {
    return (
        <div key={order.id} className="order__item flex flex-col mb-6 border border-wh-gray rounded-lg overflow-hidden">
            <div className="order__item--id w-full text-left py-2 bg-primary text-white font-bold pl-4">
                Mã đơn hàng: {order.id}
            </div>
            <div className="order__item--content flex justify-between pt-3">
                <div className="order__item--services w-[400px] pl-4">
                    <OrderListItem orderedService={order.orderedServices} />
                </div>
                <div className="order__item--value mx-1 text-base font-bold w-[110px]">
                    {formatCurrency(order.totalValue)}
                </div>
                <div className="order__item--discount mx-1 text-base w-[86px]">
                    {order.discount > 0 ? <CouponTag discountValue={formatPercentage(order.discount)} /> : 'Không có'}
                </div>
                <div className="order__item--payment mx-1 text-base font-bold w-[100px]">
                    {formatCurrency(order.totalPayment)}
                </div>{' '}
                {/* insert tooltip here */}
                <div className="order__item--date text-base mx-1 w-[100px]">{order.orderedDate}</div>
                <div className="order__item--status text-base mx-1 w-[88px]">{OrderStatusMap[order.status]}</div>
                <div className="order__item--status text-base mx-1 w-[200px] flex gap-4">
                    <div className="font-medium text-primary">Xem chi tiết</div>
                    {order.status.toLowerCase() === 'pending' && <div className="font-medium text-red">Hủy</div>}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
