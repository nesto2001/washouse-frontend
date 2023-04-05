import { Form, Input, UploadFile, message } from 'antd';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';
import { uploadSingle } from '../../../repositories/MediaRepository';
import { DayMap } from '../../../mapping/DayMap';
import { RangeValue } from 'rc-picker/lib/interface';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';

type Props = {
    center: ManagerCenterModel;
};

type CenterBasicsFormData = { name: string; phone: string; image: string; description: string; savedImage: string };

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
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const defaultFileList = [,];

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
                    centerPhone: formData.phone,
                    centerDescription: formData.description,
                    // operatingDays: [
                    //     dayjs(formData.operationHours[0].start, 'HH:mm'),
                    //     dayjs(formData.operationHours[0].end, 'HH:mm'),
                    // ],
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
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
            </Form>
            {/* <div className="col-span-2">Tên trung tâm</div>
            <div className="col-span-3"></div> */}
        </div>
    );
};

export default CenterBasics;
