import { Form, Input, Popover, message } from 'antd';
import React from 'react';
import WHButton from '../Button';
import { useNavigate } from 'react-router-dom';

type Props = {
    child: React.ReactNode;
};

type searchOrderRequest = {
    orderId: string;
    phone: string;
};

const OrderDropdown = ({ child }: Props) => {
    const [msg, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: searchOrderRequest) => {
        const { orderId, phone } = values;
        navigate(`/orders/details?id=${orderId}&p=${phone}`);
    };

    const onFinishFailed = (errorInfo: any) => {
        msg.error('Không tìm thấy đơn hàng của bạn, vui lòng thử lại sau');
    };

    return (
        <>
            {contextHolder}
            <Popover
                align={{ offset: [0, 20] }}
                placement="bottomRight"
                content={
                    <Form
                        form={form}
                        name="order"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="gap-6 w-full justify-center">
                            <Form.Item
                                rules={[{ required: true, message: '' }]}
                                name="orderId"
                                label="Mã đơn hàng"
                                validateStatus=""
                                style={{ marginBottom: 4 }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true, message: '' }]}
                                name="phone"
                                label="Số điện thoại"
                                validateStatus=""
                                style={{ marginBottom: 12 }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item validateStatus="" style={{ marginBottom: 4 }}>
                                <WHButton
                                    type="primary"
                                    className="hover:text-white w-full"
                                    size="small"
                                    onClick={() => {
                                        form.submit();
                                    }}
                                >
                                    Tra cứu đơn hàng
                                </WHButton>
                            </Form.Item>
                        </div>
                    </Form>
                }
                arrow={false}
            >
                {child}
            </Popover>
        </>
    );
};

export default OrderDropdown;
