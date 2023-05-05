import { Button, Col, Modal, Row, Tag, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import StarFull from '../../../components/Star/StarFull';
import { PaymentBadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { PaymentStatusMap } from '../../../mapping/OrderStatusMap';
import { CenterOrderDetailsModel } from '../../../models/Staff/CenterOrderDetailsModel';
import { getManagerCenterOrderDetails, proceedOrder } from '../../../repositories/StaffRepository';
import CenterOrderDetailsDelivery from './CenterOrderDetailsDelivery';
import CenterOrderDetailsGeneral from './CenterOrderDetailsGeneral';
import CenterOrderDetailsPayment from './CenterOrderDetailsPayment';
import CenterOrderDetailsTracking from './CenterOrderDetailsTracking';
import CenterOrderedDetailsContainer from './CenterOrderedDetailsContainer';
import { BsReplyFill } from 'react-icons/bs';
import TextArea from 'antd/es/input/TextArea';
import { replyFeedback } from '../../../repositories/FeedbackRepository';

type Props = {};

const CenterOrderDetailsContainer = (props: Props) => {
    const [orderDetails, setOrderDetails] = useState<CenterOrderDetailsModel>();
    const [openProceedPop, setOpenProceedPop] = useState(false);
    const [confirmProceedLoading, setConfirmProceedLoading] = useState(false);
    const [modalReplyFeedback, setModalReplyFeedback] = useState(false);
    const [replyMsg, setReplyMsg] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const { orderId } = useParams();
    useEffect(() => {
        setIsLoading(true);
        if (orderId) {
            getManagerCenterOrderDetails(orderId)
                .then((res) => {
                    setOrderDetails(res);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [orderId, state]);

    const showPopconfirm = () => {
        if (orderDetails?.status === 'completed') {
            message.error('Đơn hàng đã hoàn tất, không thể cập nhật tiến trình thêm');
            return;
        }
        setOpenProceedPop(true);
    };

    const handleOk = () => {
        setConfirmProceedLoading(true);
        if (orderDetails) {
            const proceed = async () => {
                return await proceedOrder(orderDetails.id);
            };
            proceed()
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Cập nhật tiến trình đơn hàng thành công!');
                        setOpenProceedPop(false);
                        setConfirmProceedLoading(false);
                        forceUpdate();
                    }
                })
                .catch(() => {
                    message.error('Xảy ra lỗi trong lúc cập nhật tiến trình đơn hàng');
                    setConfirmProceedLoading(false);
                });
        }
    };

    const handleCancel = () => {
        setOpenProceedPop(false);
    };

    if (isLoading) {
        return <OthersSpin />;
    }

    if (!orderDetails) {
        return <OthersSpin />;
    }

    return (
        <>
            <div className=" basis-3/4 mx-auto">
                <div className="order__customer w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thông tin đơn hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper mb-4">
                            <CenterOrderDetailsGeneral
                                forceUpdate={forceUpdate}
                                confirmProceedLoading={confirmProceedLoading}
                                openProceedPop={openProceedPop}
                                handleCancel={handleCancel}
                                handleOk={handleOk}
                                showPopconfirm={showPopconfirm}
                                orderInfo={{
                                    id: orderDetails.id,
                                    customerName: orderDetails.customerName,
                                    customerEmail: orderDetails.customerEmail,
                                    customerMessage: orderDetails.customerMessage,
                                    customerMobile: orderDetails.customerMobile,
                                    customerOrdered: orderDetails.customerOrdered,
                                    locationId: orderDetails.locationId,
                                    preferredDeliverTime: orderDetails.preferredDeliverTime,
                                    preferredDropoffTime: orderDetails.preferredDropoffTime,
                                    deliveryType: orderDetails.deliveryType,
                                    status: orderDetails.status,
                                    paymentMethod: orderDetails.orderPayment.method,
                                    discount: orderDetails.orderPayment.discount,
                                    promoCode: orderDetails.orderPayment.promoCode,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="order__details w-full bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Chi tiết đơn hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <Row gutter={0} className="h-10 flex items-center font-medium text-base mb-2">
                                <Col flex={'0 0 436px'} className="text-center">
                                    Dịch vụ
                                </Col>
                                <Col flex={'0 0 100px'} className="text-center">
                                    Định lượng
                                </Col>
                                <Col flex={'0 0 150px'} className="text-center">
                                    Đơn giá
                                </Col>
                                <Col flex={'0 0 150px'} className="text-center">
                                    Thành tiền
                                </Col>
                                <Col flex={'0 0 200px'} className="text-center">
                                    Trạng thái
                                </Col>
                            </Row>
                            <CenterOrderedDetailsContainer
                                forceUpdate={forceUpdate}
                                orderStatus={orderDetails.status}
                                orderId={orderDetails.id}
                                details={{ orderedDetails: orderDetails.orderedDetails }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 mx-auto">
                <div className="order__payment w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 px-6 font-semibold text-2xl flex justify-between items-center">
                        <div className="">Thông tin thanh toán</div>
                        <Tag
                            style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, marginRight: 0 }}
                            color={PaymentBadgeStatusMap[orderDetails.orderPayment.status.toLowerCase() ?? '']}
                        >
                            {PaymentStatusMap[orderDetails.orderPayment.status.toLowerCase() ?? '']}
                        </Tag>
                    </div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderDetailsPayment
                                orderID={orderDetails.id}
                                orderStatus={orderDetails.status}
                                forceUpdate={forceUpdate}
                                orderPayment={{
                                    payment: orderDetails.orderPayment,
                                    orderDeliveryPrice: orderDetails.deliveryPrice,
                                    orderTotal: orderDetails.totalOrderValue,
                                }}
                            />
                        </div>
                    </div>
                </div>
                {orderDetails.deliveryType !== 0 && orderDetails.deliveryPrice > 0 && (
                    <div className="order__delivery w-full bg-white rounded border border-wh-lightgray mb-6">
                        <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                            <div className="">Thông tin giao hàng</div>
                        </div>
                        <div className="provider__page--content px-6 mt-6">
                            <div className="provider__services--wrapper mb-4">
                                <CenterOrderDetailsDelivery
                                    deliveries={orderDetails.orderDeliveries}
                                    deliveryType={orderDetails.deliveryType}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {orderDetails.orderTrackings.length > 0 && (
                    <div className="order__tracking w-full bg-white rounded border border-wh-lightgray">
                        <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                            <div className="">Trạng thái đơn hàng</div>
                        </div>
                        <div className="provider__page--content px-6 mt-6 min-h-[200px]">
                            <div className="provider__services--wrapper h-auto">
                                <CenterOrderDetailsTracking trackings={orderDetails.orderTrackings} />
                            </div>
                        </div>
                    </div>
                )}
                {orderDetails.feedback && (
                    <div className="orderdetails__order--summary bg-white rounded border border-wh-lightgray mt-6 py-4 px-6">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-xl text-left">Đánh giá</h2>
                            <div className="flex items-center gap-1">
                                <div className="">
                                    <StarFull numOfStar={1} />
                                </div>
                                <h2 className="font-bold text-xl">{orderDetails.feedback.rating.toFixed(1)}</h2>
                            </div>
                        </div>
                        <div className="orderdetails__order--payment mt-4 gap-x-10 items-baseline flex flex-col">
                            <div className="flex justify-between w-full items-end">
                                <div className="font-bold flex-1 text-left overflow-hidden">
                                    {orderDetails.feedback.createdBy}
                                </div>
                                <div className="text-sm text-ws-gray">
                                    {orderDetails.feedback.createdDate.format('DD-MM-YYYY')}
                                </div>
                            </div>
                            <div className="">{orderDetails.feedback.content}</div>
                        </div>
                        {orderDetails.feedback.replyMessage ? (
                            <div className="flex w-full bg-ws-light-gray rounded-lg p-2 pr-4 mt-2">
                                <div className="flex gap-3 w-full">
                                    <BsReplyFill className="text-lg" />
                                    <div className="w-full">
                                        <div className="font-semibold flex justify-between w-full">
                                            <div className="font-bold flex-1 text-left overflow-hidden">
                                                {'Phản hồi của trung tâm'}
                                            </div>
                                            <div className="text-sm text-ws-gray">
                                                {orderDetails.feedback.createdDate.format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                        <div>{orderDetails.feedback.replyMessage}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button
                                className="w-full text-white  my-4"
                                type="primary"
                                onClick={() => setModalReplyFeedback(true)}
                            >
                                Phản hồi đánh giá
                            </Button>
                        )}
                    </div>
                )}
                <Modal
                    title="Phản hồi đánh giá"
                    open={modalReplyFeedback}
                    onCancel={() => {
                        setModalReplyFeedback(false);
                    }}
                    onOk={() => {
                        orderDetails.feedback?.id &&
                            replyMsg &&
                            replyFeedback(orderDetails.feedback?.id, replyMsg).then(() => {
                                setModalReplyFeedback(false);
                                forceUpdate();
                                setReplyMsg('');
                                message.success('Phản hồi thành công');
                            });
                    }}
                    okText={'Gửi'}
                    cancelText={'Hủy'}
                    cancelButtonProps={{ style: { background: 'white' } }}
                >
                    <div className="orderdetails__order--payment mt-4 gap-x-10 items-baseline flex flex-col">
                        <div className="flex justify-between w-full items-end">
                            <div className="font-bold flex-1 text-left overflow-hidden">
                                {orderDetails.feedback?.createdBy}
                            </div>
                            <div className="text-sm text-ws-gray">
                                {orderDetails.feedback?.createdDate.format('DD-MM-YYYY')}
                            </div>
                        </div>
                        <div className="">{orderDetails.feedback?.content}</div>
                    </div>
                    <div className="flex w-full justify-between bg-ws-light-gray rounded-lg p-2 pr-4 mt-2">
                        <div className="flex gap-3 w-full">
                            <BsReplyFill className="text-lg" />
                            <div className="w-full">
                                <div className="font-semibold">{'Phản hồi của trung tâm'}</div>
                                <TextArea
                                    value={replyMsg}
                                    onChange={(e) => setReplyMsg(e.target.value)}
                                    className="w-full"
                                    placeholder="Nhập phản hồi của bạn"
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default CenterOrderDetailsContainer;
