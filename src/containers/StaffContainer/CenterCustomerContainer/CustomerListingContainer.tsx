import { Col, Form, Input, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerList from '../../../components/CustomerList/CustomerList';
import { getCenterCustomer } from '../../../repositories/StaffRepository';
import { CenterCustomerModel } from '../../../models/Staff/CenterCustomerModel';

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
    const [customers, setCustomers] = useState<CenterCustomerModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'name',
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getCenterCustomer();
        };
        fetchData()
            .then((res) => {
                console.log(res);
                setCustomers(res);
                setIsLoading(false);
            })
            .catch(() => {
                setCustomers([]);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
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
                <CustomerList customers={customers} isLoading={isLoading} />
            </div>
        </>
    );
};

export default CustomerListingContainer;
