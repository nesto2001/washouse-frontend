import { Link, useNavigate } from 'react-router-dom';
import Laundromat from '../../assets/images/laundromat-2.png';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import { CustomerOrderModel } from '../../models/Customer/CustomerOrderModel';
import { formatCurrency, formatLink } from '../../utils/FormatUtils';
import WHButton from '../Button';
import CustomerOrderedService from './CustomerOrderedService';

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
                    <div
                        className="customer__order--details px-4 py-3 overflow-hidden"
                        onClick={() => navigate(`/orders/details?id=${order.id}&p=${customerPhone}`)}
                    >
                        <CustomerOrderedService orderedServices={order.orderedServices} />
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
                    <div
                        className={`customer__order--action flex gap-3 justify-end ${
                            order.status.toLowerCase() === 'completed' && 'pr-4 my-6'
                        }`}
                    >
                        {/* <WHButton type="sub" size="small">
                            Liên hệ trung tâm
                        </WHButton> */}
                        {order.status.toLowerCase() === 'completed' && (
                            <WHButton type="sub" size="small">
                                Đánh giá
                            </WHButton>
                        )}
                        {/* <WHButton type="primary" size="small">
                            Đặt lại
                        </WHButton> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerOrderList;
