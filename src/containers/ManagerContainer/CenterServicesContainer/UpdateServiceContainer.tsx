import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space, Tooltip, Upload, UploadFile, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ServiceDetailsModel } from '../../../models/Service/ServiceDetailsModel';
import { getServiceDetail, updateService } from '../../../repositories/ServiceRepository';

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const priceTypeOption = [
    { value: true, label: 'Khối lượng' },
    { value: false, label: 'Số lượng' },
];

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
type UpdateServiceFormData = {
    serviceDescription: string;
    serviceImage: string;
    timeEstimate: number;
    price: number;
    minPrice: number;
    prices: Array<{
        maxWeight: number;
        price: number;
    }>;
};

const UpdateServiceContainer = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [priceType, setPriceType] = useState(true);
    const [service, setService] = useState<ServiceDetailsModel>();
    const navigate = useNavigate();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const { serviceId } = useParams();

    const [form] = Form.useForm();
    const onFinish = (values: UpdateServiceFormData) => {
        service &&
            updateService(service.id, {
                description: values.serviceDescription,
                image: values.serviceImage ?? 'step3-20230410003841.png',
                timeEstimate: values.timeEstimate,
                price: values.price ?? null,
                minPrice: values.minPrice ?? null,
                servicePrices:
                    values.prices.map((price) => {
                        return {
                            maxValue: price.maxWeight,
                            price: price.price,
                        };
                    }) ?? null,
            })
                .then((res) => {
                    if (res) {
                        message.success('Cập nhật dịch vụ thành công');
                        forceUpdate();
                    }
                })
                .catch((err) => {
                    message.error('Cập nhật dịch vụ thất bại, vui lòng thử lại sau');
                });
    };

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
        serviceId &&
            getServiceDetail(+serviceId).then((res) => {
                setService(res);
                setFileList([
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: res.image,
                        thumbUrl: res.image,
                    },
                ]);
            });
    }, [state]);

    const handlePriceTypeChange = (value: boolean) => {
        setPriceType(value);
    };

    return (
        <div className="text-sub text-base">
            {service && (
                <Form
                    form={form}
                    name="create"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Hình ảnh dịch vụ" valuePropName="fileList" initialValue={service.image}>
                        <Upload
                            action={`${process.env.REACT_APP_FIREBASE_API_URL}/api/homeTest/uploadImage`}
                            listType="picture-card"
                            fileList={[...fileList]}
                            accept="image/*"
                            onChange={handleChange}
                            multiple={false}
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <div className="flex w-full gap-10">
                        <Form.Item
                            initialValue={service?.name}
                            className="basis-1/2"
                            label="Tên dịch vụ"
                            name="serviceName"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            className="basis-1/2"
                            label="Phân loại"
                            name="serviceCategory"
                            initialValue={service.categoryId}
                        >
                            <Input disabled />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Mô tả dịch vụ"
                        initialValue={service.description}
                        name="serviceDescription"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ' }]}
                    >
                        <TextArea rows={4} placeholder="Nhập mô tả dịch vụ" />
                    </Form.Item>

                    <Form.Item
                        name="timeEstimate"
                        label="Ước tính xử lý"
                        initialValue={service.timeEstimate}
                        {...rangeConfig}
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian ước tính xử lý' }]}
                    >
                        <InputNumber addonAfter="phút" placeholder="Nhập thời gian ước tính xử lý" />
                    </Form.Item>
                    <div className="flex w-full gap-10">
                        <Form.Item
                            className={`${priceType ? 'basis-1/4' : 'basis-1/3'}`}
                            name="priceType"
                            label="Đơn vị định lượng"
                            initialValue={service.priceType}
                            rules={[{ required: true, message: 'Vui lòng chọn đơn vị định lượng' }]}
                        >
                            <Select
                                disabled
                                placeholder="Chọn định lượng"
                                options={priceTypeOption}
                                defaultValue={true}
                                onChange={handlePriceTypeChange}
                            ></Select>
                        </Form.Item>
                        {priceType ? (
                            <>
                                <Form.Item
                                    className="basis-1/4"
                                    label="Giá tối thiểu"
                                    name="minPrice"
                                    initialValue={service.minPrice}
                                    rules={[{ required: true, message: 'Vui lòng nhập giá tối thiểu' }]}
                                >
                                    <Input addonAfter="đ" placeholder="Nhập giá tối thiểu" />
                                </Form.Item>
                                <Form.Item label="Khoảng giá" className="basis-1/2">
                                    <Form.List
                                        name="prices"
                                        initialValue={service.prices.map((price) => {
                                            return {
                                                maxWeight: price.maxValue,
                                                price: price.price,
                                            };
                                        })}
                                    >
                                        {(fields, { add, remove }) => {
                                            return (
                                                <div>
                                                    {fields.map((field) => (
                                                        <Space key={field.key} align="baseline">
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'maxWeight']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Vui lòng nhập khối lượng',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Khối lượng" addonAfter="kg"></Input>
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'price']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Vui lòng nhập đơn giá',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Đơn giá" addonAfter="đ" />
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
                                            );
                                        }}
                                    </Form.List>
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item
                                    className="basis-1/3"
                                    label="Đơn giá"
                                    name="price"
                                    rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                                >
                                    <Input addonAfter="đ" placeholder="Đơn giá/số lượng" />
                                </Form.Item>
                                <Tooltip title="Cân nặng trung bình của 1 đơn vị">
                                    <Form.Item
                                        className="basis-1/3"
                                        label="Cân nặng"
                                        name="rate"
                                        rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
                                    >
                                        <Input addonAfter="kg" placeholder="Cân nặng/đơn vị" type="number" />
                                    </Form.Item>
                                </Tooltip>
                            </>
                        )}
                    </div>
                    <div className="w-full flex gap-4 justify-end">
                        <Link to={'/provider/services'}>
                            <Button danger className="bg-transparent">
                                Hủy
                            </Button>
                        </Link>
                        <Button type="primary" onClick={() => form.submit()}>
                            Cập nhật dịch vụ
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default UpdateServiceContainer;
