import React from 'react';
import { useState, useEffect } from 'react';

import { CenterStaffModel } from '../../models/Staff/CenterStaffModel';
import Table, { ColumnsType } from 'antd/es/table';
import { formatDateString } from '../../utils/TimeUtils';
import { Button, DatePicker, Form, Input, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getManagerCenter } from '../../repositories/StaffRepository';

type Props = {
    centerStaff: CenterStaffModel[];
};

type StaffFormData = {
    phone: string;
    email: string;
};

const Stafflist = ({ centerStaff }: Props) => {
    const [form] = Form.useForm();

    // const [promotions, setPromotions] = useState<CenterStaffModel[]>([]);
    const [modalVisibility, setModalVisibility] = useState(false);

    const [formData, setFormData] = useState<StaffFormData>();

    const columns: ColumnsType<CenterStaffModel> = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
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
            title: 'Chức vụ',
            dataIndex: 'isManager',
            key: 'isManager',
            render: (isManager: boolean) => (isManager ? 'Quản lý' : 'Nhân viên'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => (status ? 'Hoạt động' : 'Nghỉ'),
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'action',
            render: (isManager: boolean) => (isManager ? '' : 'Đình chỉ'),
        },
    ];

    // useEffect(() => {
    //     if (!modalVisibility) {
    //         const fetchData = async () => {
    //             return await getPromotions();
    //         };
    //         fetchData().then((res) => {
    //             setPromotions(res);
    //         });
    //     }
    // }, [modalVisibility]);

    const onFinish = (values: StaffFormData) => {
        console.log(values);
        // getManagerCenter().then((res) =>
        //     createPromotion({
        //         phone: values.phone,
        //         email: values.email,
        //         centerId: res.id,
        //     })
        //         .then(() => {
        //             message.success(`Đã tạo thành công.`);
        //             setModalVisibility(false);
        //         })
        //         .catch((error) => {
        //             if (error) {
        //                 message.error(`Đã xảy ra lỗi trong quá trình tạo, vui lòng thử lại sau.`);
        //             }
        //         }),
        // );
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleCreatePromotion = () => {
        console.log(form);
    };
    return (
        <>
            <div className="staff__list--wrapper my-5 mt-2">
                <div className="staff__list">
                    <Button className="float-right mb-4" type="primary" onClick={() => setModalVisibility(true)}>
                        Thêm nhân viên
                    </Button>
                    <Table columns={columns} dataSource={centerStaff} />
                </div>
            </div>
            <Modal
                width={400}
                title="Thêm nhân viên mới"
                open={modalVisibility}
                onCancel={() => setModalVisibility(false)}
                footer={[
                    <Button key="key" onClick={() => setModalVisibility(false)} danger className="bg-transparent">
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        Lưu
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="createPromotion"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    <div className="columns-1">
                        <Form.Item
                            label="Số điện thoại nhân viên"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại nhân viên' }]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="text" title="Số điện thoại" placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Email nhân viên"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email nhân viên' }]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="text" title="Email" placeholder="Nhập email" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default Stafflist;
