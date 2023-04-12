import React from 'react';
import { useState, useEffect } from 'react';

import { CenterStaffModel } from '../../models/Staff/CenterStaffModel';
import Table, { ColumnsType } from 'antd/es/table';
import { formatDateString } from '../../utils/TimeUtils';
import { Button, DatePicker, Form, Input, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getManagerCenter } from '../../repositories/StaffRepository';
import { set } from 'date-fns';
import OtpInput from '../OTPInput/OtpInput';

type Props = {
    centerStaff: CenterStaffModel[];
};

type StaffFormData = {
    phone: string;
    email: string;
};

const Stafflist = ({ centerStaff }: Props) => {
    const [form] = Form.useForm();
    const [step, setStep] = useState(0);

    // const [promotions, setPromotions] = useState<CenterStaffModel[]>([]);
    const [modalVisibility, setModalVisibility] = useState(false);

    const [formData, setFormData] = useState<StaffFormData>();

    const [otp, setOtp] = useState('');
    const onOtpChange = (value: string) => setOtp(value);

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

    const onFinish = (values: StaffFormData) => {
        setFormData({ phone: values.phone, email: values.email });
        setStep(step + 1);
    };

    const handleCancel = () => {
        setModalVisibility(false);
        setStep(0);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={
                    <>
                        <Button key="key" onClick={handleCancel} danger className="bg-transparent">
                            Hủy
                        </Button>
                        <Button key="next" type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </>
                }
            >
                <Form
                    form={form}
                    name="createPromotion"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    {
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
                    }
                    {/* {step === 1 && (
                        <div className="columns-1 mt-3 flex flex-col items-center ">
                            <div className="header text-xl my-2 font-bold text-center">Nhập mã OTP để xác nhận</div>
                            <div className="header text-center mt-1 mb-4">
                                Một mã OTP đã được gửi đến email nhân viên ({formData?.email})
                            </div>
                            <div className="h-10 w-64 flex justify-center mb-4">
                                <OtpInput value={otp} valueLength={4} onChange={onOtpChange} />
                            </div>
                        </div>
                    )} */}
                </Form>
            </Modal>
        </>
    );
};

export default Stafflist;
