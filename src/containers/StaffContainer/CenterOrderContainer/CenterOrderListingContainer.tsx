import { useState, useEffect } from 'react';

import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { Empty, Form, Input, Select, Space, Spin, Tabs, TabsProps, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import OrderList from '../../../components/StaffOrderList/OrderList';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import { Paging } from '../../../types/Common/Pagination';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import React from 'react';

type Props = {};

const searchType = [
    { value: 'id', label: 'Mã đơn hàng' },
    { value: 'name', label: 'Tên khách hàng' },
];

export type SearchParamsData = {
    searchString?: string;
    searchType?: string;
    status?: string;
    page?: number;
    pageSize?: number;
    fromDate?: string;
    toDate?: string;
};

const CenterOrderListingContainer = (props: Props) => {
    const [form] = Form.useForm();
    const [msg, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchType: 'id',
    });

    const [centerOrders, setCenterOrders] = useState<CenterOrderModel[]>();

    const onChange = (key: string) => {
        setCurrentPage(1);
        if (key !== '1') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        } else {
            setSearchParams((prev) => ({ ...prev, status: '' }));
        }
    };

    useEffect(() => {}, [currentPage]);
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getManagerCenterOrders({
                ...searchParams,
                page: currentPage,
            });
        };
        fetchData()
            .then((res) => {
                setCenterOrders(res.items);
                setPaging({
                    itemsPerPage: res.itemsPerPage,
                    pageNumber: res.pageNumber,
                    totalItems: res.totalItems,
                    totalPages: res.totalPages,
                });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                msg.error('Không tìm thấy đơn hàng mong muốn');
                setIsLoading(false);
                setCenterOrders([]);
            });
    }, [searchParams, currentPage]);

    const items: TabsProps['items'] = centerOrders && [
        {
            key: '1',
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
            label: `Xử lý`,
        },
        {
            key: 'Ready',
            label: `Sẵn sàng`,
        },
        {
            key: 'Completed',
            label: `Hoàn tất`,
        },
        {
            key: 'Cancelled',
            label: `Đã hủy`,
        },
    ];
    if (isError) {
        return <Empty description="Không có đơn hàng nào" className="mb-5" />;
    }

    return (
        <>
            {contextHolder}
            <div className="provider__services--filter">
                <Form
                    form={form}
                    name="service"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 1200 }}
                    initialValues={{}}
                    autoComplete="off"
                    size="large"
                >
                    <div className="flex flex-wrap justify-between">
                        <Form.Item className="basis-1/2 mb-1">
                            <Space.Compact size="large">
                                <Form.Item name={['search', 'type']} style={{ width: 160 }}>
                                    <Select defaultValue="id" options={searchType} />
                                </Form.Item>
                                <Form.Item
                                    name={['search', 'string']}
                                    rules={[{ min: 2, message: 'Vui lòng nhập tối thiểu 2 ký tự' }]}
                                    style={{ width: 260, flexGrow: 1 }}
                                >
                                    <Input
                                        defaultValue=""
                                        placeholder="Vui lòng nhập tối thiểu 2 ký tự"
                                        onChange={(e) => {
                                            setSearchParams((prevData) => ({
                                                ...prevData,
                                                searchString: e.target.value ?? null,
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div className="provider__services mt-12 mb-72">
                {centerOrders && (
                    <>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        <OrderList
                            orders={centerOrders}
                            isLoading={isLoading}
                            paging={paging}
                            updatePage={(page) => {
                                setCurrentPage(page);
                            }}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default CenterOrderListingContainer;
