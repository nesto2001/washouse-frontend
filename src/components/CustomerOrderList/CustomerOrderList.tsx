import React from 'react';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import { formatCurrency, formatLink, formatPercentage } from '../../utils/FormatUtils';
import { CustomerOrderModel } from '../../models/Customer/CustomerOrderModel';
import { Link, useNavigate } from 'react-router-dom';
import Laundromat from '../../assets/images/laundromat-2.png';

type Props = {
    customerOrders: CustomerOrderModel[];
    customerPhone: string;
};

const CustomerOrderList = ({ customerOrders, customerPhone }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="w-full px-6">
            {customerOrders.map((order, index) => (
                <div
                    key={`order-${index}-${order.id}`}
                    className="customer__order--item w-full mb-6 border border-wh-gray rounded-lg"
                    onClick={() => navigate(`/orders/details?id=${order.id}&p=${customerPhone}`)}
                >
                    <div className="customer__order--center flex justify-between px-4 py-3 border-b border-wh-gray">
                        <div className="">
                            <Link
                                to={`/trung-tam/${formatLink(order.centerName)}-c.${order.centerId}`}
                                className="flex items-center gap-2"
                            >
                                <img src={Laundromat} alt="" className="w-5 h-5 inline" />
                                <span className="font-bold">{order.centerName}</span>
                            </Link>
                        </div>
                        <div className="customer__order--state flex justify-between gap-2 items-center">
                            <div className="">{order.orderedDate}</div>
                            <div className="w-[1.5px] h-5 bg-wh-gray"></div>
                            <div className="text-base font-medium text-primary">{OrderStatusMap[order.status]}</div>
                        </div>
                    </div>
                    <div className="customer__order--details px-4 py-3">
                        {order.orderedServices.map((ord, index) => (
                            <div
                                key={`details-${index}-${ord.id}`}
                                className="ordered__service--item flex justify-between py-2 border-b border-wh-gray last-of-type:border-none"
                            >
                                <div className="ordered__service--thumb h-[100px] w-[120px] rounded-xl overflow-hidden">
                                    <img className="w-full h-full object-cover" src={ord.image} alt="" />
                                </div>
                                <div className="ordered__service--content flex flex-grow flex-col ml-3 justify-between py-2">
                                    <div className="ordered__service--info">
                                        <div className="ordered__service--name text-base font-bold">{ord.name}</div>
                                        <div className="ordered__service--category text-sm font-medium text-sub-gray">
                                            Phân loại: {ord.category}
                                        </div>
                                    </div>
                                    <div className="ordered__service--note flex-grow mt-2">
                                        Ghi chú: {ord.customerNote ?? 'không có'}
                                    </div>
                                </div>
                                <div className="ordered__service--measurement w-[200px] self-center">
                                    {ord.measurement} {ord.unit}
                                </div>
                                <div className="ordered__service--price w-[200px] text-right self-center font-bold text-xl">
                                    {formatCurrency(ord.price ?? 0)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="mb-3 border-wh-gray" />
                    <div className="customer__order--total w-full grid grid-cols-4 text-right pr-4 gap-y-2 mb-3 items-baseline">
                        <div className="col-span-3">Tổng tiền</div>
                        <div className="col-span-1 font-bold text-primary text-xl">
                            {formatCurrency(order.totalValue)}
                        </div>
                        {/* <div className="col-span-3">Chiết khấu</div>
                        <div className="col-span-1 font-medium text-lg">{formatPercentage(order.discount)}</div>
                        <div className="col-span-3">Tổng đơn hàng</div>
                        <div className="col-span-1 font-bold text-primary text-xl">
                            {formatCurrency(order.totalPayment)}
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerOrderList;
