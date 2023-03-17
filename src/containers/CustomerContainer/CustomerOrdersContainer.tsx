import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './CustomerContainer.scss';

type Props = {};

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Tất cả`,
        children: `Tất cả đơn hàng`,
    },
    {
        key: '2',
        label: `Đang chờ`,
        children: `Đơn hàng đang chờ`,
    },
    {
        key: '3',
        label: `Xác nhận`,
        children: `Đơn hàng đã xác nhận`,
    },
    {
        key: '4',
        label: `Đang xử lý`,
        children: `Đơn hàng đang xử lý`,
    },
    {
        key: '5',
        label: `Vận chuyển`,
        children: `Đơn hàng đang vận chuyển`,
    },
    {
        key: '6',
        label: `Hoàn thành`,
        children: `Đơn hàng đã hoàn thành`,
    },
    {
        key: '7',
        label: `Đã hủy`,
        children: `Đơn hàng đã hủy`,
    },
];

const CustomerOrdersContainer = (props: Props) => {
    return (
        <>
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                className="w-full"
                tabBarStyle={{ display: 'flex', justifyContent: 'space-between' }}
            />
        </>
    );
};

export default CustomerOrdersContainer;
