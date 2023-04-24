import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Descriptions, Popconfirm, Tag, Tooltip } from 'antd';
import { LocationDetailsModel } from '../../../models/Location/LocationDetailsModel';
import { getLocation } from '../../../repositories/LocationRepository';
import { DeliveryTypeMap } from '../../../mapping/DeliveryTypeMap';
import { PaymentMethodMap } from '../../../mapping/PaymentMethodMap';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import CouponTag from '../../../components/CouponTag/CouponTag';
import { formatPercentage } from '../../../utils/FormatUtils';

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
};

const CenterOrderDetailsGeneral = ({
    orderInfo,
    handleCancel,
    handleOk,
    showPopconfirm,
    confirmProceedLoading,
    openProceedPop,
}: Props) => {
    const [customerLocation, setCustomerLocation] = useState<LocationDetailsModel>();

    useEffect(() => {
        const fetchLocation = async () => {
            return await getLocation(orderInfo.locationId);
        };
        fetchLocation().then((res) => {
            setCustomerLocation(res);
        });
    }, [orderInfo]);

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
                    >
                        Hủy đơn hàng
                    </Button>
                )}
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
            </div>
        </>
    );
};

export default CenterOrderDetailsGeneral;
