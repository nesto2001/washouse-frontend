import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React from 'react';

type Props = {
    formInstance: FormInstance;
};

const CreateOrderStep1 = ({ formInstance }: Props) => {
    return (
        <Form name="basics" layout="vertical">
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item label="Họ và tên">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={12}>
                    <Form.Item label="Số điện thoại">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={24}>
                    <Form.Item label="Địa chỉ khách hàng">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={8}>
                    <Form.Item label="Tỉnh / Thành phố">
                        <Select />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Quận / Huyện">
                        <Select />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Phường / Xã">
                        <Select />
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
