import { Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ManagerCenterModel } from '../../models/Manager/ManagerCenterModel';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import OrderListItem from './OrderListItem';
import { formatCurrency } from '../../utils/FormatUtils';
import OrderCard from './OrderCard';

type Props = {
    orders: CenterOrderModel[];
};

const OrderList = ({ orders }: Props) => {
    const columns: ColumnsType<CenterOrderModel> = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div className="order__list--wrapper my-5 mt-2">
            <div className="order__list">
                {orders.map((order) => order && <OrderCard key={order.id} order={order} />)}
                <Pagination showSizeChanger defaultCurrent={3} total={500} disabled />
            </div>
        </div>
    );
};

export default OrderList;
