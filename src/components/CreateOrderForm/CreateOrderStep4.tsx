import React, { useState } from 'react';
import { Option } from '../../types/Options';
import { PaymentEnum } from '../../types/enum/PaymentEnum';
import { FormInstance, Radio, RadioChangeEvent } from 'antd';

type Props = { formInstance: FormInstance };

const CreateOrderStep4 = ({ formInstance }: Props) => {
    const hasOnlinePayment = true;
    const [paymentType, setPaymentType] = useState(0);

    const paymentOpt: Option[] = Object.entries(PaymentEnum).map(([key, value]) => ({
        label: key,
        value: value,
    }));

    const handlePaymentRadioChange = (e: RadioChangeEvent) => {
        const selectedValue = parseInt(e.target.value);
        setPaymentType(selectedValue);
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     paymentType: selectedValue,
        // }));
    };
    return (
        <div>
            <Radio.Group
                onChange={handlePaymentRadioChange}
                value={paymentType.toString()}
                className="w-full border border-wh-gray rounded-lg mt-3"
            >
                {paymentOpt.map(
                    (option, index) =>
                        (!hasOnlinePayment && index === 0 && (
                            <Radio
                                key={option.value}
                                className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                                value={option.value}
                            >
                                {option.label}
                            </Radio>
                        )) ||
                        (hasOnlinePayment && (
                            <Radio
                                key={option.value}
                                className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                                value={option.value}
                            >
                                {option.label}
                            </Radio>
                        )),
                )}
            </Radio.Group>
        </div>
    );
};

export default CreateOrderStep4;
