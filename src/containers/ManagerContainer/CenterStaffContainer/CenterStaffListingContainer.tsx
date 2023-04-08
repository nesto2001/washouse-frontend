import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CenterStaffModel } from '../../../models/Staff/CenterStaffModel';
import Stafflist from '../../../components/StaffList/Stafflist';

type Props = {};

const searchType = [
    { value: 'name', label: 'Tên nhân viên' },
    { value: 'id', label: 'Mã nhân viên' },
];

export type SearchParamsData = {
    searchString: string | null;
    searchType: string | null;
};

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

const CenterStaffListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [centerStaff, setCenterStaff] = useState<CenterStaffModel[]>([
        {
            id: 1,
            status: true,
            fullname: 'Hoàng Trần',
            email: 'manager01@gmail.com',
            phone: '0987347812',
            dob: '12-05-1993',
            isManager: true,
            idNumber: '052201018492',
        },
        {
            id: 2,
            status: true,
            fullname: 'Trần Tân Long',
            email: 'tanlong6121@gmail.com',
            phone: '0975926021',
            dob: '06-12-2001',
            isManager: false,
            idNumber: '012341246123',
        },
        {
            id: 3,
            status: false,
            fullname: 'Lê Thành Đạt',
            email: 'datlt2001@gmail.com',
            phone: '0987347812',
            dob: '19-01-1992',
            isManager: false,
            idNumber: '052201018492',
        },
    ]);
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'name',
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         return await getCenterStaff();
    //     };
    //     fetchData().then((res) => {
    //         setCenterStaff(res);
    //     });
    // }, [searchParams]);

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
                <Stafflist centerStaff={centerStaff} />
            </div>
        </>
    );
};

export default CenterStaffListingContainer;
