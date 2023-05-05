import React, { useState, useEffect, useCallback } from 'react';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import { Button, Form, Input, Space, Spin, TimePicker, message } from 'antd';
import { OperatingDay } from '../../../types/OperatingDay';
import dayjs from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { ManagerOperatingHoursRequest } from '../../../models/Manager/ManagerOperatingHoursRequest';
import { updateMyCenterOperatings } from '../../../repositories/CenterRepository';

type Props = {};

type OperationHoursFormData = {
    operationHours: OperatingDay[];
};

const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

const format = 'HH:mm';

const CenterOperatingSettingsContainer = (props: Props) => {
    const [isLoading, setisLoading] = useState(true);
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState<OperationHoursFormData>({
        operationHours: [
            { day: 0, start: null, end: null },
            { day: 1, start: null, end: null },
            { day: 2, start: null, end: null },
            { day: 3, start: null, end: null },
            { day: 4, start: null, end: null },
            { day: 5, start: null, end: null },
            { day: 6, start: null, end: null },
        ],
    });

    useEffect(() => {
        setisLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
                setFormData({
                    operationHours: res.centerOperatingHours.map((ope) => {
                        return {
                            day: ope.day,
                            start: ope.start,
                            end: ope.end,
                        };
                    }),
                });
                setisLoading(false);
            })
            .catch(() => {
                message.error('Lỗi truy xuất thông tin, vui lòng thử lại sau');
            })
            .finally(() => {
                setisLoading(false);
            });
    }, [state]);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        console.log(formData);
        if (formData) {
            const req: ManagerOperatingHoursRequest = formData.operationHours.map((ope) => {
                return {
                    day: ope.day,
                    openTime: ope.start ? ope.start.slice(0, 5) : null,
                    closeTime: ope.end ? ope.end.slice(0, 5) : null,
                };
            });
            if (req.length === 7) {
                updateMyCenterOperatings(req)
                    .then(() => {
                        message.success('Cập nhật giờ hoạt động thành công');
                        forceUpdate();
                    })
                    .catch(() => {
                        message.error('Gặp sự cố trong quá trình cập nhật, vui lòng thử lại sau');
                    });
            } else {
                message.error('Gặp sự cố trong quá trình cập nhật, vui lòng thử lại sau');
            }
        }
    };

    const handleTimeOnChange = (operationDay: number, times: RangeValue<dayjs.Dayjs>) => {
        const newOperationHours = formData.operationHours.map((operationHour) => {
            if (operationHour.day === operationDay) {
                if (times) {
                    return {
                        ...operationHour,
                        start: times[0] ? times[0].format('HH:mm') : null,
                        end: times[1] ? times[1].format('HH:mm') : null,
                    };
                } else {
                    return {
                        ...operationHour,
                        start: null,
                        end: null,
                    };
                }
            } else {
                return operationHour;
            }
        });
        console.log(newOperationHours);

        setFormData({ ...formData, operationHours: newOperationHours });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[100px]">
                <Spin />
            </div>
        );
    }

    return (
        <div className="p-6 text-sub text-base">
            {!isLoading && myCenter && (
                <Form
                    name="delivery"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ weightPrices: myCenter?.centerDeliveryPrices }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="horizontal"
                >
                    <Form.Item label="Giờ hoạt động" style={{ maxWidth: 780 }}>
                        <Form.List name="operatingDays">
                            {(fields, { add }, { errors }) => {
                                if (fields.length < 7) {
                                    add();
                                    forceUpdate();
                                }
                                return (
                                    <>
                                        {fields.map((field) => (
                                            <Form.Item
                                                className="mb-3"
                                                key={`${field.key}`}
                                                name={[field.name, 'day']}
                                                validateTrigger={['onChange', 'onBlur']}
                                                noStyle
                                            >
                                                <TimePicker.RangePicker
                                                    format={format}
                                                    placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
                                                    onChange={(range) => {
                                                        handleTimeOnChange(field.name, range);
                                                    }}
                                                    defaultValue={
                                                        !formData.operationHours[field.key].start &&
                                                        !formData.operationHours[field.key].end
                                                            ? null
                                                            : [
                                                                  dayjs(
                                                                      formData.operationHours[field.key].start,
                                                                      'HH:mm',
                                                                  ),
                                                                  dayjs(
                                                                      formData.operationHours[field.key].end,
                                                                      'HH:mm',
                                                                  ),
                                                              ]
                                                    }
                                                    className="mb-3"
                                                />{' '}
                                                {days[field.name]}
                                            </Form.Item>
                                        ))}
                                    </>
                                );
                            }}
                        </Form.List>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 17, offset: 4 }} style={{ maxWidth: 780 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default CenterOperatingSettingsContainer;
