import { QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
    Button,
    DatePickerProps,
    Form,
    FormInstance,
    Input,
    Radio,
    RadioChangeEvent,
    Select,
    Space,
    Switch,
    TimePicker,
    Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DeliveryOption } from '../../types/DeliveryOption';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';
import Selectbox from '../Selectbox';
import { getHour, getToday } from '../../utils/TimeUtils';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';
import { useSelector } from 'react-redux';
import { OperatingDay } from '../../types/OperatingDay';
import { RootState } from '../../store/CartStore';
import { DeliveryFormData } from '../../types/FormData/DeliveryFormData';
import { DeliveryPriceRequest } from '../../models/Order/DeliveryPriceRequest';
import { calcDeliveryPrice } from '../../repositories/OrderRepository';
import { Option } from '../../types/Options';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

type Props = {
    formInstance: FormInstance;
    formData: CheckoutFormData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    centerHasDelivery: boolean;
    centerOperatingDays: OperatingDay[];
    onNext: () => void;
    onBack: () => void;
};

const format = 'HH:mm';
const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const currentDate = dayjs();
const minDate = currentDate.add(15, 'minute');
const maxDate = currentDate.add(1, 'day').hour(23).minute(0).second(0);
const dateTimeFormat = 'DD/MM/YYYY HH:mm';
const customFormat: DatePickerProps['format'] = (value) => `${value.format(dateTimeFormat)}`;

const dateOptions = [
    { label: 'Hôm nay', value: dayjs().startOf('day').format('DD-MM-YYYY') },
    { label: 'Ngày mai', value: dayjs().add(1, 'day').startOf('day').format('DD-MM-YYYY') },
];

const today = getToday();
const tomorrow = today + 1 > 6 ? 0 : today + 1;

type DisabledTime = (now: dayjs.Dayjs) => {
    disabledHours: () => number[];
    disabledMinutes: (selectedHour: number) => number[];
};

const CreateOrderStep3 = ({
    formInstance,
    onBack,
    onNext,
    formData,
    centerHasDelivery,
    centerOperatingDays,
    setFormData,
}: Props) => {
    const [delivery, setDelivery] = useState(formData.deliveryType ?? 0);
    const [pickupDate, setPickupDate] = useState<string>(dateOptions[0].value);
    const [hasDropoffTime, setHasDropoffTime] = useState<boolean>(false);
    const [closingHour, setClosingHour] = useState<string | null>();
    const [openingHour, setOpeningHour] = useState<string | null>();
    const [operatingDay, setOperatingDay] = useState<number>(today);
    const [district, setDistrict] = useState(0);
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [deliDistrictList, setDeliDistrictList] = useState<LocationPlaceModel[]>([]);
    const [dropWardList, setDropWardList] = useState<LocationPlaceModel[]>([]);
    const [deliWardList, setDeliWardList] = useState<LocationPlaceModel[]>([]);
    const [selectedDropoffTime, setSelectedDropoffTime] = useState<dayjs.Dayjs>();
    const [selectedDeliverTime, setSelectedDeliverTime] = useState<dayjs.Dayjs>();

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

    const handleBack = () => {
        onBack();
    };

    const handleNext = () => {
        onNext();
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictList(res);
            setDeliDistrictList(res);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            return await getWards(formData.district);
        };
        fetchData().then((res) => {
            setDropWardList(res);
        });
    }, []);

    const cartCenterId = useSelector((state: RootState) => state.cart.centerId);
    const cartTotalWeight = useSelector((state: RootState) => state.cart.totalWeight);

    useEffect(() => {
        if (centerOperatingDays) {
            setOpeningHour(centerOperatingDays[operatingDay].start);
            setClosingHour(centerOperatingDays[operatingDay].end);
        }
    }, [operatingDay]);

    const disabledTime = (now: dayjs.Dayjs) => {
        var minuteList: number[] = [];

        for (var i = 0; i < 60; i++) {
            minuteList.push(i);
        }
        if (pickupDate === dateOptions[0].value) {
            return {
                disabledHours: () => {
                    var hours = [];
                    var openingHourNumber = getHour(openingHour);
                    for (var i = 0; i < 24; i++) {
                        if (
                            i < (now.hour() > openingHourNumber ? now.hour() : openingHourNumber) ||
                            i >= getHour(closingHour)
                        ) {
                            hours.push(i);
                        }
                    }

                    return hours;
                },
                disabledMinutes: () => {
                    var minutes = [];
                    var selectedHour = selectedDropoffTime?.hour();
                    if (!selectedHour) {
                        return minuteList;
                    } else if (selectedHour === now.hour()) {
                        for (var i = 0; i < now.minute() + 15; i++) {
                            minutes.push(i);
                        }
                    }
                    return minutes;
                },
            };
        }
        if (pickupDate === dateOptions[1].value) {
            return {
                disabledHours: () => {
                    var hours = [];

                    for (var i = 0; i < 24; i++) {
                        if (i < getHour(openingHour) || i >= getHour(closingHour)) {
                            hours.push(i);
                        }
                    }
                    return hours;
                },
                disabledMinutes: () => {
                    if (!selectedDropoffTime?.hour()) {
                        return minuteList;
                    }
                    return [];
                },
            };
        }
        return {
            disabledHours: () => [],
            disabledMinutes: () => [],
        };
    };

    const handleSelectDistrictChange = (value: number) => {
        const fetchData = async () => {
            return await getWards(value);
        };
        fetchData().then((res) => {
            setDropWardList(res);
        });
    };

    const handleSelectDeliDistrictChange = (value: number) => {
        const fetchData = async () => {
            return await getWards(value);
        };
        fetchData().then((res) => {
            setDeliWardList(res);
        });
    };

    //set ward
    const handleSelectWardChange = (value: number) => {};

    //set city
    const handleSelectCityChange = (value: number) => {};

    const onDateSelectChange = (option: Option) => {
        console.log(option.value, option.label);
        if (option.label === 'Hôm nay') {
            setOperatingDay(today);
            setPickupDate(option.value.toString());
        } else if (option.label === 'Ngày mai') {
            setOperatingDay(tomorrow);
            setPickupDate(option.value.toString());
        }
    };

    const handleDropoffSwitch = () => {
        setHasDropoffTime(!hasDropoffTime);
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setDelivery(e.target.value);
        setFormData((prev) => ({ ...prev, deliveryType: e.target.value }));
    };

    const onFinish = (values: any) => {
        console.log(values);
        const dropoffTime =
            (values.dropoff?.date?.value ? values.dropoff?.date?.value + ' ' : '') +
                (selectedDropoffTime?.format('HH:mm:ss') ?? '') ?? undefined;
        const deliverTime =
            (values.deliver?.date?.value ? values.deliver?.date?.value + ' ' : '') +
                (selectedDeliverTime?.format('HH:mm:ss') ?? '') ?? undefined;
        if (dropoffTime && deliverTime) {
            setFormData((prev) => ({
                ...prev,
                preferredDropoffTime: dropoffTime,
                preferredDeliverTime: deliverTime,
            }));
        } else if (dropoffTime) {
            setFormData((prev) => ({
                ...prev,
                preferredDropoffTime: dropoffTime,
            }));
        } else if (deliverTime) {
            setFormData((prev) => ({
                ...prev,
                preferredDeliverTime: deliverTime,
            }));
        }
        const dropoffAddress: DeliveryFormData = {
            addressString: values.dropoff_address,
            deliveryType: false,
            wardId: values.dropoff_ward,
        };
        console.log(dropoffAddress, 'dropaddr');
        const deliverAddress: DeliveryFormData = {
            addressString: values.deliver_address,
            deliveryType: true,
            wardId: values.deliver_ward,
        };
        console.log(deliverAddress, 'deliaddr');

        if (dropoffAddress && dropoffAddress.wardId && deliverAddress && deliverAddress.wardId) {
            setFormData((prev) => ({
                ...prev,
                deliveryInfo: [dropoffAddress, deliverAddress],
            }));
        } else if (dropoffAddress && dropoffAddress.wardId) {
            setFormData((prev) => ({
                ...prev,
                deliveryInfo: [dropoffAddress],
            }));
        } else if (deliverAddress && deliverAddress.wardId) {
            setFormData((prev) => ({
                ...prev,
                deliveryInfo: [deliverAddress],
            }));
        }
        const deliveryInfoRequest: DeliveryPriceRequest = {
            centerId: cartCenterId,
            dropoffAddress: dropoffAddress.addressString,
            dropoffWardId: dropoffAddress.wardId,
            deliverAddress: deliverAddress.addressString,
            deliverWardId: deliverAddress.wardId,
            deliveryType: delivery,
            totalWeight: cartTotalWeight,
        };
        const calculateDeliveryPrice = async () => {
            return await calcDeliveryPrice(deliveryInfoRequest);
        };
        calculateDeliveryPrice().then((res) => {
            setFormData((prev) => ({ ...prev, deliveryPrice: res.deliveryPrice }));
            onNext();
        });
    };

    const onFinishFailed = (values: any) => {
        console.log('failed');
    };

    const renderDeliveryForm = () => {
        switch (delivery) {
            case 0:
                break;
            case 1:
                return (
                    <div className="dropoff__address--location grid grid-cols-3 gap-x-6">
                        <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                        <div className="dropoff__address col-span-3">
                            <Form.Item
                                name="dropoff_address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ lấy đơn' }]}
                                validateTrigger={['onBlur']}
                            >
                                <Input required type="text" name="dropoff_address" placeholder="Địa chỉ" />
                            </Form.Item>
                        </div>
                        <div className="dropoff__address--city col-span-1">
                            <Form.Item
                                tooltip="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh"
                                label="Tỉnh / Thành"
                                name="dropoff_city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                initialValue={1}
                            >
                                <Select
                                    options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                    placeholder="Chọn tỉnh / thành phố"
                                    onChange={handleSelectCityChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="dropoff__address--district col-span-1">
                            <Form.Item
                                label="Quận / Huyện"
                                name="dropoff_district"
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
                                <Select
                                    id=""
                                    placeholder="Chọn quận / huyện"
                                    options={districtList.map((district) => {
                                        return {
                                            value: district.id,
                                            label: district.name,
                                        };
                                    })}
                                    onChange={handleSelectDistrictChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="dropoff__address--ward col-span-1">
                            <Form.Item
                                label="Phường / Xã"
                                name="dropoff_ward"
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
                                <Select
                                    placeholder="Chọn phường / xã"
                                    options={dropWardList.map((ward) => {
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
                );
            case 2:
                return (
                    <div className="deliver__address--location grid grid-cols-3 gap-x-6">
                        <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                        <div className="deliver__address col-span-3">
                            <Form.Item
                                name="deliver_address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trả đơn' }]}
                                validateTrigger={['onBlur']}
                            >
                                <Input required type="text" name="deliver_address" placeholder="Địa chỉ" />
                            </Form.Item>
                        </div>
                        <div className="deliver__address--city col-span-1">
                            <Form.Item
                                label="Tỉnh / Thành"
                                tooltip="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh"
                                name="deliver_city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                initialValue={1}
                            >
                                <Select
                                    placeholder="Chọn tỉnh / thành phố"
                                    options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                    onChange={handleSelectCityChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="deliver__address--district col-span-1">
                            <Form.Item
                                label="Quận / Huyện"
                                name="deliver_district"
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
                                <Select
                                    placeholder="Chọn quận / huyện"
                                    options={deliDistrictList.map((district) => {
                                        return {
                                            value: district.id,
                                            label: district.name,
                                        };
                                    })}
                                    onChange={handleSelectDeliDistrictChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="deliver__address--ward col-span-1">
                            <Form.Item
                                label="Phường / Xã"
                                name="deliver_ward"
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
                                <Select
                                    placeholder="Chọn phường / xã"
                                    options={deliWardList.map((ward) => {
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
                );
            case 3:
                return (
                    <>
                        <div className="dropoff__address--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                            <div className="dropoff__address col-span-3">
                                <Form.Item
                                    name="dropoff_address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ lấy đơn' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input required type="text" name="dropoff_address" placeholder="Địa chỉ" />
                                </Form.Item>
                            </div>
                            <div className="dropoff__address--city col-span-1">
                                <Form.Item
                                    label="Tỉnh / Thành"
                                    tooltip="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh"
                                    name="dropoff_city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                    initialValue={1}
                                >
                                    <Select
                                        placeholder="Chọn tỉnh / thành phố"
                                        options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                        onChange={handleSelectCityChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="dropoff__address--district col-span-1">
                                <Form.Item
                                    label="Quận / Huyện"
                                    name="dropoff_district"
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
                                    <Select
                                        placeholder="Chọn quận / huyện"
                                        options={districtList.map((district) => {
                                            return {
                                                value: district.id,
                                                label: district.name,
                                            };
                                        })}
                                        onChange={handleSelectDistrictChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="dropoff__address--ward col-span-1">
                                <Form.Item
                                    label="Phường / Xã"
                                    name="dropoff_ward"
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
                                    <Select
                                        placeholder="Chọn phường / xã"
                                        options={dropWardList.map((ward) => {
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
                        <div className="deliver__address--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                            <div className="deliver__address col-span-3">
                                <Form.Item
                                    name="deliver_address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trả đơn' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input type="text" name="deliver_address" placeholder="Địa chỉ" />
                                </Form.Item>
                            </div>
                            <div className="deliver__address--city col-span-1">
                                <Form.Item
                                    label="Tỉnh / Thành"
                                    tooltip="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh"
                                    name="deliver_city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                    initialValue={1}
                                >
                                    <Select
                                        placeholder="Chọn tỉnh / thành phố"
                                        options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                        onChange={handleSelectCityChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="deliver__address--district col-span-1">
                                <Form.Item
                                    label="Quận / Huyện"
                                    name="deliver_district"
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
                                    <Select
                                        placeholder="Chọn quận / huyện"
                                        options={deliDistrictList.map((district) => {
                                            return {
                                                value: district.id,
                                                label: district.name,
                                            };
                                        })}
                                        onChange={handleSelectDeliDistrictChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="deliver__address--ward col-span-1">
                                <Form.Item
                                    label="Phường / Xã"
                                    name="deliver_ward"
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
                                    <Select
                                        placeholder="Chọn phường / xã"
                                        options={deliWardList.map((ward) => {
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
                    </>
                );
        }
    };

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
            <div className="checkout__delivery--form text-left">
                <h3 className="font-bold text-xl my-3 mt-6">Thông tin vận chuyển</h3>
                <Form
                    form={formInstance}
                    name="delivery"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    layout="vertical"
                    initialValues={{ dropoff_city: 1, deliver_city: 1 }}
                >
                    <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                        <div className="col-span-1">
                            <div className="delivery__form--header font-medium text-base mb-3">
                                Thời gian gửi đơn{' '}
                                <Tooltip title="Thời gian đồ sẽ được gửi về trung tâm">
                                    <QuestionCircleOutlined className="ml-1" />
                                </Tooltip>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                Hẹn giờ gửi: <Switch onClick={handleDropoffSwitch}></Switch>
                            </div>
                            {hasDropoffTime && (
                                <Space.Compact block>
                                    <Form.Item
                                        style={{ width: 120 }}
                                        name={['dropoff', 'date']}
                                        initialValue={dateOptions[0]}
                                    >
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectChange}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow" name={['dropoff', 'time']}>
                                        <TimePicker
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disabledTime}
                                            showNow={false}
                                            onSelect={(time: dayjs.Dayjs) => {
                                                setSelectedDropoffTime(time);
                                            }}
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            )}
                        </div>
                    </div>
                    {renderDeliveryForm()}
                </Form>
            </div>
            <div className="my-10 h-8">
                <Button className="float-right ml-6" type="primary" onClick={handleNext}>
                    Tiếp tục
                </Button>
                <Button className="float-right" type="default" style={{ background: 'white' }} onClick={handleBack}>
                    Quay lại
                </Button>
            </div>
        </>
    );
};

export default CreateOrderStep3;
