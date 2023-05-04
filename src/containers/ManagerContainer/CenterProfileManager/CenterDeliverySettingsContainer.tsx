import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Spin, Switch, message } from 'antd';
import { useCallback, useState, useEffect } from 'react';
import '../ManagerContainer.scss';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import { CenterDeliveryPriceRequest } from '../../../models/DeliveryPrice/CenterDeliveryPriceRequest';

type CenterDeliveryFormData = {
    hasDelivery: true;
    weightPrices: { maxDistance: number; maxWeight: number; price: number }[];
};
type Props = {};

const CenterDeliverySettingsContainer = ({}: Props) => {
    const [hasDelivery, sethasDelivery] = useState<boolean>();
    const [isLoading, setisLoading] = useState(true);
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        setisLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
                sethasDelivery(res.hasDelivery);
                setisLoading(false);
            })
            .catch(() => {
                message.error('Lỗi truy xuất thông tin, vui lòng thử lại sau');
            })
            .finally(() => {
                setisLoading(false);
            });
    }, []);

    const handleSwitchChange = (checked: boolean) => {
        sethasDelivery(checked);
    };
    const onFinish = (values: CenterDeliveryFormData) => {
        console.log('Received values of form: ', values);
        const request: CenterDeliveryPriceRequest = {
            hasDelivery: values.hasDelivery,
            deliveryPrice: values.hasDelivery
                ? values.weightPrices.map((deliPrice) => {
                      return {
                          maxWeight: deliPrice.maxWeight,
                          maxDistance: deliPrice.maxDistance,
                          price: deliPrice.price,
                      };
                  })
                : undefined,
        };
        console.log(JSON.stringify(request));
        //TODO
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[100px]">
                <Spin />
            </div>
        );
    }

    return (
        <div className="p-6 text-sub text-base">
            {!isLoading && myCenter && (
                <Form
                    name="delivery"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ weightPrices: myCenter?.centerDeliveryPrices }}
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
                        style={{ maxWidth: 780 }}
                        labelCol={{ span: 4 }}
                    >
                        <Switch onChange={handleSwitchChange} defaultChecked={hasDelivery} />
                    </Form.Item>
                    {hasDelivery && (
                        <div className="flex w-full">
                            <Form.Item className="basis-1/2" label="Bảng phí ship" labelCol={{ span: 6 }}>
                                <Form.List
                                    name="weightPrices"
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
                                        if (fields.length < (myCenter?.centerDeliveryPrices.length ?? 0)) {
                                            add();
                                            forceUpdate();
                                        }
                                        return (
                                            <div>
                                                {fields.map((field, index) => {
                                                    return (
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
                                                                    {
                                                                        required: true,
                                                                        message: 'Vui lòng nhập đơn giá',
                                                                    },
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
                                                                    style={{ verticalAlign: '-0.4rem' }}
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
                    <Form.Item wrapperCol={{ span: 17, offset: 4 }} style={{ maxWidth: 780 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default CenterDeliverySettingsContainer;
