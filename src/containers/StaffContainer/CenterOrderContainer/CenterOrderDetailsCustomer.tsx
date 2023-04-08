import { Descriptions } from 'antd';
import React from 'react';

type customerType = {
    customerName: string;
    locationId: string;
    customerEmail: string;
    customerMobile: string;
    customerMessage: string;
    customerOrdered?: 5;
};

type Props = {
    customerInfo: customerType;
};

const CenterOrderDetailsCustomer = ({ customerInfo }: Props) => {
    return (
        <>
            <Descriptions layout="vertical">
                <Descriptions.Item
                    label="Tên khách hàng"
                    contentStyle={{ fontSize: 16, fontWeight: 900, fontFamily: 'roboto' }}
                    labelStyle={{ fontSize: 16, fontWeight: 700, fontFamily: 'roboto' }}
                >
                    {customerInfo.customerName}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Số điện thoại"
                    contentStyle={{ fontSize: 16, fontWeight: 900, fontFamily: 'roboto' }}
                    labelStyle={{ fontSize: 16, fontWeight: 700, fontFamily: 'roboto' }}
                >
                    {customerInfo.customerMobile}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Email"
                    contentStyle={{ fontSize: 16, fontWeight: 900, fontFamily: 'roboto' }}
                    labelStyle={{ fontSize: 16, fontWeight: 700, fontFamily: 'roboto' }}
                >
                    {customerInfo.customerEmail}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Địa chỉ"
                    contentStyle={{ fontSize: 16, fontWeight: 900, fontFamily: 'roboto' }}
                    labelStyle={{ fontSize: 16, fontWeight: 700, fontFamily: 'roboto' }}
                    span={2}
                >
                    {customerInfo.locationId}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Ghi chú"
                    contentStyle={{ fontSize: 16, fontWeight: 900, fontFamily: 'roboto' }}
                    labelStyle={{ fontSize: 16, fontWeight: 700, fontFamily: 'roboto' }}
                >
                    {customerInfo.customerMessage}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default CenterOrderDetailsCustomer;
