import React from 'react';
import { useState, useEffect } from 'react';
import { Descriptions, Popconfirm, Tag } from 'antd';
import { LocationDetailsModel } from '../../../models/Location/LocationDetailsModel';
import { getLocation } from '../../../repositories/LocationRepository';
import { DeliveryTypeMap } from '../../../mapping/DeliveryTypeMap';
import { PaymentMethodMap } from '../../../mapping/PaymentMethodMap';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';

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
    status: string;
};

type Props = {
    confirmProceedLoading: boolean;
    openProceedPop: boolean;
    handleCancel: () => void;
    handleOk: () => void;
    showPopconfirm: () => void;
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
                        <Popconfirm
                            title="Cập nhật"
                            description="Xác nhận cập nhật tiến trình đơn hàng?"
                            open={openProceedPop}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmProceedLoading }}
                            onCancel={handleCancel}
                            cancelButtonProps={{ style: { background: 'white' } }}
                        >
                            <Tag
                                className="cursor-pointer"
                                onClick={showPopconfirm}
                                style={{ fontSize: 16, width: 142, textAlign: 'center', padding: '6px 0px' }}
                                color={BadgeStatusMap[orderInfo.status]}
                            >
                                {OrderStatusMap[orderInfo.status]}
                            </Tag>
                        </Popconfirm>
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
                    label="Ghi chú"
                    contentStyle={{ fontSize: 16, fontWeight: 900 }}
                    labelStyle={{ fontSize: 16, fontWeight: 700 }}
                    span={2}
                >
                    {orderInfo.customerMessage ?? 'Không có'}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default CenterOrderDetailsGeneral;
