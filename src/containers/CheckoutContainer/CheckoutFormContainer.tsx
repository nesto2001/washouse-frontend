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

type Step1Props = {
    formData: CheckoutFormData;
    onNext: (data: Partial<CheckoutFormData>) => void;
};

export const Step1 = ({ formData, onNext }: Step1Props) => {
    const [firstName, setFirstName] = useState(formData.firstName || '');
    const [lastName, setLastName] = useState(formData.lastName || '');
    const [address, setAddress] = useState(formData.address || '');
    const [city, setCity] = useState(formData.city || 1);
    const [district, setDistrict] = useState(formData.district || 0);
    const [ward, setWard] = useState(formData.ward || 0);
    const [email, setEmail] = useState(formData.email || '');
    const [phone, setPhone] = useState(formData.phone || '');

    const handleNext = () => {
        if (firstName && lastName && address && city !== 0 && district !== 0 && ward !== 0 && email && phone) {
            onNext({ firstName, lastName, address, city, district, ward, email, phone });
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        console.log(formData);
    };

    return (
        <>
            <div className="checkout__customer--form grid text-left mt-4 gap-x-6 gap-y-5">
                <div className="customer__input--name grid grid-cols-2 gap-x-6">
                    <div className="customer__input--lastname col-span-1">
                        <Input
                            required
                            type="text"
                            name="customer_lname"
                            label="Họ của bạn"
                            placeholder="Họ"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="customer__input--firstname col-span-1">
                        <Input
                            label="Tên của bạn"
                            required
                            type="text"
                            name="customer_fname"
                            placeholder="Tên"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="customer__input--location grid grid-cols-3 gap-x-6 gap-y-5">
                    <div className="customer__input--address col-span-3">
                        <Input
                            label="Địa chỉ"
                            required
                            type="text"
                            name="customer_lname"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <div className="customer__input--city col-span-1">
                        <label htmlFor="customer_city" className="text-base font-medium block">
                            Tỉnh / Thành
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_city"
                            id=""
                            type="tỉnh / thành phố"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                            selectedValue={city}
                            options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                            onChange={(e) => {
                                setCity(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    <div className="customer__input--district col-span-1">
                        <label htmlFor="customer_district" className="text-base font-medium block">
                            Quận / Huyện
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_district"
                            id=""
                            type="quận / huyện"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            selectedValue={district}
                            options={[{ label: 'Quận 5', value: 1 }]}
                            onChange={(e) => {
                                setDistrict(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    <div className="customer__input--ward col-span-1">
                        <label htmlFor="customer_ward" className="text-base font-medium block">
                            Phường / Xã
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_ward"
                            id=""
                            type="phường / xã"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            selectedValue={ward}
                            options={[{ label: 'Phường 4', value: 1 }]}
                            onChange={(e) => {
                                setWard(parseInt(e.target.value));
                            }}
                        />
                    </div>
                </div>

                <div className="customer__input--contact grid grid-cols-2 gap-x-6 gap-y-5">
                    <div className="customer__input--email col-span-1">
                        <Input
                            label="Email"
                            required
                            type="text"
                            name="customer_email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="customer__input--phone col-span-1">
                        {/* <label htmlFor="customer_phone" className="text-base font-medium block">
                            Số điện thoại
                        </label>
                        <input
                            required
                            type="text"
                            name="customer_phone"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        /> */}
                        <Input
                            label="Số điện thoại"
                            required
                            type="text"
                            name="customer_phone"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
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
        </>
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
