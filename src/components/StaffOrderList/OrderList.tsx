import { Pagination, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ManagerCenterModel } from '../../models/Manager/ManagerCenterModel';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import OrderListItem from './OrderListItem';
import { formatCurrency } from '../../utils/FormatUtils';
import OrderCard from './OrderCard';

type Props = {
    orders: CenterOrderModel[];
    isLoading: boolean;
};

const OrderList = ({ orders, isLoading }: Props) => {
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
        <div className={`order__list--wrapper my-5 mt-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="order__list--header mb-6 py-4 bg-wh-lightgray font-bold text-sub rounded-lg">
                <div className="flex justify-between px-4">
                    <div className="w-[400px]">Dịch vụ</div>
                    <div className="w-[110px] mr-3">Tổng đơn hàng</div>
                    <div className="w-[86px] mr-3">Giảm giá</div>
                    <div className="w-[100px] mr-3">Thanh toán</div>
                    <div className="w-[100px] mr-3">Ngày đặt</div>
                    <div className="w-[88px] mr-3">Trạng thái</div>
                    <div className="w-[200px]">Thao tác</div>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full justify-center">
                    <Spin />
                </div>
            ) : (
                <div className="order__list">
                    {orders.map((order) => order && <OrderCard key={order.id} order={order} />)}
                    <Pagination defaultCurrent={1} />
                </div>
            )}
        </div>
    );
};

export default OrderList;
