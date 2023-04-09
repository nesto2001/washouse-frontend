import { useState, useEffect } from 'react';

import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { Form, Input, Select, Space, Spin, Tabs, TabsProps, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import OrderList from '../../../components/StaffOrderList/OrderList';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import { Paging } from '../../../types/Common/Pagination';

type Props = {};

const searchType = [
    { value: 'id', label: 'Mã đơn hàng' },
    { value: 'name', label: 'Tên khách hàng' },
];

export type SearchParamsData = {
    searchString?: string;
    searchType: string;
    status: string;
    page?: number;
    pageSize?: number;
    fromDate: string;
    toDate: string;
};

const CenterOrderListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [msg, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [paging, setPaging] = useState<Paging>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'id',
        status: '',
        fromDate: '',
        page: 1,
        pageSize: 10,
        toDate: '',
    });

    const [centerOrders, setCenterOrders] = useState<CenterOrderModel[]>();

    const onChange = (key: string) => {
        if (key !== '1') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        } else {
            setSearchParams((prev) => ({ ...prev, status: '' }));
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getManagerCenterOrders(searchParams);
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
                msg.error('Không tìm thấy đơn hàng mong muốn');
                setIsLoading(false);
                setCenterOrders([]);
            });
    }, [searchParams, currentPage]);

    const items: TabsProps['items'] = centerOrders && [
        {
            key: '1',
            label: `Tất cả`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Pending',
            label: `Đang chờ`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Confirmed',
            label: `Xác nhận`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Processing',
            label: `Xử lý`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Ready',
            label: `Sẵn sàng`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Completed',
            label: `Hoàn tất`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'Cancelled',
            label: `Đã hủy`,
            children: (
                <OrderList
                    orders={centerOrders}
                    isLoading={isLoading}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
    ];

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
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </>
    );
};

export default CenterOrderListingContainer;
