import React, { useState, useEffect } from 'react';
import { Button, Col, Empty, Form, FormInstance, Input, Row, Select } from 'antd';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { getDistricts, getWards } from '../../repositories/LocationRepository';

type Props = {
    formInstance: FormInstance;
};

const CreateOrderStep1 = ({ formInstance }: Props) => {
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

    return (
        <Form name="basics" layout="vertical">
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item label="Họ và tên">
                        <Input placeholder="Nhập họ và tên khách hàng" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={12}>
                    <Form.Item label="Số điện thoại">
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email">
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item label="Địa chỉ khách hàng">
                        <Input placeholder="Nhập địa chỉ khách hàng" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={8}>
                    <Form.Item label="Tỉnh / Thành phố" initialValue={0}>
                        <Select options={[{ value: 0, label: 'TP. Hồ Chí Minh' }]} disabled={true} defaultValue={0} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Quận / Huyện" initialValue={district}>
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
                                setDistrict(value);
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Phường / Xã">
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
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32} justify={'end'} className="mb-10">
                <Col>
                    <Form.Item noStyle>
                        <Button type="primary">Tiếp tục</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateOrderStep1;
