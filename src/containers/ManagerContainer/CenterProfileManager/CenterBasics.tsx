import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, UploadFile, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';
import { UpdateCenterRequest } from '../../../models/Center/UpdateCenterRequest';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { uploadSingle } from '../../../repositories/MediaRepository';
import { updateMyCenter } from '../../../repositories/CenterRepository';

type Props = {
    center: ManagerCenterModel;
};

type CenterBasicsFormData = {
    name: string;
    phone: string;
    image: string;
    description: string;
    savedImage: string;
    taxCode: string;
};

const CenterBasics = ({ center }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '1',
            name: 'center-thumbnail.png',
            status: 'done',
            url: center.thumbnail,
        },
    ]);

    const [formData, setFormData] = useState<CenterBasicsFormData>({
        name: center.title,
        phone: center.phone,
        image: center.thumbnail,
        description: center.description,
        taxCode: center.taxCode,
        savedImage: '',
    });

    const [form] = Form.useForm();

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

    const onFinish = async (values: UpdateCenterRequest) => {
        console.log('1');
        const file = fileList[0]?.originFileObj;
        let res;
        if (file) {
            res = await uploadSingle(file);
            setFormData({ ...formData, savedImage: res.data.data.savedFileName, image: res.data.data.signedUrl });
        }
        try {
            await updateMyCenter({
                centerName: values.centerName,
                description: values.description,
                phone: values.phone,
                savedFileName: res?.data.data.savedFileName,
            });
        } catch (e) {}
        message.success('Cập nhật thông tin trung tâm thành công, vui lòng đợi admin duyệt');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // const handleTimeOnChange = (day: string, times: RangeValue<dayjs.Dayjs>) => {
    //     const operationDay = DayMap[day];
    //     console.log('alo');
    //     const newOperationHours = formData.operationHours.map((operationHour) => {
    //         if (operationHour.day === operationDay && times) {
    //             return {
    //                 ...operationHour,
    //                 start: times[0] ? times[0].format('HH:mm') : null,
    //                 end: times[1] ? times[1].format('HH:mm') : null,
    //             };
    //         } else {
    //             return operationHour;
    //         }
    //     });
    //     setFormData({ ...formData, operationHours: newOperationHours });
    //     console.log(formData);
    // };
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
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 800 }}
                initialValues={{
                    centerName: formData.name,
                    phone: formData.phone,
                    description: formData.description,
                    taxCode: formData.taxCode,
                    // operatingDays: [
                    //     dayjs(formData.operationHours[0].start, 'HH:mm'),
                    //     dayjs(formData.operationHours[0].end, 'HH:mm'),
                    // ],
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
                    >
                        {
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                            </div>
                        }
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
                    name="phone"
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
                    name="description"
                    rules={[{ required: true, min: 10, message: 'Vui lòng nhập mô tả ít nhất 10 từ.' }]}
                >
                    <TextArea
                        rows={4}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
            {/* <Form.Item label="Giờ hoạt động">
                    <Form.List name="operatingDays">
                        {(fields, {}, { errors }) => (
                            <>
                                {['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'].map(
                                    (day, index) => (
                                        <Form.Item required={true} key={index}>
                                            <Form.Item
                                                validateTrigger={['onChange', 'onBlur']}
                                                noStyle
                                                {...rangeConfig}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập thời gian ước tính xử lý',
                                                    },
                                                ]}
                                            >
                                                <TimePicker.RangePicker
                                                    format={format}
                                                    placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
                                                    onChange={(range) => handleTimeOnChange(day, range)}
                                                />{' '}
                                                {day}
                                            </Form.Item>
                                        </Form.Item>
                                    ),
                                )}
                                <Form.Item>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item> */}

            {/* <div className="col-span-2">Tên trung tâm</div>
            <div className="col-span-3"></div> */}
        </div>
    );
};

export default CenterBasics;
