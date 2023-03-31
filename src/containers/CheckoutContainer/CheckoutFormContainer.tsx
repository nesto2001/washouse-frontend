import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WHButton from '../../components/Button';
import FormRadioDelivery from '../../components/RadioButton/FormRadioDelivery';
import FormRadioPayment from '../../components/RadioButton/FormRadioPayment';
import Selectbox from '../../components/Selectbox';
import { DeliveryOption } from '../../types/DeliveryOption';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';
import { PaymentEnum } from '../../types/enum/PaymentEnum';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';
import { Option } from '../../types/Options';
import '../../components/Button/Button.scss';
import Input from '../../components/Input/Input';
import { Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LocationModel } from '../../models/LocationModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';

type Step1Props = {
    formData: CheckoutFormData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    onNext: () => void;
};

export const Step1 = ({ formData, onNext, setFormData }: Step1Props) => {
    const [form] = Form.useForm();
    const [district, setDistrict] = useState(formData.district || 0);
    const [districtList, setDistrictList] = useState<LocationModel[]>([]);
    const [wardList, setWardList] = useState<LocationModel[]>([]);

    const handleNext = () => {
        form.submit();
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictList(res);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            return await getWards(formData.district);
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    }, []);

    const handleSelectDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, district: parseInt(event.target.value) }));
        const fetchData = async () => {
            return await getWards(parseInt(event.target.value));
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    };

    const handleSelectWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, wardId: parseInt(event.target.value) }));
    };

    const handleSelectCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        if (values) {
            onNext();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="checkout_customer"
            initialValues={{
                fullname: formData.fullname,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                city: 1,
                district: formData.district,
                ward: formData.wardId,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
        >
            <div className="checkout__customer--form grid text-left mt-4 gap-x-6">
                <div className="customer__input--name grid grid-cols-2 gap-x-6">
                    <div className="customer__input--lastname col-span-2">
                        <Form.Item
                            name="fullname"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input
                                required
                                type="text"
                                name="customer_flname"
                                label="Họ và tên của bạn"
                                placeholder="Nhập họ và tên"
                                value={formData.fullname}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, fullname: e.target.value }));
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="customer__input--contact grid grid-cols-2 gap-x-6">
                    <div className="customer__input--phone col-span-1">
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại của bạn' },
                                { len: 10, message: 'Số điện thoại thông thường có 10 số' },
                            ]}
                            validateTrigger={['onBlur']}
                        >
                            <Input
                                label="Số điện thoại"
                                required
                                type="text"
                                name="customer_phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                                }}
                            />
                        </Form.Item>
                    </div>
                    <div className="customer__input--email col-span-1">
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email của bạn' },
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: 'Vui lòng nhập đúng định dạng email',
                                },
                            ]}
                            validateTrigger={['onBlur']}
                        >
                            <Input
                                label="Email"
                                required
                                type="text"
                                name="customer_email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="customer__input--location grid grid-cols-3 gap-x-6">
                    <div className="customer__input--address col-span-3">
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                            validateTrigger={['onBlur']}
                        >
                            <Input
                                label="Địa chỉ cá nhân"
                                required
                                type="text"
                                name="customer_lname"
                                placeholder="Địa chỉ"
                                value={formData.address}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, address: e.target.value }));
                                }}
                            />
                        </Form.Item>
                    </div>
                    <div className="customer__input--city col-span-1">
                        <label htmlFor="customer_city" className="text-base font-medium block">
                            Tỉnh / Thành{' '}
                            <Tooltip
                                title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                className="ml-1"
                            >
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </label>
                        <Form.Item name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}>
                            <Selectbox
                                isRequired={true}
                                name="customer_city"
                                id=""
                                type="tỉnh / thành phố"
                                className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                selectedValue={1}
                                options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                onChange={handleSelectCityChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="customer__input--district col-span-1">
                        <label htmlFor="customer_district" className="text-base font-medium block">
                            Quận / Huyện
                        </label>
                        <Form.Item
                            name="district"
                            rules={[
                                { required: true, message: 'Vui lòng chọn quận / huyện' },
                                {
                                    validator(_, value) {
                                        if (value === 0) {
                                            return Promise.reject(new Error('Vui lòng chọn quận / huyện'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Selectbox
                                isRequired={true}
                                name="customer_district"
                                id=""
                                type="quận / huyện"
                                className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                                selectedValue={formData.district}
                                options={districtList.map((district): Option => {
                                    return {
                                        value: district.id.toString(),
                                        label: district.name,
                                    };
                                })}
                                onChange={handleSelectDistrictChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="customer__input--ward col-span-1">
                        <label htmlFor="customer_ward" className="text-base font-medium block">
                            Phường / Xã
                        </label>
                        <Form.Item
                            name="ward"
                            rules={[
                                { required: true, message: 'Vui lòng chọn phường / xã' },
                                {
                                    validator(_, value) {
                                        if (value === 0) {
                                            return Promise.reject(new Error('Vui lòng chọn phường / xã'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Selectbox
                                isRequired={true}
                                name="customer_ward"
                                id=""
                                type="phường / xã"
                                className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                                selectedValue={formData.wardId}
                                options={wardList.map((ward) => {
                                    return {
                                        value: ward.id,
                                        label: ward.name,
                                    };
                                })}
                                onChange={handleSelectWardChange}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="checkout__customer--action flex justify-between mt-9 items-center">
                <Link to="/cart" className="font-bold">
                    Quay về giỏ hàng
                </Link>
                <WHButton type="primary" onClick={handleNext}>
                    Tiếp tục đến phương thức vận chuyển
                </WHButton>
            </div>
        </Form>
    );
};

type Step2Props = {
    formData: CheckoutFormData;
    onBack: () => void;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
};

export const Step2 = ({ formData, onBack, setFormData }: Step2Props) => {
    const [delivery, setDelivery] = useState(formData.delivery || { type: 1, freight: 0 });
    const [paymentType, setPaymentType] = useState(formData.paymentType || 1);

    const handleBack = () => {
        onBack();
    };

    const deliveryOpt: DeliveryOption[] = [
        {
            type: DeliveryEnum.NO,
            freight: 0,
        },
        {
            type: DeliveryEnum.ONE_WAY_TO,
            freight: 15000,
        },
        {
            type: DeliveryEnum.ONE_WAY_BACK,
            freight: 15000,
        },
        {
            type: DeliveryEnum.TWO_WAY,
            freight: 30000,
        },
    ];

    const paymentOpt: Option[] = Object.entries(PaymentEnum).map(([key, value]) => ({
        label: key,
        value: value,
    }));

    const handleDeliveryRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRadio = event.target as HTMLInputElement;
        const selectedValue = parseInt(event.target.value);
        const radiofreight = selectedRadio.getAttribute('data-value') ?? '0';
        const freight = parseInt(radiofreight);
        setDelivery({ type: selectedValue, freight });
        setFormData((prevFormData) => ({
            ...prevFormData,
            delivery: {
                type: selectedValue,
                freight,
            },
        }));
    };

    const handlePaymentRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = parseInt(event.target.value);
        const paymentType = selectedValue;
        setPaymentType(selectedValue);
        setFormData((prevFormData) => ({
            ...prevFormData,
            paymentType,
        }));
    };

    return (
        <>
            <div className="checkout__delivery--form text-left">
                <h3 className="font-bold text-xl">Phương thức vận chuyển</h3>
                <FormRadioDelivery
                    name="delivery"
                    optionsList={deliveryOpt}
                    isValued={true}
                    selectedValue={delivery.type}
                    onChange={handleDeliveryRadioChange}
                />
            </div>
            <div className="checkout__payment--form text-left mt-7">
                <h3 className="font-bold text-xl">Phương thức thanh toán</h3>
                <FormRadioPayment
                    name="payment"
                    optionsList={paymentOpt}
                    selectedValue={paymentType}
                    onChange={handlePaymentRadioChange}
                />
            </div>
            <div className="checkout__customer--action flex justify-between mt-9 items-center">
                <div className="font-bold cursor-pointer" onClick={handleBack}>
                    Quay lại
                </div>
                <button className="btn primary" type="submit">
                    Hoàn tất đơn hàng
                </button>
            </div>
        </>
    );
};
