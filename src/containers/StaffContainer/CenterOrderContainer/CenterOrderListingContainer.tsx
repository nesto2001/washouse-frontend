import { useState, useEffect } from 'react';

import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { Form, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import OrderList from '../../../components/StaffOrderList/OrderList';

type Props = {};

const searchType = [
    { value: 'id', label: 'Mã đơn hàng' },
    { value: 'name', label: 'Tên khách hàng' },
];

export type SearchParamsData = {
    searchString: string | null;
    searchType: string | null;
};

const CenterOrderListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'id',
    });

    const [centerOrders, setCenterOrders] = useState<CenterOrderModel[]>();

    useEffect(() => {
        const fetchData = async () => {
            return await getManagerCenterOrders();
        };
        fetchData().then((res) => {
            setCenterOrders(res);
        });
    }, [searchParams]);

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
                                    <Select defaultValue="name" options={searchType} />
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
            <div className="provider__services mt-12 mb-72">{centerOrders && <OrderList orders={centerOrders} />}</div>
        </>
    );
};

export default CenterOrderListingContainer;
