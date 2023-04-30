import React, { useEffect, useRef, useState, useCallback } from 'react';
import CenterOrderDetailsGeneral from '../CenterOrderContainer/CenterOrderDetailsGeneral';
import { Button, Col, Descriptions, Form, Input, Modal, Row, Tag, message } from 'antd';
import CenterOrderedDetailsContainer from '../CenterOrderContainer/CenterOrderedDetailsContainer';
import CenterOrderDetailsPayment from '../CenterOrderContainer/CenterOrderDetailsPayment';
import CenterOrderDetailsDelivery from '../CenterOrderContainer/CenterOrderDetailsDelivery';
import CenterOrderDetailsTracking from '../CenterOrderContainer/CenterOrderDetailsTracking';
import { CenterOrderDetailsModel } from '../../../models/Staff/CenterOrderDetailsModel';
import { DeliveryTypeMap } from '../../../mapping/DeliveryTypeMap';
import { formatCurrency } from '../../../utils/FormatUtils';
import Placeholder from '../../../assets/images/placeholder.png';
import { FaDirections, FaRunning } from 'react-icons/fa';
import { RiUserLocationFill } from 'react-icons/ri';
import { getLocation } from '../../../repositories/LocationRepository';
import { AssignDeliveryRequest } from '../../../models/Staff/StaffOrder/AssignDeliveryRequest';
import { assignOrderDelivery } from '../../../repositories/StaffRepository';
import { DeliveryStatusMap } from '../../../mapping/DeliveryStatusMap';
import { DeliveryBadgeStatusMap, PaymentBadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { PaymentStatusMap } from '../../../mapping/OrderStatusMap';

type Props = {
    orderDetails: CenterOrderDetailsModel;
};

interface AssignDeliveryForm {
    shipperName: string;
    shipperPhone: string;
}

const CenterDeliveryOrderContainer = ({ orderDetails }: Props) => {
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();
    const [isLarge, setIsLarge] = useState(false);
    const stickyDivRef = useRef<HTMLDivElement>(null);
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const trackings = orderDetails.orderDeliveries;

    useEffect(() => {
        const handleScroll = () => {
            const stickyDivRect = stickyDivRef.current?.getBoundingClientRect();
            if (stickyDivRect?.top! <= 84) {
                setIsLarge(true);
            } else {
                setIsLarge(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLarge]);

    const submitForm = () => {
        form.submit();
    };

    const cancelAssign = () => {
        return;
    };

    const handleAssign = (type: string) => {
        const onFinish = (values: AssignDeliveryForm) => {
            if (values) {
                const assignData: AssignDeliveryRequest = {
                    shipperName: values.shipperName,
                    shipperPhone: values.shipperPhone,
                };
                assignOrderDelivery(orderDetails.id, type, assignData)
                    .then(() => {
                        message.success('Cập nhật thông tin nhân viên vận chuyển thành công!');
                    })
                    .catch(() => {
                        message.error(
                            'Có vấn đề xảy ra trong lúc cập nhật thông tin nhân viên vận chuyển, vui lòng thử lại sau.',
                        );
                    });
            }
        };
        const config = {
            title: 'Vận chuyển đơn',
            width: 400,
            content: (
                <>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <div className="">
                            <Form.Item
                                label="Tên nhân viên vận chuyển"
                                name="shipperName"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên nhân viên' }]}
                            >
                                <Input placeholder="Nhập họ và tên nhân viên" />
                            </Form.Item>
                        </div>
                        <div className="">
                            <Form.Item
                                label="SĐT nhân viên vận chuyển"
                                name="shipperPhone"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên nhân viên' }]}
                            >
                                <Input placeholder="Nhập SĐT nhân viên" />
                            </Form.Item>
                        </div>
                    </Form>
                </>
            ),
            icon: ' ',
            okText: 'Cập nhật',
            onOk: submitForm,
            onCancel: cancelAssign,
            cancelText: 'Hủy',
            maskClosable: true,
            closable: true,
        };
        modal.info(config);
    };

    return (
        <>
            {contextHolder}
            <div
                className={`flex justify-between max-w-[1070px] w-[1020px] h-[764px] transition-[height] duration-300 ${
                    isLarge ? 'h-[828px]' : 'h-[764px]'
                }`}
                ref={stickyDivRef}
            >
                <div className="w-[632px]">
                    {trackings.map((tracking) =>
                        trackings.length > 1 ? (
                            <>
                                {!tracking.type && (
                                    <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                                        <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub flex justify-between items-baseline">
                                            Chiều đi
                                            <div className="">
                                                <Tag
                                                    color={DeliveryBadgeStatusMap[tracking.status]}
                                                    style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, margin: 0 }}
                                                >
                                                    {DeliveryStatusMap[tracking.status]}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div className="provider__page--content px-6 mt-2">
                                            <div className="provider__services--wrapper flex justify-between gap-6">
                                                <div className="delivery__info--shipper w-[200px]">
                                                    <div className="font-medium text-lg">
                                                        <FaRunning className="inline" /> Nhân viên
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperName ?? '-'}
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperPhone ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                                                <div className="delivery__info--destination flex-grow">
                                                    <div className="font-medium text-lg">
                                                        <RiUserLocationFill className="inline" /> Địa chỉ lấy đơn
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.addressString ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="self-center">
                                                    <FaDirections
                                                        className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                                        size={30}
                                                    />
                                                </div>
                                            </div>
                                            {tracking.status.toLowerCase() !== 'completed' && (
                                                <div
                                                    className="float-right mt-3 ml-3"
                                                    onClick={() => message.success('Cập nhật vận chuyển thành công!')}
                                                >
                                                    <Button type="primary">Cập nhật vận chuyển</Button>
                                                </div>
                                            )}
                                            {orderDetails.status.toLowerCase() === 'confirmed' && (
                                                <div
                                                    className="float-right mt-3"
                                                    onClick={() => handleAssign(tracking.type ? 'deliver' : 'dropoff')}
                                                >
                                                    <Button type="default" style={{ background: 'white' }}>
                                                        Chọn nhân viên
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {tracking.type && (
                                    <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                                        <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub flex justify-between items-baseline">
                                            Chiều về
                                            <div className="">
                                                <Tag
                                                    color={DeliveryBadgeStatusMap[tracking.status]}
                                                    style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, margin: 0 }}
                                                >
                                                    {DeliveryStatusMap[tracking.status]}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div className="provider__page--content px-6 mt-2">
                                            <div className="provider__services--wrapper flex justify-between gap-6">
                                                <div className="delivery__info--shipper w-[200px]">
                                                    <div className="font-medium text-lg">
                                                        <FaRunning className="inline" /> Nhân viên
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperName ?? '-'}
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperPhone ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                                                <div className="delivery__info--destination flex-grow">
                                                    <div className="font-medium text-lg">
                                                        <RiUserLocationFill className="inline" /> Địa chỉ lấy đơn
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.addressString ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="self-center">
                                                    <FaDirections
                                                        className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                                        size={30}
                                                    />
                                                </div>
                                            </div>
                                            {orderDetails.status.toLowerCase() === 'ready' &&
                                                tracking.status.toLowerCase() !== 'completed' && (
                                                    <div
                                                        className="float-right mt-3 ml-3"
                                                        onClick={() =>
                                                            message.success('Cập nhật vận chuyển thành công!')
                                                        }
                                                    >
                                                        <Button type="primary">Cập nhật vận chuyển</Button>
                                                    </div>
                                                )}
                                            {orderDetails.status.toLowerCase() === 'ready' &&
                                                tracking.status.toLowerCase() === 'pending' && (
                                                    <div
                                                        className="float-right mt-3"
                                                        onClick={() =>
                                                            handleAssign(tracking.type ? 'deliver' : 'dropoff')
                                                        }
                                                    >
                                                        <Button type="default" style={{ background: 'white' }}>
                                                            Chọn nhân viên
                                                        </Button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {(!tracking.type && (
                                    <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                                        <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub flex justify-between items-baseline">
                                            Chiều đi
                                            <div className="">
                                                <Tag
                                                    color={DeliveryBadgeStatusMap[tracking.status]}
                                                    style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, margin: 0 }}
                                                >
                                                    {DeliveryStatusMap[tracking.status]}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div className="provider__page--content px-6 mt-2">
                                            <div className="provider__services--wrapper flex justify-between gap-6">
                                                <div className="delivery__info--shipper w-[200px]">
                                                    <div className="font-medium text-lg">
                                                        <FaRunning className="inline" /> Nhân viên
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperName ?? '-'}
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.shipperPhone ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                                                <div className="delivery__info--destination flex-grow">
                                                    <div className="font-medium text-lg">
                                                        <RiUserLocationFill className="inline" /> Địa chỉ lấy đơn
                                                    </div>
                                                    <div className="text-sub text-base">
                                                        {tracking.addressString ?? '-'}
                                                    </div>
                                                </div>
                                                <div className="self-center">
                                                    <FaDirections
                                                        className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                                        size={30}
                                                    />
                                                </div>
                                            </div>
                                            {tracking.status.toLowerCase() !== 'completed' && (
                                                <div
                                                    className="float-right mt-3 ml-3"
                                                    onClick={() => message.success('Cập nhật vận chuyển thành công!')}
                                                >
                                                    <Button type="primary">Cập nhật vận chuyển</Button>
                                                </div>
                                            )}
                                            {orderDetails.status.toLowerCase() === 'confirmed' && (
                                                <div
                                                    className="float-right mt-3"
                                                    onClick={() => handleAssign(tracking.type ? 'deliver' : 'dropoff')}
                                                >
                                                    <Button type="default" style={{ background: 'white' }}>
                                                        Chọn nhân viên
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )) ||
                                    (tracking.type && (
                                        <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                                            <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub flex justify-between items-baseline">
                                                Chiều về
                                                <div className="">
                                                    <Tag
                                                        color={DeliveryBadgeStatusMap[tracking.status]}
                                                        style={{
                                                            fontSize: 14,
                                                            paddingTop: 2,
                                                            paddingBottom: 2,
                                                            margin: 0,
                                                        }}
                                                    >
                                                        {DeliveryStatusMap[tracking.status]}
                                                    </Tag>
                                                </div>
                                            </div>
                                            <div className="provider__page--content px-6 mt-2">
                                                <div className="provider__services--wrapper flex justify-between gap-6">
                                                    <div className="delivery__info--shipper w-[200px]">
                                                        <div className="font-medium text-lg">
                                                            <FaRunning className="inline" /> Nhân viên
                                                        </div>
                                                        <div className="text-sub text-base">
                                                            {tracking.shipperName ?? '-'}
                                                        </div>
                                                        <div className="text-sub text-base">
                                                            {tracking.shipperPhone ?? '-'}
                                                        </div>
                                                    </div>
                                                    <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                                                    <div className="delivery__info--destination flex-grow">
                                                        <div className="font-medium text-lg">
                                                            <RiUserLocationFill className="inline" /> Địa chỉ trả đơn
                                                        </div>
                                                        <div className="text-sub text-base">
                                                            {tracking.addressString ?? '-'}
                                                        </div>
                                                    </div>
                                                    <div className="self-center">
                                                        <FaDirections
                                                            className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                                            size={30}
                                                        />
                                                    </div>
                                                </div>
                                                {orderDetails.status.toLowerCase() === 'ready' &&
                                                    tracking.status.toLowerCase() !== 'completed' && (
                                                        <div
                                                            className="float-right mt-3 ml-3"
                                                            onClick={() =>
                                                                message.success('Cập nhật vận chuyển thành công!')
                                                            }
                                                        >
                                                            <Button type="primary">Cập nhật vận chuyển</Button>
                                                        </div>
                                                    )}
                                                {orderDetails.status.toLowerCase() === 'ready' &&
                                                    tracking.status.toLowerCase() === 'pending' && (
                                                        <div
                                                            className="float-right mt-3"
                                                            onClick={() =>
                                                                handleAssign(tracking.type ? 'deliver' : 'dropoff')
                                                            }
                                                        >
                                                            <Button type="default" style={{ background: 'white' }}>
                                                                Chọn nhân viên
                                                            </Button>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                            </>
                        ),
                    )}
                    <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                        <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Chi tiết đơn hàng</div>
                        <div className="provider__page--content px-6 mt-6">
                            <div className="provider__services--wrapper">
                                <Row gutter={0} className="h-10 flex items-center font-medium text-base mb-2">
                                    <Col span={10} className="text-center">
                                        Dịch vụ
                                    </Col>
                                    <Col span={4}>Định lượng</Col>
                                    <Col span={7}>Đơn giá</Col>
                                    <Col span={3}>Thành tiền</Col>
                                </Row>
                                <div className="">
                                    {orderDetails.orderedDetails.map((det, index) => (
                                        <div key={`item-${index}`} className="ordered__item flex jus items-center mb-6">
                                            <div className="ordered__item--details ml-4 w-[300px]">
                                                <div className="font-bold text-lg">{det.name}</div>
                                                <div className="font-medium text-sub-gray text-sm">
                                                    Phân loại: {det.category}
                                                </div>
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[360px]">
                    <div className="order__payment w-full bg-white rounded border border-wh-lightgray mb-6">
                        <div className="provider__page--title pt-4 px-6 font-semibold text-2xl flex justify-between items-center">
                            <div className="">Thông tin thanh toán</div>
                            <Tag
                                style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, marginRight: 0 }}
                                color={PaymentBadgeStatusMap[orderDetails.orderPayment.status.toLowerCase() ?? '']}
                            >
                                {PaymentStatusMap[orderDetails.orderPayment.status.toLowerCase() ?? '']}
                            </Tag>
                        </div>
                        <div className="provider__page--content px-6 mt-6">
                            <div className="provider__services--wrapper">
                                <CenterOrderDetailsPayment
                                    orderID={orderDetails.id}
                                    forceUpdate={forceUpdate}
                                    orderStatus={orderDetails.status}
                                    orderPayment={{
                                        payment: orderDetails.orderPayment,
                                        orderDeliveryPrice: orderDetails.deliveryPrice,
                                        orderTotal: orderDetails.totalOrderValue,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {orderDetails.orderTrackings.length > 0 && (
                        <div className="order__tracking w-full bg-white rounded border border-wh-lightgray">
                            <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                                <div className="">Trạng thái đơn hàng</div>
                            </div>
                            <div className="provider__page--content px-6 mt-6 min-h-[200px]">
                                <div className="provider__services--wrapper h-auto">
                                    <CenterOrderDetailsTracking trackings={orderDetails.orderTrackings} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CenterDeliveryOrderContainer;
