import { Form, Input, message, Select, Tooltip, Upload, UploadFile, DatePicker, TimePicker, Space, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/es/upload';
import { useState, useEffect } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { CreateCenterFormData } from '.';

const { RangePicker } = DatePicker;

type Props = {
    setFormData: React.Dispatch<React.SetStateAction<CreateCenterFormData>>;
};

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const priceTypeOption = [
    { value: true, label: 'Khối lượng' },
    { value: false, label: 'Số lượng' },
];

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const CenterServiceForm = ({ setFormData }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [priceType, setPriceType] = useState(true);
    const [form] = Form.useForm();

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

    const handlePriceTypeChange = (value: boolean) => {
        setPriceType(value);
    };

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
                    label="Tên dịch vụ"
                    name="serviceName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thể loại"
                    name="serviceCategory"
                    rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                >
                    <Select></Select>
                </Form.Item>
                <Form.Item
                    label="Mô tả dịch vụ"
                    name="serviceDescription"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Hình ảnh trung tâm" valuePropName="fileList">
                    <Upload
                        action={`${process.env.REACT_APP_API_URL}/api/homeTest/uploadImage`}
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
                    name="timeEstimate"
                    label="Ước tính xử lý"
                    {...rangeConfig}
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian ước tính xử lý' }]}
                >
                    <TimePicker.RangePicker />
                </Form.Item>
                <Form.Item
                    name="priceType"
                    label="Đơn vị định lượng"
                    rules={[{ required: true, message: 'Vui lòng chọn đơn vị định lượng' }]}
                >
                    <Select
                        placeholder="Chọn định lượng"
                        options={priceTypeOption}
                        defaultValue={true}
                        onChange={handlePriceTypeChange}
                    ></Select>
                </Form.Item>
                {priceType ? (
                    <Form.List name="prices">
                        {(fields, { add, remove }) => (
                            <div style={{ marginLeft: 200 }}>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'maxWeight']}
                                            rules={[{ required: true, message: 'Vui lòng nhập khối lượng' }]}
                                        >
                                            <Input style={{ width: 184 }} placeholder="Khối lượng"></Input>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'price']}
                                            rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                                        >
                                            <Input style={{ width: 184 }} placeholder="Đơn giá" />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            style={{ verticalAlign: '0.2rem' }}
                                            onClick={() => remove(field.name)}
                                        />
                                    </Space>
                                ))}

                                <Form.Item style={{ width: 600 }}>
                                    <Button
                                        type="dashed"
                                        style={{ backgroundColor: 'white' }}
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined style={{ verticalAlign: '0.1rem' }} />}
                                    >
                                        Thêm khoảng giá
                                    </Button>
                                </Form.Item>
                            </div>
                        )}
                    </Form.List>
                ) : (
                    <Form.Item
                        label="Đơn giá"
                        name="serviceName"
                        rules={[{ required: true, message: 'Vui lòng giá tiền' }]}
                    >
                        <Input addonAfter="đ" placeholder="Đơn giá/số lượng" />
                    </Form.Item>
                )}
            </Form>
            {/* <div className="col-span-2">Tên trung tâm</div>
    <div className="col-span-3"></div> */}
        </div>
    );
};

export default CenterServiceForm;
