import { EnvironmentOutlined, InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Form, message, Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WHButton from '../../../components/Button';
import { CenterRequest } from '../../../models/Center/CreateCenterRequest';
import { createCenter } from '../../../repositories/CenterRepository';
import { LocationType } from '../../../types/LocationType';
import { OperatingDay } from '../../../types/OperatingDay';
import CenterBasicForm from './CenterBasicForm';
import CenterContactForm from './CenterContactForm';
import CenterDeliveryForm from './CenterDeliveryForm';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import { generateRandomString } from '../../../utils/CommonUtils';

export type CreateCenterFormData = {
    name: string;
    phone: string;
    image: string;
    savedImage: string;
    description: string;
    operationHours: OperatingDay[];
    address: string;
    districtId: number;
    wardId: number;
    location: LocationType;
    hasDelivery: boolean;
    taxCode: string;
    taxRegistrationImage: string;
};

type Props = {};

const CenterRegistrationContainer = (props: Props) => {
    const { token } = theme.useToken();
    const [isLoading, setIsLoading] = useState(true);
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [isValidated, setIsValidated] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateCenterFormData>({
        name: '',
        phone: '',
        image: '',
        savedImage: '',
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
        taxCode: '123153463462',
        taxRegistrationImage: 'taximage.png',
        address: '',
        districtId: 0,
        wardId: 0,
        location: { latitude: 0, longitude: 0 },
        hasDelivery: false,
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getManagerCenter();
        };
        fetchData()
            .then((res) => {
                if (res) {
                    navigate('/provider/dashboard');
                } else setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);

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
            content: (
                <CenterDeliveryForm
                    formInstance={form}
                    setFormData={setFormData}
                    formData={formData}
                    setIsValidated={setIsValidated}
                />
            ),
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
        form.submit();
        if (isValidated) {
            setCurrent(value);
        }
    };

    const handleCreateCenter = () => {
        console.log(formData);
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
        };
        console.log(JSON.stringify(centerRequest));
        const fetchData = async () => {
            return await createCenter(centerRequest);
        };
        fetchData().then((res) => {
            if (res.statusCode == 200) {
                message.success('Đã đăng ký trung tâm thành công, vui lòng chờ duyệt bởi quản trị viên.');
                navigate('/provider/settings/center/profile');
            } else {
                message.error('Xảy ra lỗi trong hoàn tất quá trình đăng ký, vui lòng thử lại sau.');
            }
        });
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
                    <WHButton type="sub" style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Quay lại
                    </WHButton>
                )}
                {current < steps.length - 1 && (
                    <WHButton type="primary" onClick={() => next()}>
                        Tiếp theo
                    </WHButton>
                )}
                {current === steps.length - 1 && (
                    <WHButton type="primary" onClick={handleCreateCenter}>
                        Hoàn thành
                    </WHButton>
                )}
            </div>
        </>
    );
};

export default CenterRegistrationContainer;
