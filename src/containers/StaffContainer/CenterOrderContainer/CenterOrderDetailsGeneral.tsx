import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Descriptions, Form, Modal, Popconfirm, Tag, Tooltip, message } from 'antd';
import { LocationDetailsModel } from '../../../models/Location/LocationDetailsModel';
import { getLocation } from '../../../repositories/LocationRepository';
import { DeliveryTypeMap } from '../../../mapping/DeliveryTypeMap';
import { PaymentMethodMap } from '../../../mapping/PaymentMethodMap';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import CouponTag from '../../../components/CouponTag/CouponTag';
import { formatPercentage } from '../../../utils/FormatUtils';
import TextArea from 'antd/es/input/TextArea';
import { cancelOrder, completeOrder } from '../../../repositories/StaffRepository';
import { AxiosError } from 'axios';
import { Response } from '../../../models/CommonModel';

export type OrderInformation = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerMessage: string;
    customerMobile: string;
    customerOrdered: number;
    locationId: number;
    preferredDeliverTime: string;
    preferredDropoffTime: string;
    deliveryType: number;
    paymentMethod: number;
    promoCode: string;
    discount: number;
    status: string;
};

type Props = {
    confirmProceedLoading?: boolean;
    openProceedPop?: boolean;
    handleCancel?: () => void;
    handleOk?: () => void;
    showPopconfirm?: () => void;
    orderInfo: OrderInformation;
    forceUpdate: () => void;
};

type CancelOrderForm = {
    reason: string;
};

const CenterOrderDetailsGeneral = ({
    orderInfo,
    handleCancel,
    handleOk,
    showPopconfirm,
    confirmProceedLoading,
    openProceedPop,
    forceUpdate,
}: Props) => {
    const [customerLocation, setCustomerLocation] = useState<LocationDetailsModel>();
    const [openCancelModel, setOpenCancelModel] = useState(false);
    const [modalLoadingConfirm, setModalLoadingConfirm] = useState(false);
    const [openCompletePop, setOpenCompletePop] = useState(false);
    const [confirmCompleteLoading, setConfirmCompleteLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchLocation = async () => {
            return await getLocation(orderInfo.locationId);
        };
        fetchLocation().then((res) => {
            setCustomerLocation(res);
        });
    }, [orderInfo]);

    const handleCancelOrder = (values: CancelOrderForm) => {
        setModalLoadingConfirm(true);
        if (values.reason) {
            cancelOrder(orderInfo.id, values.reason)
                .then((res) => {
                    message.success('Đã hủy đơn hàng thành công!');
                    forceUpdate();
                })
                .catch(() => {
                    message.error('Đã xảy ra lỗi trong quá trình hủy đơn hàng, vui lòng thử lại');
                })
                .finally(() => {
                    setModalLoadingConfirm(false);
                    setOpenCancelModel(false);
                });
        }
    };

    const handleCancelComplete = () => {
        setOpenCompletePop(false);
    };

    const handleOkComplete = () => {
        setConfirmCompleteLoading(true);
        if (orderInfo) {
            completeOrder(orderInfo.id)
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Hoàn tất đơn hàng thành công');
                        setOpenCompletePop(false);
                        setConfirmCompleteLoading(false);
                        forceUpdate();
                    }
                })
                .catch((err: AxiosError<Response<null>>) => {
                    console.log(err);
                    if (err.response?.status === 400 && err.response.data.message === 'Payment not paid') {
                        message.error('Không thể hoàn tất do đơn hàng chưa được thanh toán, vui lòng thử lại sau!');
                    }
                })
                .finally(() => {
                    setConfirmCompleteLoading(false);
                });
        }
    };

    const showPopComplete = () => {
        if (orderInfo.status === 'completed') {
            message.error('Đơn hàng đã hoàn tất, không thể cập nhật tiến trình thêm');
            return;
        }
        setOpenCompletePop(true);
    };

    return (
        <>
            <Descriptions layout="vertical" column={4}>
                <Descriptions.Item
                    label="Mã đơn hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.id}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Vận chuyển"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {DeliveryTypeMap[orderInfo.deliveryType]}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Thanh toán"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {PaymentMethodMap[orderInfo.paymentMethod]}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Trạng thái"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {
                        <Tag
                            style={{ fontSize: 16, width: 142, textAlign: 'center', padding: '6px 0px' }}
                            color={BadgeStatusMap[orderInfo.status]}
                        >
                            {OrderStatusMap[orderInfo.status]}
                        </Tag>
                    }
                </Descriptions.Item>
                <Descriptions.Item
                    label="Tên khách hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.customerName}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Số điện thoại"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.customerMobile}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Email"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.customerEmail}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Địa chỉ khách hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {customerLocation &&
                        `${customerLocation.address}, ${customerLocation.ward.name}, ${customerLocation.ward.district.name}, TP. Hồ Chí Minh`}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Giờ lấy hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.preferredDropoffTime}
                </Descriptions.Item>
                {/* <Descriptions.Item
                    label="Giờ nhận hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.preferredDeliverTime??'Chưa có'}
                </Descriptions.Item> uncomment */}
                <Descriptions.Item
                    label="Mã giảm giá"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                >
                    {orderInfo.discount !== 0 ? (
                        <CouponTag discountValue={orderInfo.discount} content={orderInfo.promoCode}></CouponTag>
                    ) : (
                        'Không có'
                    )}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Ghi chú"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                    span={2}
                >
                    {orderInfo.customerMessage ?? 'Không có'}
                </Descriptions.Item>
            </Descriptions>
            <div className="center__order--footer flex justify-end my-3 mb-6 gap-4">
                {(orderInfo.status.toLowerCase() === 'confirmed' || orderInfo.status.toLowerCase() === 'pending') && (
                    <Button
                        type="default"
                        size="large"
                        className="capitalize bg-white hover:bg-ws-red hover:!text-white"
                        danger
                        onClick={() => setOpenCancelModel(true)}
                    >
                        Hủy đơn hàng
                    </Button>
                )}
                {!(
                    orderInfo.status.toLowerCase() === 'ready' ||
                    orderInfo.status.toLowerCase() === 'completed' ||
                    orderInfo.status.toLowerCase() === 'cancelled'
                ) && (
                    <Popconfirm
                        title="Cập nhật"
                        description="Xác nhận cập nhật tiến trình đơn hàng?"
                        open={openProceedPop}
                        onConfirm={handleOk}
                        okButtonProps={{ loading: confirmProceedLoading }}
                        onCancel={handleCancel}
                        cancelButtonProps={{ style: { background: 'white' } }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" size="large" className="capitalize" onClick={showPopconfirm}>
                            Cập nhật tiến trình
                        </Button>
                    </Popconfirm>
                )}
                {orderInfo.status.toLowerCase() === 'ready' && (
                    <Popconfirm
                        title="Hoàn tất"
                        description="Xác nhận hoàn tất đơn hàng?"
                        open={openCompletePop}
                        onConfirm={handleOkComplete}
                        okButtonProps={{ loading: confirmCompleteLoading }}
                        onCancel={handleCancelComplete}
                        cancelButtonProps={{ style: { background: 'white' } }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" size="large" className="capitalize" onClick={showPopComplete}>
                            Hoàn tất đơn hàng
                        </Button>
                    </Popconfirm>
                )}
            </div>
            <Modal
                title="Hủy đơn hàng"
                maskClosable
                destroyOnClose
                open={openCancelModel}
                onCancel={() => {
                    setOpenCancelModel(false);
                }}
                cancelText="Hủy"
                okText="Xác nhận"
                cancelButtonProps={{ style: { background: 'white' } }}
                okButtonProps={{ danger: true }}
                width={400}
                onOk={() => form.submit()}
                confirmLoading={modalLoadingConfirm}
            >
                Bạn xác nhận hủy đơn hàng?
                <div className="mt-4">
                    <Form layout="vertical" name="cancel" form={form} requiredMark={false} onFinish={handleCancelOrder}>
                        <Form.Item
                            name="reason"
                            label="Lí do hủy đơn"
                            rules={[
                                { required: true, message: 'Vui lòng nhập lí do hủy đơn' },
                                { min: 2, message: 'Vui lòng nhập ít nhất 2 ký tự' },
                            ]}
                            requiredMark={false}
                        >
                            <TextArea placeholder="Nhập lí do hủy đơn" />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default CenterOrderDetailsGeneral;
