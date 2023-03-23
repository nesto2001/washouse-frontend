import React, { useState } from 'react';
import { Form, message, Steps, theme } from 'antd';
import { EnvironmentOutlined, SmileOutlined, ShopOutlined, SendOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { GrDeliver } from 'react-icons/gr';
import Button from '../../../components/Button';
import CenterBasicForm from './CenterBasicForm';
import CenterContactForm from './CenterContactForm';
import CenterServiceForm from './CenterServiceForm';
import CenterDeliveryForm from './CenterDeliveryForm';
import { StringLiteral } from 'typescript';
import { OperatingDay } from '../../../types/OperatingDay';
import { LocationType } from '../../../types/LocationType';

export type CreateCenterFormData = {
    name: string;
    phone: string;
    image: string;
    description: string;
    operationHours: OperatingDay[];
    address: string;
    districtId: number;
    wardId: number;
    location: LocationType;
    hasDelivery: boolean;
};

type Props = {};

const CenterRegistrationContainer = (props: Props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(1);
    const [isValidated, setIsValidated] = useState(false);
    const [formData, setFormData] = useState<CreateCenterFormData>({
        name: '',
        phone: '',
        image: '',
        description: '',
        operationHours: [
            { day: 0, start: null, end: null },
            { day: 1, start: null, end: null },
            { day: 2, start: null, end: null },
            { day: 3, start: null, end: null },
            { day: 4, start: null, end: null },
            { day: 5, start: null, end: null },
            { day: 6, start: null, end: null },
        ],
        address: '',
        districtId: 0,
        wardId: 0,
        location: { latitude: 0, longitude: 0 },
        hasDelivery: false,
    });

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: (
                <CenterBasicForm
                    formInstance={form}
                    setFormData={setFormData}
                    formData={formData}
                    setIsValidated={setIsValidated}
                />
            ),
            icon: <InfoCircleOutlined style={{ verticalAlign: '-0.1rem' }} />,
        },
        {
            title: 'Địa chỉ',
            content: (
                <CenterContactForm
                    formInstance={form}
                    setFormData={setFormData}
                    formData={formData}
                    setIsValidated={setIsValidated}
                />
            ),
            icon: <EnvironmentOutlined style={{ verticalAlign: '-0.1rem' }} />,
        },
        {
            title: 'Vận chuyển & Thanh toán',
            content: <CenterDeliveryForm />,
            icon: <SendOutlined style={{ verticalAlign: '-0.1rem' }} />,
        },
    ];

    const next = () => {
        form.submit();
        if (isValidated) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = (value: number) => {
        if (isValidated) {
            setCurrent(value);
        }
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
    }));

    const contentStyle: React.CSSProperties = {
        minHeight: 256,
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <Steps current={current} items={items} onChange={onChange} />
            <div className="mt-3 font-medium text-xl">{steps[current].title}</div>
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'end', marginBottom: 24 }}>
                {current > 0 && (
                    <Button type="sub" style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </>
    );
};

export default CenterRegistrationContainer;
