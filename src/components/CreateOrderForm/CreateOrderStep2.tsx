import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Form, FormInstance, Input, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import EmptyData from '../EmptyData/EmptyData';
import { CartItem } from '../../types/CartType/CartItem';

type Props = {
    formInstance: FormInstance;
};

const CreateOrderStep2 = ({ formInstance }: Props) => {
    const [services, setServices] = useState<CartItem[]>([]);

    return (
        <>
            <Button type="default" style={{ background: 'white' }}>
                Thêm dịch vụ
                <PlusOutlined className="align-middle" style={{ fontSize: 14, paddingBottom: 3 }} />
            </Button>
            <div className="my-6">
                {services.length > 0 ? (
                    <div className=""></div>
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        description={
                            <>
                                <div className="">Chưa có dịch vụ</div>
                                <div className="">Vui lòng thêm ít nhất một dịch vụ</div>
                            </>
                        }
                    />
                )}
            </div>
            <div className="h-8 mb-10">
                <Button className="float-right" type="primary" disabled={services.length > 0 ? false : false}>
                    Tiếp theo
                </Button>
            </div>
        </>
    );
};

export default CreateOrderStep2;
