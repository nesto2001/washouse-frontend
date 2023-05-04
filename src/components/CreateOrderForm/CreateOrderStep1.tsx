import React, { useState, useEffect } from 'react';
import { Button, Col, Empty, Form, FormInstance, Input, Row, Select } from 'antd';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';

type Props = {
    formInstance: FormInstance;
    formData: CheckoutFormData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
    onNext: () => void;
};

const CreateOrderStep1 = ({ formInstance, onNext, formData, setFormData }: Props) => {
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [wardList, setWardList] = useState<LocationPlaceModel[]>([]);
    const [district, setDistrict] = useState<number>();

    useEffect(() => {
        getDistricts().then((res) => {
            setDistrictList(res);
        });
    }, []);

    useEffect(() => {
        if (district) {
            getWards(district).then((res) => {
                setWardList(res);
            });
        }
    }, [district]);

    const handleNext = () => {
        formInstance.submit();
    };

    const onFinish = (values: any) => {
        console.log(values);
        onNext();
    };

    const onFinishFail = (err: any) => {
        console.log(err);
    };

    return (
        <Form name="basics" layout="vertical" form={formInstance} onFinish={onFinish} onFinishFailed={onFinishFail}>
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item
                        name="cName"
                        label="Họ và tên"
                        rules={[
                            { required: true, message: 'Vui lòng nhập họ và tên khách hàng' },
                            { min: 2, message: 'Vui lòng nhập ít nhất 2 ký tự' },
                        ]}
                    >
                        <Input
                            placeholder="Nhập họ và tên khách hàng"
                            value={formData.fullname}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, fullname: e.target.value }));
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={12}>
                    <Form.Item
                        name="cPhone"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại khách hàng' },
                            { len: 10, message: 'Số điện thoại thông thường có 10 số' },
                        ]}
                    >
                        <Input
                            placeholder="Nhập số điện thoại khách hàng"
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, phone: e.target.value }));
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="cEmail"
                        label="Email"
                        rules={[
                            {
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: 'Vui lòng nhập đúng định dạng email',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập email khách hàng"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, email: e.target.value }));
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item
                        name="cAddress"
                        label="Địa chỉ khách hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ khách hàng' }]}
                    >
                        <Input
                            placeholder="Nhập địa chỉ khách hàng"
                            value={formData.address}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, address: e.target.value }));
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={8}>
                    <Form.Item
                        name="cCity"
                        label="Tỉnh / Thành phố"
                        initialValue={0}
                        tooltip="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh"
                    >
                        <Select options={[{ value: 0, label: 'TP. Hồ Chí Minh' }]} disabled={true} defaultValue={0} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="cDistrict"
                        label="Quận / Huyện"
                        initialValue={district}
                        rules={[{ required: true, message: 'Vui lòng chọn quận / huyện ' }]}
                    >
                        <Select
                            options={districtList.map((district) => {
                                return {
                                    label: district.name,
                                    value: district.id,
                                };
                            })}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            placeholder="Chọn quận / huyện"
                            onChange={(value: number) => {
                                setFormData((prev) => ({ ...prev, district: value }));
                                setDistrict(value);
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="cWard"
                        label="Phường / Xã"
                        rules={[{ required: true, message: 'Vui lòng chọn phường / xã ' }]}
                    >
                        <Select
                            options={wardList.map((ward) => {
                                return {
                                    label: ward.name,
                                    value: ward.id,
                                };
                            })}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            placeholder="Chọn phường / xã"
                            notFoundContent={
                                <Empty description="Vui lòng chọn quận / huyện" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                            onChange={(value: number) => {
                                setFormData((prev) => ({ ...prev, wardId: value }));
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32} justify={'end'} className="mb-10">
                <Col>
                    <Form.Item noStyle>
                        <Button type="primary" onClick={handleNext}>
                            Tiếp tục
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateOrderStep1;
