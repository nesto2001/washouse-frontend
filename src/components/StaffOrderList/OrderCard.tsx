import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import { formatCurrency, formatPercentage } from '../../utils/FormatUtils';
import OrderListItem from './OrderListItem';

import { Popconfirm, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import { BadgeStatusMap } from '../../mapping/BadgeStatusMap';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import CouponTag from '../CouponTag/CouponTag';
import './OrderList.scss';

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
                    {order.discount > 0 ? (
                        <CouponTag content={`Giảm ${formatPercentage(order.discount)}`} />
                    ) : (
                        'Không có'
                    )}
                </div>
                <div className="order__item--payment mx-1 text-base font-bold w-[100px]">
                    {formatCurrency(order.totalPayment)}
                </div>{' '}
                {/* insert tooltip here */}
                <div className="order__item--date text-base mx-1 w-[100px]">{order.orderedDate}</div>
                <div className="order__item--status text-base mx-1 w-[88px]">
                    <Tag color={BadgeStatusMap[order.status.toLowerCase()]}>{OrderStatusMap[order.status]}</Tag>
                </div>
                <div className="order__item--status text-base mx-1 w-[200px] flex gap-4">
                    <div className="font-medium text-primary">
                        <Link to={`/provider/orders/${order.id}`}>Xem chi tiết</Link>
                    </div>
                    {order.status.toLowerCase() === 'pending' ||
                        (order.status.toLowerCase() === 'confirmed' && (
                            <Popconfirm
                                title="Hủy đơn hàng"
                                cancelButtonProps={{ style: { background: 'white' } }}
                                description={
                                    <>
                                        <div className="mb-3">Bạn có chắc chắn muốn hủy đơn hàng này?</div>
                                        <TextArea
                                            className="max-h-[80px]"
                                            name="cancelNote"
                                            maxLength={100}
                                            placeholder="Nhập lí do hủy đơn"
                                            required
                                        />
                                    </>
                                }
                                okText="Yes"
                                cancelText="No"
                            >
                                <div className="font-medium text-red" onClick={() => {}}>
                                    Hủy
                                </div>
                            </Popconfirm>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
