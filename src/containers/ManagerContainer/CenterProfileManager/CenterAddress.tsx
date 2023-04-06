import React, { useState, useEffect } from 'react';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LocationModel } from '../../../models/Location/LocationModel';

type Props = {
    center: ManagerCenterModel;
};

type CenterBasicsFormData = { address: string; ward: number; district: number; city: number; location: LocationModel };

const CenterAddress = ({ center }: Props) => {
    const [formData, setFormData] = useState<CenterBasicsFormData>({
        address: center.centerAddress,
        ward: 1,
        city: 1,
        district: 1,
        location: {
            latitude: center.centerLocation.latitude,
            longitude: center.centerLocation.longitude,
        },
    });

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="p-6 text-sub text-base">
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 800 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Địa chỉ"
                    name="centerName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm của bạn' }]}
                >
                    <Input
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, name: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="centerPhone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại trung tâm của bạn' },
                        { len: 10, max: 10, message: 'Số điện thoại thông thường có 10 số' },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, phone: e.target.value }));
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="centerDescription"
                    rules={[{ required: true, min: 10, message: 'Vui lòng nhập mô tả ít nhất 10 từ.' }]}
                >
                    <TextArea
                        rows={4}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CenterAddress;
