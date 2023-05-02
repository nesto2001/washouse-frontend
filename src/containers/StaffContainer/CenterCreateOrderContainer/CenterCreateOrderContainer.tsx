import { EnvironmentOutlined, InfoCircleOutlined, SendOutlined, WalletOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Space, Steps } from 'antd';
import React, { useState } from 'react';
import CreateOrderStep1 from '../../../components/CreateOrderForm/CreateOrderStep1';
import CreateOrderStep2 from '../../../components/CreateOrderForm/CreateOrderStep2';
import CreateOrderStep3 from '../../../components/CreateOrderForm/CreateOrderStep3';
import CreateOrderStep4 from '../../../components/CreateOrderForm/CreateOrderStep4';
import { CartState } from '../../../types/CartType/CartState';

type Props = {};

const CenterCreateOrderContainer = (props: Props) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();

    const steps = [
        {
            title: 'Khách hàng',
        },
        {
            title: 'Dịch vụ',
        },
        {
            title: 'Vận chuyển',
        },
        // {
        //     title: 'Thanh toán',
        // },
    ];

    const onChange = (value: number) => {
        form.submit();

        setCurrent(value);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <div className="">
            <Steps current={current} items={items} onChange={onChange} labelPlacement="vertical" progressDot />
            <div className="centerorder__create--form mt-6">
                <div className="centerorder__create--formtitle font-medium text-xl mb-3">{steps[current].title}</div>
                {current === 0 && <CreateOrderStep1 formInstance={form} />}
                {current === 1 && <CreateOrderStep2 formInstance={form} />}
                {current === 2 && <CreateOrderStep3 formInstance={form} />}
                {/* {current === 3 && <CreateOrderStep4 formInstance={form} />} */}
            </div>
        </div>
    );
};

export default CenterCreateOrderContainer;
