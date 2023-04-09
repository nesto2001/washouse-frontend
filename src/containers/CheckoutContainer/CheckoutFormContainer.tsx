import { QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
    Collapse,
    DatePickerProps,
    Form,
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WHButton from '../../components/Button';
import '../../components/Button/Button.scss';
import Input from '../../components/Input/Input';
import Selectbox from '../../components/Selectbox';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';
import { DeliveryOption } from '../../types/DeliveryOption';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';
import { OperatingDay } from '../../types/OperatingDay';
import { Option } from '../../types/Options';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';
import { PaymentEnum } from '../../types/enum/PaymentEnum';
import { getHour, getToday } from '../../utils/TimeUtils';
import './CheckoutContainer.scss';
import { DeliveryFormData } from '../../types/FormData/DeliveryFormData';
import { calcDeliveryPrice } from '../../repositories/OrderRepository';
import { DeliveryPriceRequest } from '../../models/Order/DeliveryPriceRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/CartStore';
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

type Step1Props = {
    formData: CheckoutFormData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    onNext: () => void;
};

export const Step1 = ({ formData, onNext, setFormData }: Step1Props) => {
    const [form] = Form.useForm();
    const [district, setDistrict] = useState(formData.district || 0);
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [wardList, setWardList] = useState<LocationPlaceModel[]>([]);

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
                            initialValue={formData.address}
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
                <Link to="/cart" className="font-bold text-base">
                    Quay về giỏ hàng
                </Link>
                <WHButton type="primary" onClick={handleNext}>
                    Tiếp tục đến phương thức vận chuyển
                </WHButton>
            </div>
        </Form>
    );
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

type Step2Props = {
    formData: CheckoutFormData;
    onBack: () => void;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    centerOperatingDays: OperatingDay[];
    onNext: () => void;
    centerHasDelivery: boolean;
};

const today = getToday();
const tomorrow = today + 1 > 6 ? 0 : today + 1;

type DisabledTime = (now: dayjs.Dayjs) => {
    disabledHours: () => number[];
    disabledMinutes: (selectedHour: number) => number[];
};

export const Step2 = ({
    formData,
    onBack,
    onNext,
    setFormData,
    centerOperatingDays,
    centerHasDelivery,
}: Step2Props) => {
    const [delivery, setDelivery] = useState(formData.deliveryType ?? 0);
    const [pickupDate, setPickupDate] = useState<string>(dateOptions[0].value);
    const [deliverDate, setDeliverDate] = useState<string>(dateOptions[0].value);
    const [hasDropoffTime, setHasDropoffTime] = useState<boolean>(false);
    const [hasDeliverTime, setHasDeliverTime] = useState<boolean>(false);
    const [closingHour, setClosingHour] = useState<string | null>();
    const [openingHour, setOpeningHour] = useState<string | null>();
    const [operatingDay, setOperatingDay] = useState<number>(today);
    const [district, setDistrict] = useState(0);
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [wardList, setWardList] = useState<LocationPlaceModel[]>([]);
    const [selectedDropoffTime, setSelectedDropoffTime] = useState<dayjs.Dayjs>();
    const [selectedDeliverTime, setSelectedDeliverTime] = useState<dayjs.Dayjs>();

    const [form] = Form.useForm();

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

    //fetch districtlist
    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictList(res);
        });
    }, []);

    //fetch wardlist
    useEffect(() => {
        const fetchData = async () => {
            return await getWards(formData.district);
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    }, []);

    //set ward on district chang
    const handleSelectDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, district: parseInt(event.target.value) }));
        const fetchData = async () => {
            return await getWards(parseInt(event.target.value));
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    };

    //set ward
    const handleSelectWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, wardId: parseInt(event.target.value) }));
    };

    //set city
    const handleSelectCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

    //back form
    const handleBack = () => {
        onBack();
    };

    const handleNext = () => {
        form.submit();
    };

    const onDateChange = (value: DatePickerProps['value'], dateString: string) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onDateOk = (value: DatePickerProps['value']) => {
        console.log('onOk: ', value);
    };

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
    const onDeliverDateSelectChange = (option: Option) => {
        console.log(option.value, option.label);
        if (option.label === 'Hôm nay') {
            setOperatingDay(today);
            setDeliverDate(option.value.toString());
        } else if (option.label === 'Ngày mai') {
            setOperatingDay(tomorrow);
            setDeliverDate(option.value.toString());
        }
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

    const handleDropoffSwitch = () => {
        setHasDropoffTime(!hasDropoffTime);
    };

    const handleDeliverSwitch = () => {
        setHasDeliverTime(!hasDeliverTime);
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setDelivery(e.target.value);
        setFormData((prev) => ({ ...prev, deliveryType: e.target.value }));
    };

    const onFinish = (values: any) => {
        console.log('submit');
        const dropoffTime =
            (values.dropoff?.date?.value ? values.deliver?.date?.value + ' ' : '') +
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
        const deliverAddress: DeliveryFormData = {
            addressString: values.deliver_address,
            deliveryType: true,
            wardId: values.deliver_ward,
        };
        if (dropoffAddress && deliverAddress) {
            setFormData((prev) => ({
                ...prev,
                deliveryInfo: [dropoffAddress, deliverAddress],
            }));
        } else if (dropoffAddress) {
            setFormData((prev) => ({
                ...prev,
                deliveryInfo: [dropoffAddress],
            }));
        } else if (deliverAddress) {
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
                                initialValue={formData.address}
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ lấy đơn' }]}
                                validateTrigger={['onBlur']}
                            >
                                <Input
                                    label="Địa chỉ"
                                    required
                                    type="text"
                                    name="dropoff_address"
                                    placeholder="Địa chỉ"
                                />
                            </Form.Item>
                        </div>
                        <div className="dropoff__address--city col-span-1">
                            <label htmlFor="dropoff_city" className="text-base font-medium block">
                                Tỉnh / Thành{' '}
                                <Tooltip
                                    title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                    className="ml-1"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </label>
                            <Form.Item
                                name="dropoff_city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                            >
                                <Selectbox
                                    isRequired={true}
                                    name="dropoff_city"
                                    id=""
                                    type="tỉnh / thành phố"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                    selectedValue={1}
                                    options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                    onChange={handleSelectCityChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="dropoff__address--district col-span-1">
                            <label htmlFor="dropoff_district" className="text-base font-medium block">
                                Quận / Huyện
                            </label>
                            <Form.Item
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
                                <Selectbox
                                    isRequired={true}
                                    name="dropoff_district"
                                    id=""
                                    type="quận / huyện"
                                    selectedValue={formData.district}
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                        <div className="dropoff__address--ward col-span-1">
                            <label htmlFor="dropoff_ward" className="text-base font-medium block">
                                Phường / Xã
                            </label>
                            <Form.Item
                                initialValue={formData.wardId}
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
                                <Selectbox
                                    isRequired={true}
                                    name="dropoff_ward"
                                    id=""
                                    type="phường / xã"
                                    selectedValue={formData.wardId}
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                );
            case 2:
                return (
                    <div className="deliver__address--location grid grid-cols-3 gap-x-6">
                        <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                        <div className="deliver__address col-span-3">
                            <Form.Item
                                name="deliver_address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trả đơn' }]}
                                initialValue={formData.address}
                                validateTrigger={['onBlur']}
                            >
                                <Input
                                    label="Địa chỉ"
                                    required
                                    type="text"
                                    name="deliver_address"
                                    placeholder="Địa chỉ"
                                />
                            </Form.Item>
                        </div>
                        <div className="deliver__address--city col-span-1">
                            <label htmlFor="deliver_city" className="text-base font-medium block">
                                Tỉnh / Thành{' '}
                                <Tooltip
                                    title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                    className="ml-1"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </label>
                            <Form.Item
                                name="deliver_city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                            >
                                <Selectbox
                                    isRequired={true}
                                    name="deliver_city"
                                    id=""
                                    type="tỉnh / thành phố"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                    selectedValue={1}
                                    options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                    onChange={handleSelectCityChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="deliver__address--district col-span-1">
                            <label htmlFor="deliver_district" className="text-base font-medium block">
                                Quận / Huyện
                            </label>
                            <Form.Item
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
                                <Selectbox
                                    isRequired={true}
                                    name="deliver_district"
                                    id=""
                                    selectedValue={formData.district}
                                    type="quận / huyện"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                        <div className="deliver__address--ward col-span-1">
                            <label htmlFor="deliver_ward" className="text-base font-medium block">
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
                                    name="deliver_ward"
                                    id=""
                                    selectedValue={formData.wardId}
                                    type="phường / xã"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                );
            case 3:
                return (
                    <>
                        <div className="dropoff__address--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                            <div className="dropoff__address col-span-3">
                                <Form.Item
                                    name="dropoff_address"
                                    initialValue={formData.address}
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ lấy đơn' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="dropoff_address"
                                        placeholder="Địa chỉ"
                                    />
                                </Form.Item>
                            </div>
                            <div className="dropoff__address--city col-span-1">
                                <label htmlFor="dropoff_city" className="text-base font-medium block">
                                    Tỉnh / Thành{' '}
                                    <Tooltip
                                        title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                        className="ml-1"
                                    >
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </label>
                                <Form.Item
                                    name="dropoff_city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
                                    <Selectbox
                                        isRequired={true}
                                        name="dropoff_city"
                                        id=""
                                        type="tỉnh / thành phố"
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                        selectedValue={1}
                                        options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                        onChange={handleSelectCityChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="dropoff__address--district col-span-1">
                                <label htmlFor="dropoff_district" className="text-base font-medium block">
                                    Quận / Huyện
                                </label>
                                <Form.Item
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
                                    <Selectbox
                                        isRequired={true}
                                        name="dropoff_district"
                                        id=""
                                        type="quận / huyện"
                                        selectedValue={formData.district}
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                            <div className="dropoff__address--ward col-span-1">
                                <label htmlFor="dropoff_ward" className="text-base font-medium block">
                                    Phường / Xã
                                </label>
                                <Form.Item
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
                                    <Selectbox
                                        isRequired={true}
                                        name="dropoff_ward"
                                        selectedValue={formData.wardId}
                                        id=""
                                        type="phường / xã"
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                        <div className="deliver__address--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                            <div className="deliver__address col-span-3">
                                <Form.Item
                                    name="deliver_address"
                                    initialValue={formData.address}
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trả đơn' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="deliver_address"
                                        placeholder="Địa chỉ"
                                    />
                                </Form.Item>
                            </div>
                            <div className="deliver__address--city col-span-1">
                                <label htmlFor="deliver_city" className="text-base font-medium block">
                                    Tỉnh / Thành{' '}
                                    <Tooltip
                                        title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                        className="ml-1"
                                    >
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </label>
                                <Form.Item
                                    name="deliver_city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
                                    <Selectbox
                                        isRequired={true}
                                        name="deliver_city"
                                        id=""
                                        type="tỉnh / thành phố"
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                        selectedValue={1}
                                        options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                        onChange={handleSelectCityChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="deliver__address--district col-span-1">
                                <label htmlFor="deliver_district" className="text-base font-medium block">
                                    Quận / Huyện
                                </label>
                                <Form.Item
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
                                    <Selectbox
                                        isRequired={true}
                                        name="deliver_district"
                                        selectedValue={formData.district}
                                        id=""
                                        type="quận / huyện"
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                            <div className="deliver__address--ward col-span-1">
                                <label htmlFor="deliver_ward" className="text-base font-medium block">
                                    Phường / Xã
                                </label>
                                <Form.Item
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
                                    <Selectbox
                                        selectedValue={formData.wardId}
                                        isRequired={true}
                                        name="deliver_ward"
                                        id=""
                                        type="phường / xã"
                                        className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
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
                    </>
                );
        }
    };

    return (
        <>
            <div className="checkout__delivery--form text-left">
                <h3 className="font-bold text-xl">Phương thức vận chuyển</h3>
                <Radio.Group
                    onChange={onChange}
                    value={formData.deliveryType ?? delivery}
                    className="w-full border border-wh-gray rounded-lg mt-3"
                >
                    {deliveryOpt.map(
                        (option, index) =>
                            (!centerHasDelivery && index === 0 && (
                                <Radio
                                    key={option.type}
                                    className="text-base w-full py-6 px-5 border-b border-wh-gray"
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
                    form={form}
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
                        <div className="col-span-1">
                            {/* <div className="delivery__form--header font-medium text-base mb-3">
                                Thời gian trả đơn{' '}
                                <Tooltip
                                    title={
                                        <span>
                                            Thời gian mong muốn đơn hàng hoàn tất xử lý và trả về
                                            <br />
                                            <br />
                                            Thời gian phải muộn hơn thời gian ước tính xử lý của đơn hàng
                                        </span>
                                    }
                                >
                                    <QuestionCircleOutlined className="ml-1" />
                                </Tooltip>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                Hẹn giờ trả: <Switch onClick={handleDeliverSwitch}></Switch>
                            </div>
                            {hasDeliverTime && (
                                <Space.Compact block>
                                    <Form.Item
                                        style={{ width: 120 }}
                                        name={['deliver', 'date']}
                                        initialValue={dateOptions[0]}
                                    >
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDeliverDateSelectChange}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow" name={['deliver', 'time']}>
                                        <TimePicker
                                            className="w-full"
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disabledTime}
                                            showNow={false}
                                            onSelect={(time: dayjs.Dayjs) => {
                                                setSelectedDeliverTime(time);
                                            }}
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            )} */}
                        </div>
                    </div>
                    {renderDeliveryForm()}
                </Form>
            </div>
            {/* <div className="checkout__payment--form text-left mt-7">
                <h3 className="font-bold text-xl">Phương thức thanh toán</h3>
                <Radio.Group
                    onChange={handlePaymentRadioChange}
                    value={paymentType.toString()}
                    className="w-full border border-wh-gray rounded-lg"
                >
                    {paymentOpt.map((option) => (
                        <Radio
                            key={option.value}
                            className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                            value={option.value}
                        >
                            {option.label}
                        </Radio>
                    ))}
                </Radio.Group>
            </div> */}
            <div className="checkout__customer--action flex justify-between mt-9 pb-12 items-center">
                <div className="font-bold cursor-pointer" onClick={handleBack}>
                    Quay lại
                </div>
                <WHButton type="primary" onClick={() => form.submit()}>
                    Tiếp tục đến phương thức thanh toán
                </WHButton>
            </div>
        </>
    );
};

type Step3Props = {
    hasOnlinePayment: boolean;
    formData: CheckoutFormData;
    onBack: () => void;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Step3 = ({ formData, hasOnlinePayment, onBack, setFormData, onSubmit }: Step3Props) => {
    const [paymentType, setPaymentType] = useState(formData.paymentType || 0);

    const paymentOpt: Option[] = Object.entries(PaymentEnum).map(([key, value]) => ({
        label: key,
        value: value,
    }));

    const handleBack = () => {
        onBack();
    };

    const handlePaymentRadioChange = (e: RadioChangeEvent) => {
        const selectedValue = parseInt(e.target.value);
        setPaymentType(selectedValue);
        setFormData((prevFormData) => ({
            ...prevFormData,
            paymentType: selectedValue,
        }));
    };
    return (
        <>
            <div className="checkout__payment--form text-left mt-7">
                <h3 className="font-bold text-xl">
                    Phương thức thanh toán{' '}
                    {!hasOnlinePayment && (
                        <Tooltip title="Trung tâm hiện không hỗ trợ các hình thức thanh toán khác ngoài thanh toán bằng tiền mặt">
                            <InfoCircleOutlined className="text-sub-gray text-base ml-1" />
                        </Tooltip>
                    )}
                </h3>
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
            <div className="checkout__customer--action flex justify-between mt-9 pb-12 items-center">
                <div className="font-bold cursor-pointer" onClick={handleBack}>
                    Quay lại
                </div>
                <WHButton type="primary" onClick={onSubmit}>
                    Đặt hàng
                </WHButton>
            </div>
        </>
    );
};
