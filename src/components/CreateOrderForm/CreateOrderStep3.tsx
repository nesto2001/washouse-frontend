import { Button, FormInstance, Radio, RadioChangeEvent, Space, TimePicker } from 'antd';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DeliveryOption } from '../../types/DeliveryOption';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';

type Props = {
    formInstance: FormInstance;
};

const CreateOrderStep3 = ({ formInstance }: Props) => {
    const [delivery, setDelivery] = useState(1);
    const [centerHasDelivery, setCenterHasDelivery] = useState(false);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setDelivery(e.target.value);
    };

    const deliveryOpt: DeliveryOption[] = [
        {
            type: DeliveryEnum.NO,
            title: 'Không sử dụng dịch vụ vận chuyển',
            children: <></>,
        },
        {
            type: DeliveryEnum.ONE_WAY_TO,
            title: 'Vận chuyển 1 chiều đi',
            children: <></>,
        },
        {
            type: DeliveryEnum.ONE_WAY_BACK,
            title: 'Vận chuyển 1 chiều về',
            children: <></>,
        },
        {
            type: DeliveryEnum.TWO_WAY,
            title: 'Vận chuyển 2 chiều',
            children: <></>,
        },
    ];

    return (
        <>
            <div>
                <Radio.Group
                    onChange={onChange}
                    value={delivery}
                    className="w-full border border-wh-gray rounded-lg mt-3"
                >
                    {deliveryOpt.map(
                        (option, index) =>
                            (!centerHasDelivery && index === 0 && (
                                <Radio
                                    key={option.type}
                                    className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                                    value={option.type}
                                >
                                    {option.title}
                                </Radio>
                            )) ||
                            (centerHasDelivery && (
                                <Radio
                                    key={option.type}
                                    className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                                    value={option.type}
                                >
                                    {option.title}
                                </Radio>
                            )),
                    )}
                </Radio.Group>
            </div>
            <div className="mt-6">
                <div className="mb-1">Thời gian lấy đơn:</div>
                <TimePicker format={'HH:mm'} style={{ width: 160 }} placeholder="Chọn thời gian" />
            </div>
            <div className="my-10 h-8">
                <Button className="float-right" type="primary">
                    Tiếp tục
                </Button>
            </div>
        </>
    );
};

export default CreateOrderStep3;
