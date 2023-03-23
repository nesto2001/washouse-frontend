import { Button, Form, FormListFieldData, Input, Space, Switch } from 'antd';
import { useState, useCallback } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

type Props = {};

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const CenterDeliveryForm = (props: Props) => {
    const [hasDelivery, sethasDelivery] = useState<boolean>(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSwitchChange = (checked: boolean) => {
        sethasDelivery(checked);
    };

    return (
        <div className="p-6 text-sub text-base">
            <Form
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
                        <Form.Item className="basis-1/2" label="Bảng phí ship (Khối lượng)" labelCol={{ span: 6 }}>
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
                                    if (fields.length === 0) {
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
                        <Form.Item className="basis-1/2" label={'Bảng phí ship (Khoảng cách)'} labelCol={{ span: 6 }}>
                            <Form.List
                                name="distancePrices"
                                rules={[
                                    {
                                        validator: async (_, distancePrices) => {
                                            if (!distancePrices || distancePrices.length < 2) {
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
                                                    <Space key={field.key} align="baseline">
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'maxWeight']}
                                                            rules={[
                                                                { required: true, message: 'Vui lòng nhập khối lượng' },
                                                            ]}
                                                        >
                                                            <Input
                                                                style={{ width: 160 }}
                                                                placeholder="Khoảng cách"
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
