import { EnvironmentOutlined, InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Form, Steps, message, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WHButton from '../../../components/Button';
import Loading from '../../../components/Loading/Loading';
import { LocationType } from '../../../types/LocationType';
import { OperatingDay } from '../../../types/OperatingDay';
import { DeliveryPriceType } from '../../../types/Price/DeliveryPriceType';
import CenterBasicForm from './CenterBasicForm';
import CenterContactForm from './CenterContactForm';
import CenterDeliveryForm from './CenterDeliveryForm';
import { CenterRequest } from '../../../models/Center/CreateCenterRequest';
import { createCenter } from '../../../repositories/CenterRepository';
import { getMe, refresh } from '../../../repositories/AuthRepository';
import { AxiosError } from 'axios';
import { Response } from '../../../models/CommonModel';

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
    deliveryPrice?: DeliveryPriceType[];
    taxCode: string;
    taxRegistrationImage: string;
};

type Props = {};

const CenterRegistrationContainer = (props: Props) => {
    const { token } = theme.useToken();
    const [isLoading, setIsLoading] = useState(false);
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
        deliveryPrice: [],
    });

    // useEffect(() => {
    //     setIsLoading(true);
    //     const fetchData = async () => {
    //         return await getManagerCenter();
    //     };
    //     fetchData()
    //         .then((res) => {
    //             if (res) {
    //                 navigate('/provider/dashboard');
    //             } else setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             setIsLoading(false);
    //         });
    // }, []); uncommn

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
            title: 'Vận chuyển',
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
        form.submit();
        if (isValidated) {
            const centerRequest: CenterRequest = {
                center: {
                    centerName: formData.name,
                    description: formData.description,
                    hasDelivery: true,
                    phone: formData.phone,
                    savedFileName: formData.savedImage ?? '',
                    taxCode: formData.taxCode,
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
            createCenter(centerRequest)
                .then((res) => {
                    if (res) {
                        refresh({
                            refreshToken: localStorage.getItem('refreshToken') ?? '',
                            accessToken: localStorage.getItem('accessToken') ?? '',
                        }).then((res) => {
                            localStorage.setItem('refreshToken', res.data.data.refreshToken);
                            localStorage.setItem('accessToken', res.data.data.accessToken);
                            getMe().then((res) => {
                                localStorage.setItem('currentUser', JSON.stringify(res));
                                message.success(
                                    'Đã đăng ký trung tâm thành công, vui lòng chờ duyệt bởi quản trị viên.',
                                );
                                navigate('/provider/settings/center/profile');
                            });
                        });
                    } else {
                        message.error('Xảy ra lỗi trong hoàn tất quá trình đăng ký, vui lòng thử lại sau.');
                    }
                })
                .catch((err: AxiosError<Response<null>>) => {
                    if (err.response?.status === 400) {
                        const messageString = err.response.data.message.toLowerCase();
                        switch (true) {
                            case messageString.includes('existing') && messageString.includes('location'):
                                message.error('Đã tồn tại trung tâm ở vị trí này, vui lòng kiểm tra lại thông tin');
                                break;
                            default:
                                message.error(err.response.data.message);
                                break;
                        }
                    } else {
                        console.log(err.response);
                    }
                });
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

    if (isLoading) {
        return <Loading screen />;
    }

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
