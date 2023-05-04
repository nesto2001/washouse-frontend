import React, { useState } from 'react';
import { Option } from '../../types/Options';
import { PaymentEnum } from '../../types/enum/PaymentEnum';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, FormInstance, Radio, RadioChangeEvent, Tooltip } from 'antd';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/CartStore';
import { CartItem } from '../../types/CartType/CartItem';
import Table, { ColumnsType } from 'antd/es/table';
import { formatCurrency } from '../../utils/FormatUtils';
import { PriceRange } from '../../types/PriceRange';
import PriceTable from '../PriceTable';
import { PaymentMethodMap } from '../../mapping/PaymentMethodMap';
import { DeliveryTypeMap } from '../../mapping/DeliveryTypeMap';

type Props = {
    formInstance: FormInstance;
    onBack: () => void;
    formData: CheckoutFormData;
};

const CreateOrderStep4 = ({ formInstance, onBack, formData }: Props) => {
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const handleBack = () => {
        onBack();
    };

    const columns: ColumnsType<CartItem> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: 60,
            render: (_, record, index) => <div className="">{index + 1}</div>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
            render: (_, record) => <div className="">{record.name}</div>,
        },
        {
            title: 'Định lượng',
            dataIndex: 'service',
            key: 'service',
            align: 'center',
            render: (_, record) => (
                <div className="">
                    {record.quantity ? record.quantity : record.weight ? (record.weight * 1).toFixed(1) : 0}{' '}
                    {record.unit}
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center',
            width: 136,
            render: (_, record) => (
                <h1 className="text-sm">
                    {formatCurrency(record.unitPrice)}/{record.unit.toLowerCase() !== 'kg' ? 'bộ' : 'kg'}
                    {record.unit.toLowerCase() === 'kg' && (
                        <Tooltip
                            className="ml-2 text-sub-gray"
                            title={
                                record.priceChart && (
                                    <>
                                        <div className="mb-1">
                                            {record.minPrice
                                                ? `Giá tối thiểu: ${formatCurrency(record.minPrice ?? 0)}`
                                                : `Giá tối thiểu: ${formatCurrency(record.unitPrice ?? 0)}`}
                                        </div>
                                        <PriceTable
                                            isTooltip
                                            priceChart={record.priceChart.map((range): PriceRange => {
                                                return {
                                                    maxValue: range.maxValue,
                                                    price: range.price,
                                                };
                                            })}
                                            unitType="kg"
                                        />
                                    </>
                                )
                            }
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    )}
                </h1>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: 140,
            render: (value: number) => formatCurrency(value),
        },
    ];

    return (
        <div>
            <div className="mb-3">
                <Descriptions title="Thông tin khách hàng" layout="vertical">
                    <Descriptions.Item label="Họ và tên">{formData.fullname}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{formData.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{formData.email ?? 'Không có'}</Descriptions.Item>
                    <Descriptions.Item label="Vận chuyển">{DeliveryTypeMap[formData.deliveryType]}</Descriptions.Item>
                    <Descriptions.Item label="Thanh toán">{PaymentMethodMap[formData.paymentType]}</Descriptions.Item>
                    <Descriptions.Item label="Thời gian lấy đơn">
                        {formData.preferredDropoffTime && formData.preferredDropoffTime.length > 0
                            ? formData.preferredDropoffTime
                            : 'Sớm nhất'}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className="grid grid-cols-5">
                <div className="col-span-5 font-medium text-base">Chi tiết đơn hàng</div>
                <div className="col-span-5">
                    <Table columns={columns} dataSource={cartItems} pagination={false} />
                </div>
                <div className="col-span-4 text-right font-medium pr-11 mt-3">Tổng đơn hàng</div>
                <div className="col-span-1 text-right font-medium pr-11 mt-3">{formatCurrency(cartTotal)}</div>
                <div className="col-span-5 mt-2">
                    <hr />
                </div>
                <div className="col-span-4 text-right font-medium pr-11 mt-3">Phí vận chuyển</div>
                <div className="col-span-1 text-right font-medium pr-11 mt-3">
                    {formatCurrency(formData.deliveryPrice ?? 0)}
                </div>
                <div className="col-span-5 mt-2">
                    <hr />
                </div>
                <div className="col-span-4 text-right text-base font-medium pr-11 mt-3">Tổng thanh toán</div>
                <div className="col-span-1 text-right text-base font-medium pr-11 mt-3">
                    {formatCurrency(cartTotal + formData.deliveryPrice)}
                </div>
            </div>
            <div className="my-10 h-8">
                <Button className="float-right ml-6" type="primary">
                    Tạo đơn hàng
                </Button>
                <Button className="float-right" type="default" style={{ background: 'white' }} onClick={handleBack}>
                    Quay lại
                </Button>
            </div>
        </div>
    );
};

export default CreateOrderStep4;
