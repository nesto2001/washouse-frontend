import { EnvironmentOutlined, InfoCircleOutlined, SendOutlined, WalletOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Space, Steps, message } from 'antd';
import React, { useState, useEffect } from 'react';
import CreateOrderStep1 from '../../../components/CreateOrderForm/CreateOrderStep1';
import CreateOrderStep2 from '../../../components/CreateOrderForm/CreateOrderStep2';
import CreateOrderStep3 from '../../../components/CreateOrderForm/CreateOrderStep3';
import CreateOrderStep4 from '../../../components/CreateOrderForm/CreateOrderStep4';
import { CartState } from '../../../types/CartType/CartState';
import { CheckoutFormData } from '../../../types/FormData/CheckoutFormData';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { createOrderStaff, getManagerCenter } from '../../../repositories/StaffRepository';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import { CreateOrderRequest } from '../../../models/Order/CreateOrderRequest';
import dayjs from 'dayjs';
import { DeliveryInfoRequest } from '../../../models/Order/DeliveryInfoRequest';
import { RootState } from '../../../store/CartStore';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../repositories/OrderRepository';
import { clearCart } from '../../../reducers/CartReducer';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CenterCreateOrderContainer = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [form] = Form.useForm();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullname: '',
        address: '',
        city: 0,
        district: 0,
        wardId: 0,
        email: '',
        phone: '',
        preferredDropoffTime: '',
        deliveryType: 0,
        deliveryPrice: 0,
        paymentType: 0,
        deliveryInfo: [],
    });

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
        {
            title: 'Xác nhận',
        },
    ];

    const onChange = (value: number) => {
        form.submit();
        setCurrent(value);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const onNext = () => {
        setCurrent(current + 1);
    };

    const onBack = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        setIsLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
            })
            .catch(() => {
                message.error('Lỗi khi truy xuất thông tin, vui lòng thử lại sau');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <OthersSpin />;
    }

    if (!myCenter) {
        return <ErrorScreen noNav />;
    }

    const handleSubmit = () => {
        if (myCenter) {
            const CreateOrderData: CreateOrderRequest = {
                centerId: myCenter.id,
                order: {
                    customerName: formData.fullname,
                    customerAddressString: formData.address,
                    customerEmail: formData.email,
                    customerMobile: formData.phone,
                    customerWardId: formData.wardId,
                    deliveryPrice: formData.deliveryPrice,
                    deliveryType: formData.deliveryType,
                    preferredDeliverTime: formData.preferredDeliverTime ?? undefined,
                    preferredDropoffTime:
                        formData.preferredDropoffTime.length > 0
                            ? formData.preferredDropoffTime
                            : dayjs().format('DD-MM-YYYY HH:mm:ss'),
                },
                deliveries: formData.deliveryInfo.map((delivery): DeliveryInfoRequest => {
                    return {
                        addressString: delivery.addressString,
                        deliveryType: delivery.deliveryType,
                        wardId: delivery.wardId,
                    };
                }),
                orderDetails: cartItems.map((item) => {
                    return {
                        serviceId: item.id,
                        measurement: item.quantity && item.quantity > 0 ? item.quantity : item.weight ?? 0,
                        price: item.price ?? 0,
                        customerNote: item.customerNote,
                    };
                }),
                paymentMethod: 0,
            };
            createOrderStaff(CreateOrderData)
                .then((res) => {
                    message.success('Tạo đơn hàng thành công');
                    dispatch(clearCart());
                    navigate(`/provider/orders/${res.orderId}`);
                })
                .catch((error) => {
                    message.error('Xảy ra lỗi khi tạo đơn hàng');
                    console.log(error);
                });
        }
    };

    return (
        <div className="">
            <Steps current={current} items={items} onChange={onChange} labelPlacement="vertical" progressDot />
            <div className="centerorder__create--form mt-6">
                <div className="centerorder__create--formtitle font-medium text-xl mb-3">
                    {(current === 0 && 'Khách hàng') ||
                        (current === 1 && 'Dịch vụ') ||
                        (current === 2 && 'Vận chuyển') ||
                        (current > 2 && '') ||
                        (current < 0 && '')}
                </div>
                {current === 0 && (
                    <CreateOrderStep1
                        formInstance={form}
                        onNext={onNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {current === 1 && <CreateOrderStep2 onBack={onBack} onNext={onNext} centerId={myCenter.id} />}
                {current === 2 && (
                    <CreateOrderStep3
                        formInstance={form}
                        onBack={onBack}
                        onNext={onNext}
                        formData={formData}
                        centerHasDelivery={myCenter.hasDelivery}
                        centerOperatingDays={myCenter.centerOperatingHours}
                        setFormData={setFormData}
                    />
                )}
                {current === 3 && (
                    <CreateOrderStep4
                        formInstance={form}
                        onBack={onBack}
                        formData={formData}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default CenterCreateOrderContainer;
