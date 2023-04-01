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
import './CheckoutContainer.scss';
import Input from '../../components/Input/Input';
import {
    Collapse,
    DatePicker,
    DatePickerProps,
    Form,
    Radio,
    RadioChangeEvent,
    Select,
    Space,
    TimePicker,
    Tooltip,
} from 'antd';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { LocationModel } from '../../models/LocationModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { OperatingDay } from '../../types/OperatingDay';
import { getToday } from '../../utils/TimeUtils';
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
    { label: 'Hôm nay', value: dayjs().startOf('day').format('DD/MM/YYYY') },
    { label: 'Ngày mai', value: dayjs().add(1, 'day').startOf('day').format('DD/MM/YYYY') },
];

type Step2Props = {
    formData: CheckoutFormData;
    onBack: () => void;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    centerOperatingDays?: OperatingDay[];
};

const today = getToday();
const tomorrow = today + 1 > 6 ? 0 : today + 1;

type DisabledTime = (now: dayjs.Dayjs) => {
    disabledHours: () => number[];
    disabledMinutes: (selectedHour: number) => number[];
};

export const Step2 = ({ formData, onBack, setFormData, centerOperatingDays }: Step2Props) => {
    const [delivery, setDelivery] = useState(0);
    const [pickupDate, setPickupDate] = useState<string>(dateOptions[0].value);
    const [openingHour, setOpeningHour] = useState<string>();
    const [closingHour, setClosingHour] = useState<string>();
    const [operatingDay, setOperatingDay] = useState<number>(today);
    const [paymentType, setPaymentType] = useState(formData.paymentType || 1);
    const [district, setDistrict] = useState(0);
    const [districtList, setDistrictList] = useState<LocationModel[]>([]);
    const [wardList, setWardList] = useState<LocationModel[]>([]);
    const { Panel } = Collapse;
    const { Option } = Select;

    useEffect(() => {
        if (
            centerOperatingDays &&
            centerOperatingDays[operatingDay].start !== null &&
            centerOperatingDays[operatingDay].end !== null
        ) {
            setOpeningHour(centerOperatingDays[operatingDay].start ?? '');
            setClosingHour(centerOperatingDays[operatingDay].end ?? '');
        }
    }, [operatingDay]);

    // const disabledTime = (date: dayjs.Dayjs): DisabledTime => {
    //     const now = dayjs();
    //     const isToday = now.isSame(dayjs(date), 'day');
    //     const disabledHours: number[] = [];
    //     const disabledMinutes: number[] = [];
    //     if (openingHour && closingHour) {
    //         const openingTime: dayjs.Dayjs = isToday
    //             ? now.hour(Number(openingHour?.slice(0, 2))).startOf('hour')
    //             : now.startOf('day').hour(Number(openingHour?.slice(0, 2)));
    //         const closingTime: dayjs.Dayjs = isToday
    //             ? now.hour(Number(closingHour?.slice(0, 2))).startOf('hour')
    //             : now.endOf('day').hour(Number(closingHour?.slice(0, 2)));

    //         for (let hour = 0; hour < openingTime.hour(); hour++) {
    //             disabledHours.push(hour);
    //         }
    //         for (let hour = closingTime.hour() + 1; hour < 24; hour++) {
    //             disabledHours.push(hour);
    //         }
    //         if (now.isSame(openingTime, 'hour')) {
    //             for (let minute = 0; minute < openingTime.minute(); minute += 15) {
    //                 disabledMinutes.push(minute);
    //             }
    //         }
    //         if (now.isSame(closingTime, 'hour')) {
    //             for (let minute = closingTime.minute() + 1; minute <= 45; minute += 15) {
    //                 disabledMinutes.push(minute);
    //             }
    //         }
    //         return {
    //             disabledHours: () => disabledHours,
    //             disabledMinutes: (selectedHour: number) => {
    //                 if (selectedHour === openingTime.hour()) {
    //                     return disabledMinutes;
    //                 } else {
    //                     return [];
    //                 }
    //             },
    //         };
    //     }
    //     return {
    //         disabledHours: () => disabledHours,
    //         disabledMinutes: () => disabledMinutes,
    //     };
    // };

    function disabledTime(date: dayjs.Dayjs) {
        if (date && date.format('YYYY-MM-DD') === '2021-04-17') {
        }
    }

    //dem cai disable nay vo state de đổi pickup date thì đổi luôn disable
    const disable: (date: dayjs.Dayjs) => DisabledTime | undefined = (date) => {
        const pickedDate = date.format('DD/MM/YYYY');
        const currentTime = dayjs().format('HH:mm');
        if (pickedDate === dateOptions[0].value) {
            const dis: DisabledTime = () => {
                const disabledHours = () => {
                    // Disable hours before 9 AM and after 6 PM
                    const hours: number[] = [];
                    for (let i = 0; i < 24; i++) {
                        if (i < Number(currentTime?.slice(0, 2)) || i > Number(closingHour?.slice(0, 2))) {
                            hours.push(i);
                        }
                    }
                    return hours;
                };

                const disabledMinutes = (selectedHour: number) => {
                    if (selectedHour === Number(currentTime.slice(0, 2))) {
                        // Disable minutes when selected hour is 9 AM or 6 PM
                        const startMinute = Math.ceil(Number(currentTime.slice(3)) / 15) * 15;
                        const disabled = [];
                        for (let i = 0; i < startMinute; i += 15) {
                            disabled.push(i);
                        }
                    }
                    return [];
                };
                return { disabledHours, disabledMinutes };
            };
            return dis;
        } else if (pickedDate === dateOptions[1].value) {
            const dis: DisabledTime = () => {
                const disabledHours = () => {
                    // Disable hours before 9 AM and after 6 PM
                    const hours: number[] = [];
                    for (let i = 0; i < 24; i++) {
                        if (i < Number(openingHour?.slice(0, 2)) || i > Number(closingHour?.slice(0, 2))) {
                            hours.push(i);
                        }
                    }
                    return hours;
                };

                const disabledMinutes = (selectedHour: number) => {
                    // Disable minutes when selected hour is 9 AM or 6 PM

                    return [];
                };
                return { disabledHours, disabledMinutes };
            };
            return dis;
        } else {
            return;
        }
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

    const handleBack = () => {
        onBack();
    };

    const onDateChange = (value: DatePickerProps['value'], dateString: string) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onDateOk = (value: DatePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const onDateSelectchange = (option: Option) => {
        console.log(option.value, option.label);
        if (option.label === 'Hôm nay') {
            setOperatingDay(today);
            setPickupDate(option.value.toString());
        } else if (option.label === 'Ngày mai') {
            setOperatingDay(tomorrow);
            setPickupDate(option.value.toString());
        }
    };

    //delivery === 0 hiện form thời gian thôi, === 1 hiện thời gian với địa chỉ lấy, === 2 hiện thời gian với địa chỉ nhận, === 3 hiện thời gian và cả 2 địa chỉ lấy và nhận
    const deliveryOpt: DeliveryOption[] = [
        {
            type: DeliveryEnum.NO,
            title: 'Không sử dụng dịch vụ vận chuyển',
            children: (
                <>
                    {delivery === 0 && (
                        <Form>
                            <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                                <div className="col-span-1">
                                    <Space.Compact>
                                        <Form.Item
                                            validateTrigger={['onChange', 'onBlur']}
                                            noStyle
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thời gian ước tính xử lý',
                                                },
                                            ]}
                                        >
                                            <Form.Item style={{ width: 160 }}>
                                                <Select
                                                    labelInValue
                                                    options={dateOptions}
                                                    onChange={onDateSelectchange}
                                                    defaultValue={dateOptions[0]}
                                                ></Select>
                                            </Form.Item>
                                            <Form.Item>
                                                <TimePicker
                                                    defaultValue={dayjs('12:08', format)}
                                                    format={format}
                                                    minuteStep={5}
                                                    disabledTime={disable(dayjs(pickupDate, 'DD/MM/YYYY'))}
                                                />
                                            </Form.Item>
                                            {/* <TimePicker
                                                format={format}
                                                placeholder={'Giờ lấy đon'}
                                                // onChange={(range) => handleTimeOnChange(day, range)}
                                            /> */}
                                        </Form.Item>
                                    </Space.Compact>
                                </div>
                                <div className="col-span-1">
                                    <Space.Compact>
                                        <Form.Item
                                            validateTrigger={['onChange', 'onBlur']}
                                            noStyle
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thời gian ước tính xử lý',
                                                },
                                            ]}
                                        >
                                            <Form.Item style={{ width: 160 }}>
                                                <Select
                                                    labelInValue
                                                    options={dateOptions}
                                                    onChange={onDateSelectchange}
                                                    defaultValue={dateOptions[0]}
                                                ></Select>
                                            </Form.Item>
                                            <Form.Item>
                                                <TimePicker
                                                    defaultValue={dayjs('12:08', format)}
                                                    format={format}
                                                    minuteStep={5}
                                                />
                                            </Form.Item>
                                            {/* <TimePicker
                                                format={format}
                                                placeholder={'Giờ lấy đon'}
                                                // onChange={(range) => handleTimeOnChange(day, range)}
                                            /> */}
                                        </Form.Item>
                                    </Space.Compact>
                                </div>
                            </div>
                            <div className="customer__input--location grid grid-cols-3 gap-x-6">
                                <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                                <div className="customer__input--address col-span-3">
                                    <Form.Item
                                        name="address"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                        validateTrigger={['onBlur']}
                                    >
                                        <Input
                                            label="Địa chỉ"
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
                                    <Form.Item
                                        name="city"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                    >
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
                            <div className="customer__input--location grid grid-cols-3 gap-x-6">
                                <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                                <div className="customer__input--address col-span-3">
                                    <Form.Item
                                        name="address"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                        validateTrigger={['onBlur']}
                                    >
                                        <Input
                                            label="Địa chỉ"
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
                                    <Form.Item
                                        name="city"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                    >
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
                        </Form>
                    )}
                </>
            ),
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

    const paymentOpt: Option[] = Object.entries(PaymentEnum).map(([key, value]) => ({
        label: key,
        value: value,
    }));

    const handlePaymentRadioChange = (e: RadioChangeEvent) => {
        const selectedValue = parseInt(e.target.value);
        setPaymentType(selectedValue);
        setFormData((prevFormData) => ({
            ...prevFormData,
            paymentType: selectedValue,
        }));
    };
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setDelivery(e.target.value);
    };

    const renderDeliveryForm = () => {
        switch (delivery) {
            case 0:
                return (
                    <Form>
                        <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian giao đơn{' '}
                                    <Tooltip title="Thời gian bạn dự định sẽ mang đồ đến trung tâm">
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker
                                            className="w-full"
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disable(dayjs(pickupDate, 'DD/MM/YYYY'))}
                                        />
                                    </Form.Item>
                                    {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                </Space.Compact>
                                Càng sớm càng tốt:
                                <input type="checkbox" value="abc" />
                            </div>
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian trả đơn{' '}
                                    <Tooltip
                                        title={
                                            <span>
                                                Thời gian mà bạn mong muốn nhận đồ về
                                                <br />
                                                <br />
                                                Thời gian phải muộn hơn thời gian ước tính xử lý của đơn hàng
                                            </span>
                                        }
                                    >
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker className="w-full" format={format} minuteStep={5} />
                                        {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                    </Form.Item>
                                </Space.Compact>
                            </div>
                        </div>
                    </Form>
                );
            case 1:
                return (
                    <Form>
                        <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian giao đơn{' '}
                                    <Tooltip title="Thời gian bạn dự định sẽ mang đồ đến trung tâm">
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker
                                            className="w-full"
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disable(dayjs(pickupDate, 'DD/MM/YYYY'))}
                                        />
                                    </Form.Item>
                                    {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                </Space.Compact>
                            </div>
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian trả đơn{' '}
                                    <Tooltip
                                        title={
                                            <span>
                                                Thời gian mà bạn mong muốn nhận đồ về
                                                <br />
                                                <br />
                                                Thời gian phải muộn hơn thời gian ước tính xử lý của đơn hàng
                                            </span>
                                        }
                                    >
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker className="w-full" format={format} minuteStep={5} />
                                        {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                    </Form.Item>
                                </Space.Compact>
                            </div>
                        </div>
                        <div className="customer__input--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                            <div className="customer__input--address col-span-3">
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="customer_lname"
                                        placeholder="Địa chỉ"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }));
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
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
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
                    </Form>
                );
            case 2:
                return (
                    <Form>
                        <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian giao đơn{' '}
                                    <Tooltip title="Thời gian bạn dự định sẽ mang đồ đến trung tâm">
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker
                                            className="w-full"
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disable(dayjs(pickupDate, 'DD/MM/YYYY'))}
                                        />
                                    </Form.Item>
                                    {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                </Space.Compact>
                            </div>
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian trả đơn{' '}
                                    <Tooltip
                                        title={
                                            <span>
                                                Thời gian mà bạn mong muốn nhận đồ về
                                                <br />
                                                <br />
                                                Thời gian phải muộn hơn thời gian ước tính xử lý của đơn hàng
                                            </span>
                                        }
                                    >
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker className="w-full" format={format} minuteStep={5} />
                                        {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                    </Form.Item>
                                </Space.Compact>
                            </div>
                        </div>
                        <div className="customer__input--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                            <div className="customer__input--address col-span-3">
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="customer_lname"
                                        placeholder="Địa chỉ"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }));
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
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
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
                    </Form>
                );
            case 3:
                return (
                    <Form>
                        <div className="delivery__form--time grid grid-cols-2 gap-x-6">
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian giao đơn{' '}
                                    <Tooltip title="Thời gian bạn dự định sẽ mang đồ đến trung tâm">
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker
                                            className="w-full"
                                            format={format}
                                            minuteStep={5}
                                            disabledTime={disable(dayjs(pickupDate, 'DD/MM/YYYY'))}
                                        />
                                    </Form.Item>
                                    {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                </Space.Compact>
                            </div>
                            <div className="col-span-1">
                                <div className="delivery__form--header font-medium text-base mb-3">
                                    Thời gian trả đơn{' '}
                                    <Tooltip
                                        title={
                                            <span>
                                                Thời gian mà bạn mong muốn nhận đồ về
                                                <br />
                                                <br />
                                                Thời gian phải muộn hơn thời gian ước tính xử lý của đơn hàng
                                            </span>
                                        }
                                    >
                                        <QuestionCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </div>
                                <Space.Compact block>
                                    <Form.Item style={{ width: 120 }}>
                                        <Select
                                            labelInValue
                                            options={dateOptions}
                                            onChange={onDateSelectchange}
                                            defaultValue={dateOptions[0]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item className="flex-grow">
                                        <TimePicker className="w-full" format={format} minuteStep={5} />
                                        {/* <TimePicker
                                format={format}
                                placeholder={'Giờ lấy đon'}
                                // onChange={(range) => handleTimeOnChange(day, range)}
                            /> */}
                                    </Form.Item>
                                </Space.Compact>
                            </div>
                        </div>
                        <div className="customer__input--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ lấy đơn</div>
                            <div className="customer__input--address col-span-3">
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="customer_lname"
                                        placeholder="Địa chỉ"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }));
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
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
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
                        <div className="customer__input--location grid grid-cols-3 gap-x-6">
                            <div className="delivery__form--header font-bold text-base mb-3">Địa chỉ trả đơn</div>
                            <div className="customer__input--address col-span-3">
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                    validateTrigger={['onBlur']}
                                >
                                    <Input
                                        label="Địa chỉ"
                                        required
                                        type="text"
                                        name="customer_lname"
                                        placeholder="Địa chỉ"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }));
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
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                >
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
                    </Form>
                );
        }
    };

    return (
        <>
            <div className="checkout__delivery--form text-left">
                <h3 className="font-bold text-xl">Phương thức vận chuyển</h3>
                <Radio.Group
                    onChange={onChange}
                    value={delivery}
                    className="w-full border border-wh-gray rounded-lg mt-3"
                >
                    {deliveryOpt.map((option) => (
                        <Radio
                            key={option.type}
                            className="text-base w-full py-6 px-5 border-b border-wh-gray last:border-none"
                            value={option.type}
                        >
                            {option.title}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            <div className="checkout__delivery--form text-left">
                <h3 className="font-bold text-xl my-3 mt-6">Thông tin vận chuyển</h3>
                {renderDeliveryForm()}
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
