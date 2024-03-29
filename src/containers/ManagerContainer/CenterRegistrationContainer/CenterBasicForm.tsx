import { PlusOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input, TimePicker, Upload, UploadFile, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import dayjs from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { CreateCenterFormData } from '.';
import { uploadSingle } from '../../../repositories/MediaRepository';

const format = 'HH:mm';

type Props = {
    formData: CreateCenterFormData;
    setFormData: React.Dispatch<React.SetStateAction<CreateCenterFormData>>;
    setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
    formInstance: FormInstance;
};

const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const CenterBasicForm = ({ setFormData, setIsValidated, formData, formInstance }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>(
        formData.image
            ? [
                  {
                      uid: '1',
                      name: 'centerImage',
                      status: 'done',
                      url: formData.image,
                  },
              ]
            : [],
    );
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const handleChange = (info: UploadChangeParam) => {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`Tải hình ảnh ${info.file.name} thành công.`);
        } else if (status === 'error') {
            message.error(`Tải hình ảnh ${info.file.name} thất bại.`);
        }
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show the last recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    const onFinish = (values: any) => {
        const file = fileList[0]?.originFileObj;
        if (file) {
            const uploadFile = async () => {
                return await uploadSingle(file);
            };
            uploadFile().then((res) => {
                setFormData({ ...formData, savedImage: res.data.data.savedFileName, image: res.data.data.signedUrl });
            });
        }
        console.log('Success:', values);
        setIsValidated(true);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setIsValidated(false);
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

    useEffect(() => {
        setIsValidated(false);
    }, []);

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;
        const targetValue = target.value;
        console.log(targetValue);
        if (e.key !== 'Backspace') {
            if (targetValue.length > 9) {
                if (targetValue.includes('-')) {
                    const substrings = targetValue.split('-');
                    target.value = (substrings[0] + '-' + substrings[1]).slice(0, 13);
                } else {
                    const substrings = [targetValue.slice(0, 10), targetValue.slice(10)];
                    target.value = substrings[0] + '-' + substrings[1];
                }
            }
        }
    };

    return (
        <div className="p-6 text-sub text-base">
            <Form
                form={formInstance}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    centerName: formData.name,
                    centerPhone: formData.phone,
                    centerDescription: formData.description,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Hình ảnh trung tâm" valuePropName="fileList">
                    <Upload
                        // action={`${process.env.REACT_APP_API_URL}/api/homeTest/uploadImage`}
                        listType="picture-card"
                        fileList={[...fileList]}
                        onChange={handleChange}
                        multiple={false}
                        beforeUpload={(file) => false}
                        showUploadList={{ showPreviewIcon: false }}
                        accept={'.jpg, .jpeg, .png'}
                        defaultFileList={
                            formData.image
                                ? [
                                      {
                                          uid: '1',
                                          name: 'centerImage',
                                          status: 'done',
                                          url: formData.image,
                                      },
                                  ]
                                : undefined
                        }
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Tên trung tâm"
                    name="centerName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm của bạn' }]}
                >
                    <Input
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, name: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="centerPhone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại trung tâm của bạn' },
                        { len: 10, max: 10, message: 'Số điện thoại thông thường có 10 số' },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, phone: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Mã số thuế"
                    name="taxCode"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mã số thuế trung tâm của bạn' },
                        { min: 10, max: 14, message: 'Mã số thuế thông thường có 10 đến 13 số' },
                    ]}
                >
                    <Input
                        onKeyDown={inputOnKeyDown}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, taxCode: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="centerDescription"
                    rules={[{ required: true, min: 10, message: 'Vui lòng nhập mô tả ít nhất 10 từ.' }]}
                >
                    <TextArea
                        rows={4}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Giờ hoạt động">
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
                                                              dayjs(formData.operationHours[field.key].start, 'HH:mm'),
                                                              dayjs(formData.operationHours[field.key].end, 'HH:mm'),
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
            </Form>
            {/* <div className="col-span-2">Tên trung tâm</div>
            <div className="col-span-3"></div> */}
        </div>
    );
};

export default CenterBasicForm;
