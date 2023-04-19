import * as React from 'react';
import { useState, useEffect } from 'react';
import Placeholder from '../../../assets/images/placeholder.png';
import { formatCurrency } from '../../../utils/FormatUtils';
import { Button, Form, Input, InputNumber, Modal, Tag, message } from 'antd';
import { CenterOrderedServiceModel } from '../../../models/Staff/CenterOrderedServiceModel';
import { proceedOrderDetails, updateOrderDetails } from '../../../repositories/StaffRepository';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { UpdateOrderDetailsRequest } from '../../../models/Staff/StaffOrder/UpdateOrderDetailsRequest';

type OrderDetailsInfo = {
    orderedDetails: CenterOrderedServiceModel[];
};

type Props = {
    orderStatus: string;
    orderId: string;
    forceUpdate: () => void;
    details: OrderDetailsInfo;
};

interface UpdateItem {
    id: number;
    title: string;
    image: string;
    category: string;
    measurement: number;
    unit: string;
    note?: string;
}

interface UpdateOrderData {
    orderDetailsId: number;
    measurement: number;
    note: string;
}

const CenterOrderedDetailsContainer = ({ details, orderId, orderStatus, forceUpdate }: Props) => {
    const [selectedItem, setSelectedItem] = useState<UpdateItem>();
    const [open, setOpen] = useState<boolean>(false);
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();

    const handleProceed = (orderId: string, orderDetailsId: number) => {
        const proceedOrdetails = async () => {
            return await proceedOrderDetails(orderId, orderDetailsId);
        };
        proceedOrdetails().then((res) => {
            forceUpdate();
            message.success('Đã cập nhật tiến trình đơn hàng');
        });
    };

    const handleCancel = () => {
        console.log(form.getFieldsValue());
        console.log(selectedItem?.measurement);
        console.log(selectedItem);
        setSelectedItem(undefined);
        setOpen(false);
    };

    const onFinish = (values: UpdateOrderData) => {
        const request: UpdateOrderDetailsRequest = {
            measurement: values.measurement,
            staffNote: values.note,
        };
        updateOrderDetails(orderId, values.orderDetailsId, request).then((res) => {
            console.log(res);
            message.success('Cập nhật đơn hàng thành công');
            forceUpdate();
        });
    };

    const handleUpdateMeasurement = (orderId: string, orderDetailsId: number) => {};
    return (
        <>
            {contextHolder}
            {details.orderedDetails.map((det, index) => (
                <div key={`item-${index}`} className="ordered__item flex jus items-center mb-6">
                    <div className="ordered__item--thumb w-[120px] h-[100px] rounded-lg overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={det.image}
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = Placeholder;
                            }}
                        />
                    </div>
                    <div className="ordered__item--details ml-4 w-[300px]">
                        <div className="font-bold text-lg">{det.name}</div>
                        <div className="font-medium text-sub-gray text-sm">Phân loại: {det.category}</div>
                        <div className="font-normal text-sub text-sm mt-2 ">
                            {/* Ghi chú: {det.customerNote.length > 0 ? det.customerNote : 'không có'} */}
                        </div>
                    </div>
                    <div className="ordered__item--weight w-[100px] text-base font-bold">
                        {det.measurement} <span className="text-sub-gray">{det.unit}</span>
                    </div>
                    <div className="ordered__item--unitprice font-bold text-lg w-[200px]">
                        {formatCurrency(det.unitPrice)}
                    </div>
                    <div className="ordered__item--price font-bold text-xl w-[100px] text-right">
                        {formatCurrency(det.price)}
                    </div>
                    <div className="ordered__item--price font-bold text-xl w-[284px] text-right">
                        <Tag
                            className="flex w-1/2 justify-center items-center mx-auto h-8 cursor-pointer"
                            color={
                                BadgeStatusMap[
                                    det.orderDetailTrackings[det.orderDetailTrackings.length - 1]?.status ?? 'None'
                                ]
                            }
                            onClick={() => handleProceed(orderId, det.id)}
                        >
                            {
                                OrderStatusMap[
                                    det.orderDetailTrackings[det.orderDetailTrackings.length - 1]?.status ?? 'None'
                                ]
                            }
                        </Tag>
                    </div>
                    {(orderStatus.toLowerCase() === 'confirmed' || orderStatus.toLowerCase() === 'ready') && (
                        <div className="ordered__item--update font-bold text-xl text-right">
                            <Button
                                icon={<EditOutlined />}
                                type="primary"
                                shape="default"
                                style={{ background: '#396afc' }}
                                onClick={() => {
                                    setSelectedItem({
                                        id: det.id,
                                        title: det.name,
                                        category: det.category,
                                        image: det.image,
                                        measurement: det.measurement,
                                        unit: det.unit,
                                        note: det.staffNote ?? undefined,
                                    });
                                    setOpen(true);
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
            {open && selectedItem && (
                <Modal
                    open={open}
                    maskClosable
                    centered
                    title="Cập nhật đơn hàng"
                    okText="Cập nhật"
                    cancelText="Hủy"
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { background: 'white' } }}
                    destroyOnClose
                    onOk={() => form.submit()}
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="update_form"
                        onFinish={onFinish}
                        initialValues={{
                            note: selectedItem.note ?? '',
                        }}
                    >
                        <div className="flex items-center">
                            <div className="">
                                <div className="text-center">Dịch vụ</div>
                                <div className="flex">
                                    <div className="w-[100px] h-[80px] rounded-lg overflow-hidden">
                                        <img src={selectedItem.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="ml-2 w-[140px] self-center">
                                        <div className="font-bold text-base">{selectedItem.title}</div>
                                        <div className="font-medium text-sub-gray">
                                            Phân loại: {selectedItem.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[160px] mx-4 h-[102px]">
                                <Form.Item name="orderDetailsId" hidden initialValue={selectedItem.id}></Form.Item>
                                <Form.Item
                                    requiredMark={false}
                                    name="measurement"
                                    label={<div className="self-start">Định lượng</div>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập giá trị định lượng' },
                                        {
                                            pattern:
                                                selectedItem.unit.toLowerCase() === 'kg'
                                                    ? /^(\d+)?(\.\d{0,1})?$/
                                                    : /^[0-9]*$/,
                                            message:
                                                selectedItem.unit.toLowerCase() === 'kg'
                                                    ? undefined
                                                    : 'Giá trị số lượng không thể là số lẻ',
                                        },
                                    ]}
                                >
                                    <div className="flex items-center gap-2">
                                        <Input
                                            itemType="number"
                                            className="flex-grow"
                                            name="measurement"
                                            type="number"
                                            min={0}
                                            defaultValue={selectedItem.measurement}
                                        />{' '}
                                        {selectedItem.unit}
                                    </div>
                                </Form.Item>
                            </div>
                            <div className="flex-grow">
                                <Form.Item
                                    name="note"
                                    label="Nội dung cập nhật"
                                    rules={[{ required: true, message: 'Vui lòng nhập nội dung cập nhật' }]}
                                >
                                    <TextArea />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Modal>
            )}
            {/* <hr />
            <div className="order__summary flex mt-4 text-2xl font-bold">
                <div className="flex-grow text-right">Tổng đơn hàng</div>
                <div className="w-[284px] text-right">{formatCurrency(orderTotal)}</div>
            </div> */}
        </>
    );
};

export default CenterOrderedDetailsContainer;
