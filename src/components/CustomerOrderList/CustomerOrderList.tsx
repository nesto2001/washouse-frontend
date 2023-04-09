import React from 'react';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import { formatCurrency } from '../../utils/FormatUtils';

type Props = {
    customerOrders: CenterOrderModel[];
};

const CustomerOrderList = ({ customerOrders }: Props) => {
    return (
        <div className="w-full px-6">
            {customerOrders.map((order) => (
                <div key={order.id} className="customer__order--item w-full mb-6 border border-wh-gray rounded-lg">
                    <div className="customer__order--center flex justify-between px-4 py-3">
                        <div className="">Giặt ủi Dr. Clean</div>
                        <div className="customer__order--state flex justify-between gap-2 items-center">
                            <div className="">{order.orderedDate}</div>
                            <div className="w-[1.5px] h-5 bg-wh-gray"></div>
                            <div className="text-base font-medium text-primary">{OrderStatusMap[order.status]}</div>
                        </div>
                    </div>
                    {order.orderedServices.map((ord) => (
                        <div key={ord.id} className="ordered__service--item flex justify-between">
                            <div className="ordered__service--thumb h-[80px] w-[100px]">
                                <img className="w-full h-full object-cover" src={ord.image} alt="" />
                            </div>
                            <div className="ordered__service--content flex flex-grow flex-col">
                                <div className="ordered__service--name">{ord.name}</div>
                                <div className="ordered__service--category">Phân loại: {ord.category}</div>
                                <div className="ordered__service--note">Ghi chú: {ord.customerNote ?? 'không có'}</div>
                            </div>
                            <div className="ordered__service--measurement">
                                {ord.measurement} {ord.unit}
                            </div>
                            <div className="ordered__service--price">{formatCurrency(ord.price ?? 0)}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CustomerOrderList;
