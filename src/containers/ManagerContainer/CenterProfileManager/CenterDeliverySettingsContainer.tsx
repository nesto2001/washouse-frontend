import { Avatar, Button, Form, FormInstance, FormListFieldData, Input, List, Modal, Space, Switch } from 'antd';
import { useState, useCallback } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Delivery from '../../../assets/images/delivery.png';
import '../ManagerContainer.scss';

type Props = {};

interface SettingsType {
    thumbnail: string;
    title: string;
    description: string;
}

const settings: SettingsType[] = [
    {
        title: 'Giao hàng',
        description:
            'Bắt đầu cung cấp dịch vụ giao hàng cho khách hàng, nếu ngừng cung cấp dịch vụ giao hàng vẫn phải giải quyết các đơn hàng hiện có',
        thumbnail: Delivery,
    },
];

const CenterDeliverySettingContainer = ({}: Props) => {
    const [hasDelivery, sethasDelivery] = useState<boolean>(false);
    const [modal, contextHolder] = Modal.useModal();
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const [popupLoading, setPopupLoading] = useState<boolean>(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSwitchChange = (checked: boolean) => {
        sethasDelivery(checked);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleDeactivate = () => {
        setPopupLoading(true);
    };

    const handleCancel = () => {
        setSwitchOn(switchOn);
    };

    const handleSwitchToggle = () => {
        setSwitchOn(!switchOn);
        const content = {
            title: '',
            content: (
                <>
                    Khách hàng sẽ không thể đặt dịch vụ trong khi trung tâm bạn tạm ngưng hoạt động. Bạn chắc chắn muốn
                    bật tạm nghỉ chứ?
                </>
            ),
            icon: ' ',
            okText: 'Tiếp tục',
            cancelText: 'Hủy',
            maskClosable: true,
            onOk: handleDeactivate,
            onCancel: handleCancel,
            confirmLoading: popupLoading,
        };
        modal.confirm(content);
    };
    return (
        <>
            {contextHolder}
            <List
                className="settings-list text-base mb-3"
                itemLayout="horizontal"
                dataSource={settings}
                renderItem={(item) => (
                    <List.Item actions={[<Switch checked={hasDelivery} onChange={handleSwitchChange} />]}>
                        <List.Item.Meta
                            avatar={<Avatar size={50} src={item.thumbnail} />}
                            title={<div className="text-base font-medium">{item.title}</div>}
                            description={<div className="text-sm">{item.description}</div>}
                        />
                    </List.Item>
                )}
            />
            {hasDelivery && (
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
                    </Form>
                </div>
            )}
        </>
    );
};

export default CenterDeliverySettingContainer;
