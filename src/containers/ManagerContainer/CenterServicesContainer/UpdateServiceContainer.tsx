import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space, Tooltip, Upload, UploadFile, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ServiceDetailsModel } from '../../../models/Service/ServiceDetailsModel';
import { getServiceDetail, updateService } from '../../../repositories/ServiceRepository';
import { getCategoryOptions } from '../../../repositories/ServiceCategoryRepository';
import { CategoryOptionsModel } from '../../../models/Category/CategoryOptionsModel';
import { uploadSingle } from '../../../repositories/MediaRepository';

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
    price?: number;
    minPrice?: number;
    prices?: Array<{
        maxWeight: number;
        price: number;
    }>;
    rate: number;
};

const UpdateServiceContainer = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [priceType, setPriceType] = useState(true);
    const [service, setService] = useState<ServiceDetailsModel>();
    const navigate = useNavigate();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [categoryOptions, setCategoryOptions] = useState<CategoryOptionsModel[]>([]);
    const [serviceImgName, setServiceImgName] = useState<string>();

    const { serviceId } = useParams();

    const [form] = Form.useForm();
    const onFinish = (values: UpdateServiceFormData) => {
        const file = fileList[0]?.originFileObj;
        console.log(file);
        if (file) {
            const uploadFile = async () => {
                return await uploadSingle(file);
            };
            uploadFile().then((res) => {
                setServiceImgName(res.data.data.savedFileName);
                service &&
                    (values.prices
                        ? updateService(service.id, {
                              description: values.serviceDescription,
                              image: res.data.data.savedFileName ?? undefined,
                              timeEstimate: values.timeEstimate,
                              price: values.price ?? undefined,
                              minPrice: values.minPrice ?? undefined,
                              rate: 1,
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
                              })
                        : updateService(service.id, {
                              description: values.serviceDescription,
                              image: res.data.data.savedFileName ?? undefined,
                              timeEstimate: values.timeEstimate,
                              price: values.price ?? service.price ?? undefined,
                              rate: values.rate,
                          })
                              .then((res) => {
                                  if (res) {
                                      message.success('Cập nhật dịch vụ thành công');
                                      forceUpdate();
                                  }
                              })
                              .catch((err) => {
                                  message.error('Cập nhật dịch vụ thất bại, vui lòng thử lại sau');
                              }));
            });
        } else {
            service &&
                (values.prices
                    ? updateService(service.id, {
                          description: values.serviceDescription,
                          image: serviceImgName ?? undefined,
                          timeEstimate: values.timeEstimate,
                          price: values.price ?? undefined,
                          minPrice: values.minPrice ?? undefined,
                          rate: 1,
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
                          })
                    : updateService(service.id, {
                          description: values.serviceDescription,
                          image: serviceImgName ?? undefined,
                          timeEstimate: values.timeEstimate,
                          price: values.price ?? service.price ?? undefined,
                          rate: values.rate,
                      })
                          .then((res) => {
                              if (res) {
                                  message.success('Cập nhật dịch vụ thành công');
                                  forceUpdate();
                              }
                          })
                          .catch((err) => {
                              message.error('Cập nhật dịch vụ thất bại, vui lòng thử lại sau');
                          }));
        }
    };

    const handleChange = (info: UploadChangeParam) => {
        setFileList([...info.fileList]);
    };

    useEffect(() => {
        serviceId &&
            getServiceDetail(parseInt(serviceId)).then((res) => {
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

    useEffect(() => {
        getCategoryOptions().then((res) => {
            setCategoryOptions([{ id: 0, name: 'Chọn loại dịch vụ' }, ...res]);
        });
    }, [form]);

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
                            beforeUpload={() => {
                                return false;
                            }}
                            showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
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
                            <Select
                                options={categoryOptions.map((opt) => {
                                    return {
                                        value: opt.id,
                                        label: opt.name,
                                    };
                                })}
                                disabled
                            />
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
                            <Select disabled placeholder="Chọn định lượng" options={priceTypeOption}></Select>
                        </Form.Item>
                        {service.priceType ? (
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
                                                maxValue: price.maxValue,
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
                                                                name={[field.name, 'maxValue']}
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
                                <div className="basis-1/3">
                                    <Form.Item
                                        className=""
                                        label="Đơn giá"
                                        name="price"
                                        initialValue={service.price}
                                        rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                                    >
                                        <Input addonAfter="đ" placeholder="Đơn giá/số lượng" type="number" />
                                    </Form.Item>
                                </div>

                                <div className="basis-1/3">
                                    <Form.Item
                                        tooltip="Cân nặng trung bình của 1 đơn vị"
                                        initialValue={service.rate}
                                        className=""
                                        label="Cân nặng"
                                        name="rate"
                                        rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
                                    >
                                        <Input addonAfter="kg" placeholder="Cân nặng/đơn vị" type="number" />
                                    </Form.Item>
                                </div>
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
