import {
    Form,
    Input,
    message,
    Select,
    Tooltip,
    Upload,
    UploadFile,
    DatePicker,
    TimePicker,
    Space,
    Button,
    InputNumber,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/es/upload';
import { useState, useEffect } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { CreateCenterFormData } from '../CenterRegistrationContainer';
import { CategoryOptionsModel } from '../../../models/Category/CategoryOptionsModel';
import { getCategoryOptions } from '../../../repositories/ServiceCategoryRepository';
import WHButton from '../../../components/Button';

const { RangePicker } = DatePicker;

type Props = {
    setFormData?: React.Dispatch<React.SetStateAction<CreateCenterFormData>>;
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

const CreateServiceContainer = ({ setFormData }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [priceType, setPriceType] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState<CategoryOptionsModel[]>([]);
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

    useEffect(() => {
        const fetchData = async () => {
            return await getCategoryOptions();
        };
        fetchData().then((res) => {
            setCategoryOptions(res);
        });
    }, []);

    const handlePriceTypeChange = (value: boolean) => {
        setPriceType(value);
    };

    return (
        <div className="text-sub text-base">
            <Form
                name="create"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Hình ảnh dịch vụ" valuePropName="fileList">
                    <Upload
                        action={`${process.env.REACT_APP_FIREBASE_API_URL}/api/homeTest/uploadImage`}
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
                <div className="flex w-full gap-10">
                    <Form.Item
                        className="basis-1/2"
                        label="Tên dịch vụ"
                        name="serviceName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="basis-1/2"
                        label="Phân loại"
                        name="serviceCategory"
                        rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                    >
                        <Select
                            options={categoryOptions.map((option) => {
                                return { value: option.id, label: option.name };
                            })}
                        ></Select>
                    </Form.Item>
                </div>
                <Form.Item
                    label="Mô tả dịch vụ"
                    name="serviceDescription"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="timeEstimate"
                    label="Ước tính xử lý"
                    {...rangeConfig}
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian ước tính xử lý' }]}
                >
                    <InputNumber addonAfter="phút" />
                </Form.Item>
                <div className="flex w-full gap-10">
                    <Form.Item
                        className="basis-1/2"
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
                        <Form.Item label="Khoảng giá" className="basis-1/2">
                            <Form.List name="prices">
                                {(fields, { add, remove }) => (
                                    <div>
                                        {fields.map((field) => (
                                            <Space key={field.key} align="baseline">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'maxWeight']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập khối lượng' }]}
                                                >
                                                    <Input placeholder="Khối lượng"></Input>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'price']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                                                >
                                                    <Input placeholder="Đơn giá" />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    style={{ verticalAlign: '0.2rem' }}
                                                    onClick={() => remove(field.name)}
                                                />
                                            </Space>
                                        ))}
                                        <Form.Item>
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
                        </Form.Item>
                    ) : (
                        <Form.Item
                            className="basis-1/2"
                            label="Đơn giá"
                            name="serviceName"
                            rules={[{ required: true, message: 'Vui lòng giá tiền' }]}
                        >
                            <Input addonAfter="đ" placeholder="Đơn giá/số lượng" />
                        </Form.Item>
                    )}
                </div>
            </Form>
            <div className="text-right mb-10">
                <WHButton type="sub mr-5">Hủy</WHButton>
                <WHButton type="primary">Thêm dịch vụ</WHButton>
            </div>
            {/* <div className="col-span-2">Tên trung tâm</div>
    <div className="col-span-3"></div> */}
        </div>
    );
};

export default CreateServiceContainer;
