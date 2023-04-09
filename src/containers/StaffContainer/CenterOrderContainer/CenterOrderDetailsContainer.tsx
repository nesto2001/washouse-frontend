import { Spin, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import { CenterOrderDetailsModel } from '../../../models/Staff/CenterOrderDetailsModel';
import { getManagerCenterOrderDetails, proceedOrder } from '../../../repositories/StaffRepository';
import CenterOrderDetailsDelivery from './CenterOrderDetailsDelivery';
import CenterOrderDetailsGeneral from './CenterOrderDetailsGeneral';
import CenterOrderDetailsPayment from './CenterOrderDetailsPayment';
import CenterOrderDetailsTracking from './CenterOrderDetailsTracking';
import CenterOrderedDetailsContainer from './CenterOrderedDetailsContainer';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';

type Props = {};

const CenterOrderDetailsContainer = (props: Props) => {
    const [orderDetails, setOrderDetails] = useState<CenterOrderDetailsModel>();
    const [openProceedPop, setOpenProceedPop] = useState(false);
    const [confirmProceedLoading, setConfirmProceedLoading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { orderId } = useParams();
    useEffect(() => {
        setIsLoading(true);
        if (orderId) {
            const fetchData = async () => {
                return await getManagerCenterOrderDetails(orderId);
            };
            fetchData().then((res) => {
                setOrderDetails(res);
                setIsLoading(false);
            });
        }
        setIsLoading(false);
    }, [orderId]);

    const showPopconfirm = () => {
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
                    if (res.status == 200) {
                        message.success('Cập nhật tiến trình đơn hàng thành công!');
                        setOpenProceedPop(false);
                        setConfirmProceedLoading(false);
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
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="order__details w-full bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Chi tiết đơn hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderedDetailsContainer
                                orderId={orderDetails.id}
                                details={{ orderedDetails: orderDetails.orderedDetails }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 mx-auto">
                <div className="order__payment w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                        <div className="">Thông tin thanh toán</div>
                        <Tag style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2 }} color="default">
                            Đang chờ
                        </Tag>
                    </div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderDetailsPayment
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
            </div>
        </>
    );
};

export default CenterOrderDetailsContainer;
