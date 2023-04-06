import { useState, useEffect } from 'react';

import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { Form, Input, Select, Space, Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import OrderList from '../../../components/StaffOrderList/OrderList';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';

type Props = {};

const searchType = [
    { value: 'id', label: 'Mã đơn hàng' },
    { value: 'name', label: 'Tên khách hàng' },
];

export type SearchParamsData = {
    searchString: string | null;
    searchType: string | null;
    status: string;
};

const CenterOrderListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'id',
        status: '',
    });

    const [centerOrders, setCenterOrders] = useState<CenterOrderModel[]>();

    const onChange = (key: string) => {
        setSearchParams((prev) => ({ ...prev, status: OrderStatusMap[key] }));
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getManagerCenterOrders();
        };
        fetchData().then((res) => {
            setCenterOrders(res);
        });
    }, [searchParams]);

    const items: TabsProps['items'] = centerOrders && [
        {
            key: '1',
            label: `Tất cả`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Pending',
            label: `Đang chờ`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Confirmed',
            label: `Xác nhận`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Processing',
            label: `Xử lý`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Ready',
            label: `Sẵn sàng`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Completed',
            label: `Hoàn tất`,
            children: <OrderList orders={centerOrders} />,
        },
        {
            key: 'Cancelled',
            label: `Đã hủy`,
            children: <OrderList orders={centerOrders} />,
        },
    ];

    return (
        <>
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
