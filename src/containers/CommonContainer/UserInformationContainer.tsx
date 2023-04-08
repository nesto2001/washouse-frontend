import { Button, Form, Input, Upload } from 'antd';
import React from 'react';

type Props = {};

type StaffFormData = {
    idNumber: string;
    savedIdFrontImg: string;
    savedIdBackImg: string;
};

const UserInformationContainer = (props: Props) => {
    const [form] = Form.useForm();
    const handleSubmit = (values: StaffFormData) => {};
    return (
        <>
            <Form form={form} className="" onFinish={handleSubmit}>
                <Form.Item label="Số CCCD/CMND" name="idNumbẻ">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Mặt trước CCCD/CMND">
                    <Upload />
                </Form.Item>
                <Form.Item label="Mặt sau CCCD/CMND">
                    <Upload />
                </Form.Item>
                <Form.Item>
                    <Button title="Tiếp tục" onClick={() => form.submit()} />
                </Form.Item>
            </Form>
        </>
    );
};

export default UserInformationContainer;
