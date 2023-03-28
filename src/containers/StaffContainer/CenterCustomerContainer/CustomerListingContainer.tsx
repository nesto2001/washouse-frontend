import { Col, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerList from '../../../components/CustomerList/CustomerList';

type Props = {};

const searchType = [
    { value: 'name', label: 'Tên khách hàng' },
    { value: 'id', label: 'Mã khách hàng' },
];

export type SearchParamsData = {
    searchString: string | null;
    searchType: string | null;
};

const CustomerListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'name',
    });

    // const customerTab: TabsProps['items'] = [
    //     {
    //         key: '1',
    //         label: `Tất cả`,
    //         children: <ServiceList layout="table" />,
    //     },
    //     {
    //         key: '2',
    //         label: `Đang hoạt động`,
    //         children: `Content of Tab Pane 2`,
    //     },
    //     {
    //         key: '3',
    //         label: `Tạm ngưng`,
    //         children: `Content of Tab Pane 3`,
    //     },
    //     {
    //         key: '4',
    //         label: `Vi phạm`,
    //         children: `Content of Tab Pane 3`,
    //     },
    //     {
    //         key: '5',
    //         label: `Đã ẩn`,
    //         children: `Content of Tab Pane 3`,
    //     },
    // ];

    const onChange = (key: string) => {
        console.log(key);
    };

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
                                <Form.Item name={['search', 'type']} style={{ width: 130 }}>
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
            <div className="provider__services mt-12 mb-72">
                <CustomerList />
            </div>
        </>
    );
};

export default CustomerListingContainer;
