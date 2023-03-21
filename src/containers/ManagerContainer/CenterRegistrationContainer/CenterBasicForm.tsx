import React, { useState, useEffect } from 'react';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { Button, Checkbox, Form, Input, Upload, UploadFile, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

type Props = {};

const CenterBasicForm = (props: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange = (info: UploadChangeParam) => {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`Tải hình ảnh ${info.file.name} thành công.`);
        } else if (status === 'error') {
            message.error(`Tải hình ảnh ${info.file.name} thất bại.`);
        }
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show the last recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        console.log(process.env.APP_API_URL);
    }, []);

    return (
        <div className="p-6 text-sub text-base">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên trung tâm"
                    name="centerName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm của bạn' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Hình ảnh trung tâm" valuePropName="fileList">
                    <Upload
                        action={`${process.env.APP_API_URL}/api/homeTest/uploadImage`}
                        listType="picture-card"
                        fileList={[...fileList]}
                        onChange={handleChange}
                        multiple={false}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="centerDescription"
                    rules={[{ required: true, min: 10, message: 'Vui lòng nhập mô tả ít nhất 10 từ.' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
            {/* <div className="col-span-2">Tên trung tâm</div>
            <div className="col-span-3"></div> */}
        </div>
    );
};

export default CenterBasicForm;
