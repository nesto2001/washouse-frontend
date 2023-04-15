import { Link, useNavigate } from 'react-router-dom';
import Laundromat from '../../assets/images/laundromat-2.png';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import { CustomerOrderModel } from '../../models/Customer/CustomerOrderModel';
import { formatCurrency, formatLink } from '../../utils/FormatUtils';
import WHButton from '../Button';
import CustomerOrderedService from './CustomerOrderedService';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';
import { Form, Input, List, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FeedbackOrderRequest } from '../../models/Feedback/FeedbackOrderRequest';
import { feedbackOrder } from '../../repositories/FeedbackRepository';

type Props = {
    customerOrders: CustomerOrderModel[];
    customerPhone: string;
};

const CustomerOrderList = ({ customerOrders, customerPhone }: Props) => {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();

    const submitForm = () => {
        form.submit();
    };

    const cancelFeedback = () => {
        Modal.destroyAll();
    };

    const handleFeedback = (orderedService: CenterOrderedServiceModel[], orderId: string, centerId: number) => {
        const onFinish = (values: any) => {
            console.log(values);
            const orderFeedback: FeedbackOrderRequest = {
                centerId: centerId,
                orderId: orderId,
                rating: values.orderRating,
                content: values.orderRatingContent ?? undefined,
            };
            feedbackOrder(orderFeedback).then((res) => {
                console.log(res);
            });
        };

        const config = {
            title: 'Đánh giá dịch vụ',
            width: 600,
            content: (
                <>
                    <div className="p-3 rounded border border-wh-gray font-medium">
                        <div className="font-normal mb-1">Dịch vụ đã đặt</div>
                        {orderedService.map(
                            (service, index) => service.name + (index < orderedService.length - 1 ? ', ' : ''),
                        )}
                    </div>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <div className="flex justify-center my-2">
                            <Form.Item name="orderRating" noStyle>
                                <Rate style={{ fontSize: 24 }} />
                            </Form.Item>
                        </div>
                        <div className="">
                            <Form.Item name="orderRatingContent" noStyle>
                                <TextArea placeholder="Chia sẻ cảm nghĩ của bạn" />
                            </Form.Item>
                        </div>
                        <div className="text-center mt-2">Các dịch vụ này có làm hài lòng bạn?</div>
                        <List
                            dataSource={orderedService}
                            renderItem={(item, index) => (
                                <Form.Item name="services" noStyle>
                                    <List.Item
                                        actions={[
                                            <Form.Item noStyle name={['services', index, 'rating']}>
                                                <Rate />
                                            </Form.Item>,
                                        ]}
                                    >
                                        <div className="flex w-full justify-between">
                                            <Form.Item noStyle name={['services', index, 'id']} initialValue={index}>
                                                {item.name}
                                            </Form.Item>
                                        </div>
                                    </List.Item>
                                </Form.Item>
                            )}
                        />
                    </Form>
                </>
            ),
            icon: ' ',
            okText: 'Gửi đánh giá',
            onOk: submitForm,
            onCancel: cancelFeedback,
            cancelText: 'Hủy',
            maskClosable: true,
            closable: true,
        };
        modal.confirm(config);
    };

    return (
        <>
            {contextHolder}
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
                            {order.status.toLowerCase() === 'completed' && !order.isFeedback && (
                                <WHButton
                                    type="sub"
                                    size="small"
                                    onClick={() => handleFeedback(order.orderedServices, order.id, order.centerId)}
                                >
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
        </>
    );
};

export default CustomerOrderList;
