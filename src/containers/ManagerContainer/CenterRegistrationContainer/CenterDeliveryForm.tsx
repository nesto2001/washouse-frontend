import { Button, Form, FormInstance, FormListFieldData, Input, Space, Switch, message } from 'antd';
import { useState, useCallback } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import '../ManagerContainer.scss';
import { CreateCenterFormData } from '.';
import { CenterDeliveryPriceRequest } from '../../../models/DeliveryPrice/CenterDeliveryPriceRequest';
import { CenterRequest } from '../../../models/Center/CreateCenterRequest';
import { generateRandomString } from '../../../utils/CommonUtils';
import { createCenter } from '../../../repositories/CenterRepository';
import { useNavigate } from 'react-router-dom';
import { getMe, refresh } from '../../../repositories/AuthRepository';

type Props = {
    formData: CreateCenterFormData;
    setFormData: React.Dispatch<React.SetStateAction<CreateCenterFormData>>;
    setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
    formInstance: FormInstance;
};

const CenterDeliveryForm = ({ setFormData, setIsValidated, formData, formInstance }: Props) => {
    const navigate = useNavigate();
    const [hasDelivery, sethasDelivery] = useState<boolean>(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSwitchChange = (checked: boolean) => {
        sethasDelivery(checked);
        setFormData((prevFormData) => ({ ...prevFormData, hasDelivery: checked }));
        if (!checked) {
            setFormData((prevFormData) => ({ ...prevFormData, deliveryPrice: undefined }));
        }
    };
    const onFinish = (values: CenterDeliveryPriceRequest) => {
        setIsValidated(true);
        if (formData.hasDelivery || values.hasDelivery) {
            setFormData((prevFormData) => ({ ...prevFormData, deliveryPrice: values.deliveryPrice }));
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, deliveryPrice: undefined }));
        }
        const centerRequest: CenterRequest = {
            center: {
                centerName: formData.name,
                description: formData.description,
                hasDelivery: true,
                phone: formData.phone,
                savedFileName: formData.savedImage ?? 'step3-20230410003841.png',
                taxCode: generateRandomString(12),
                taxRegistrationImage: 'step3-20230410003841.png',
            },
            location: {
                addressString: formData.address,
                wardId: formData.wardId,
                latitude: formData.location.latitude,
                longitude: formData.location.longitude,
            },
            centerOperatingHours: formData.operationHours.map((operationDay) => {
                return {
                    day: operationDay.day,
                    openTime: operationDay.start,
                    closeTime: operationDay.end,
                };
            }),
            centerDelivery: {
                hasDelivery: formData.hasDelivery,
                deliveryPrice:
                    formData.hasDelivery && formData.deliveryPrice
                        ? formData.deliveryPrice?.map((deliPrice) => {
                              return {
                                  maxWeight: deliPrice.maxWeight,
                                  maxDistance: deliPrice.maxDistance,
                                  price: deliPrice.price,
                              };
                          })
                        : undefined,
            },
        };
        console.log(JSON.stringify(centerRequest));
        createCenter(centerRequest).then((res) => {
            if (res) {
                refresh({
                    refreshToken: localStorage.getItem('refreshToken') ?? '',
                    accessToken: localStorage.getItem('accessToken') ?? '',
                }).then((res) => {
                    localStorage.setItem('refreshToken', res.data.data.refreshToken);
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                    getMe().then((res) => {
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        navigate('/provider/settings/center/profile');
                        message.success('Đã đăng ký trung tâm thành công, vui lòng chờ duyệt bởi quản trị viên.');
                    });
                });
            } else {
                message.error('Xảy ra lỗi trong hoàn tất quá trình đăng ký, vui lòng thử lại sau.');
            }
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        setIsValidated(true);
        console.log(formData);
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="p-6 text-sub text-base">
            <Form
                form={formInstance}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelWrap
            >
                <Form.Item
                    name="hasDelivery"
                    label="Vận chuyển"
                    valuePropName="checked"
                    initialValue={hasDelivery}
                    style={{ maxWidth: 732 }}
                    labelCol={{ span: 4 }}
                >
                    <Switch onChange={handleSwitchChange} />
                </Form.Item>
                {hasDelivery && (
                    <div className="flex w-full">
                        <Form.Item className="basis-1/2" label="Bảng phí ship" labelCol={{ span: 6 }}>
                            <Form.List
                                name="deliveryPrice"
                                rules={[
                                    {
                                        validator: async (_, weightPrices) => {
                                            if (!weightPrices || weightPrices.length < 2) {
                                                return Promise.reject(new Error('Ít nhất 2 khoảng giá'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }) => {
                                    if (fields.length === 0) {
                                        add();
                                        forceUpdate();
                                    }
                                    return (
                                        <div>
                                            {fields.map((field, index) => {
                                                return (
                                                    <Space key={`${field.key}-${index}`} align="baseline">
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'maxWeight']}
                                                            rules={[
                                                                { required: true, message: 'Vui lòng nhập khối lượng' },
                                                            ]}
                                                        >
                                                            <Input
                                                                placeholder="Khối lượng"
                                                                style={{ width: 160 }}
                                                                addonAfter="kg"
                                                            ></Input>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'maxDistance']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Vui lòng nhập khoảng cách',
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                placeholder="Khoảng cách"
                                                                style={{ width: 160 }}
                                                                addonAfter="km"
                                                            ></Input>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'price']}
                                                            rules={[
                                                                { required: true, message: 'Vui lòng nhập đơn giá' },
                                                            ]}
                                                        >
                                                            <Input
                                                                style={{ width: 160 }}
                                                                placeholder="Đơn giá"
                                                                addonAfter="đ"
                                                            />
                                                        </Form.Item>
                                                        {index > 0 && (
                                                            <MinusCircleOutlined
                                                                style={{ verticalAlign: '-0.1rem' }}
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        )}
                                                    </Space>
                                                );
                                            })}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    style={{ backgroundColor: 'white', width: 328 }}
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
                    </div>
                )}
            </Form>
        </div>
    );
};

export default CenterDeliveryForm;
