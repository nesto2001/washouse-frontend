import React, { useState } from 'react';
import { message, Steps, theme } from 'antd';
import { EnvironmentOutlined, SmileOutlined, ShopOutlined, SendOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { GrDeliver } from 'react-icons/gr';
import Button from '../../../components/Button';
import CenterBasicForm from './CenterBasicForm';

const steps = [
    {
        title: 'Thông tin cơ bản',
        content: <CenterBasicForm />,
        icon: <InfoCircleOutlined style={{ verticalAlign: '0.2rem' }} />,
    },
    {
        title: 'Địa chỉ & liên hệ',
        content: 'Second-content',
        icon: <EnvironmentOutlined style={{ verticalAlign: '0.2rem' }} />,
    },
    {
        title: 'Dịch vụ',
        content: 'Last-content',
        icon: <ShopOutlined style={{ verticalAlign: '0.2rem' }} />,
    },
    {
        title: 'Vận chuyển',
        content: 'Last-content',
        icon: <SendOutlined style={{ verticalAlign: '0.2rem' }} />,
    },
];

type Props = {};

const CenterRegistrationContainer = (props: Props) => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
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
