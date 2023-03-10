import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
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
                            label="H??? c???a b???n"
                            placeholder="H???"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="customer__input--firstname col-span-1">
                        <Input
                            label="T??n c???a b???n"
                            required
                            type="text"
                            name="customer_fname"
                            placeholder="T??n"
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
                            label="?????a ch???"
                            required
                            type="text"
                            name="customer_lname"
                            placeholder="?????a ch???"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <div className="customer__input--city col-span-1">
                        <label htmlFor="customer_city" className="text-base font-medium block">
                            T???nh / Th??nh
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_city"
                            id=""
                            type="t???nh / th??nh ph???"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                            selectedValue={city}
                            options={[{ label: 'TP. H??? Ch?? Minh', value: 1 }]}
                            onChange={(e) => {
                                setCity(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    <div className="customer__input--district col-span-1">
                        <label htmlFor="customer_district" className="text-base font-medium block">
                            Qu???n / Huy???n
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_district"
                            id=""
                            type="qu???n / huy???n"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            selectedValue={district}
                            options={[{ label: 'Qu???n 5', value: 1 }]}
                            onChange={(e) => {
                                setDistrict(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    <div className="customer__input--ward col-span-1">
                        <label htmlFor="customer_ward" className="text-base font-medium block">
                            Ph?????ng / X??
                        </label>
                        <Selectbox
                            isRequired={true}
                            name="customer_ward"
                            id=""
                            type="ph?????ng / x??"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            selectedValue={ward}
                            options={[{ label: 'Ph?????ng 4', value: 1 }]}
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
                            S??? ??i???n tho???i
                        </label>
                        <input
                            required
                            type="text"
                            name="customer_phone"
                            className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                            placeholder="S??? ??i???n tho???i"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        /> */}
                        <Input
                            label="S??? ??i???n tho???i"
                            required
                            type="text"
                            name="customer_phone"
                            placeholder="S??? ??i???n tho???i"
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
                    Quay v??? gi??? h??ng
                </Link>
                <Button type="primary" onClick={handleNext}>
                    Ti???p t???c ?????n ph????ng th???c v???n chuy???n
                </Button>
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
                <h3 className="font-bold text-xl">Ph????ng th???c v???n chuy???n</h3>
                <FormRadioDelivery
                    name="delivery"
                    optionsList={deliveryOpt}
                    isValued={true}
                    selectedValue={delivery.type}
                    onChange={handleDeliveryRadioChange}
                />
            </div>
            <div className="checkout__payment--form text-left mt-7">
                <h3 className="font-bold text-xl">Ph????ng th???c thanh to??n</h3>
                <FormRadioPayment
                    name="payment"
                    optionsList={paymentOpt}
                    selectedValue={paymentType}
                    onChange={handlePaymentRadioChange}
                />
            </div>
            <div className="checkout__customer--action flex justify-between mt-9 items-center">
                <div className="font-bold cursor-pointer" onClick={handleBack}>
                    Quay l???i
                </div>
                <button className="btn primary" type="submit">
                    Ho??n t???t ????n h??ng
                </button>
            </div>
        </>
    );
};
