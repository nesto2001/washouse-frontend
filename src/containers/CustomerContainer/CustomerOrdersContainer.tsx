import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './CustomerContainer.scss';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import { getCustomerOrders } from '../../repositories/CustomerRepository';
import CustomerOrderList from '../../components/CustomerOrderList/CustomerOrderList';

type Props = {};

type SearchParamsData = {
    searchString?: string;
    searchType: string;
    status?: string;
    page?: number;
    pageSize?: number;
    fromDate?: string;
    toDate?: string;
};

const items: TabsProps['items'] = [
    {
        key: 'All',
        label: `Tất cả`,
    },
    {
        key: 'Pending',
        label: `Đang chờ`,
    },
    {
        key: 'Confirmed',
        label: `Xác nhận`,
    },
    {
        key: 'Processing',
        label: `Đang xử lý`,
    },
    {
        key: 'Delivering',
        label: `Vận chuyển`,
    },
    {
        key: 'Completed',
        label: `Hoàn thành`,
    },
    {
        key: 'Cancelled',
        label: `Đã hủy`,
    },
];

const CustomerOrdersContainer = (props: Props) => {
    const [customerOrder, setcustomerOrder] = useState<CenterOrderModel[]>();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchType: 'id',
        page: 1,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            return await getCustomerOrders(searchParams);
        };
        fetchData().then((res) => {
            setcustomerOrder(res.items);
        });
    }, [searchParams]);

    const onChange = (key: string) => {
        if (key !== 'All') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        } else {
            setSearchParams((prev) => ({ ...prev, status: undefined }));
        }
    };

    return (
        <>
            <Tabs
                defaultActiveKey="All"
                items={items}
                onChange={onChange}
                className="w-full"
                tabBarStyle={{ display: 'flex', justifyContent: 'space-between' }}
            />
            {customerOrder ? <CustomerOrderList customerOrders={customerOrder} /> : <div className="">No data</div>}
        </>
    );
};

export default CustomerOrdersContainer;
