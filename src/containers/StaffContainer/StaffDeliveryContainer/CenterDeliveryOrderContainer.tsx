import React from 'react';
import CenterOrderDetailsGeneral from '../CenterOrderContainer/CenterOrderDetailsGeneral';
import { Button, Col, Descriptions, Row, Tag } from 'antd';
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

type Props = {
    orderDetails: CenterOrderDetailsModel;
};

const CenterDeliveryOrderContainer = ({ orderDetails }: Props) => {
    return (
        <div className="flex justify-between max-w-[1070px] w-[1020px] h-[764px]">
            <div className="w-[632px]">
                <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                    <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub flex justify-between items-baseline">
                        Chiều đi
                        <div className="">
                            <Tag color="default" style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2, margin: 0 }}>
                                Đang chờ
                            </Tag>
                        </div>
                    </div>
                    <div className="provider__page--content px-6 mt-2">
                        <div className="provider__services--wrapper flex justify-between gap-6">
                            <div className="delivery__info--shipper w-[200px]">
                                <div className="font-medium text-lg">
                                    <FaRunning className="inline" /> Nhân viên
                                </div>
                                <div className="text-sub text-base">Hoàng Trần</div>
                                <div className="text-sub text-base">0975926021</div>
                            </div>
                            <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                            <div className="delivery__info--destination flex-grow">
                                <div className="font-medium text-lg">
                                    <RiUserLocationFill className="inline" /> Địa chỉ lấy đơn
                                </div>
                                <div className="text-sub text-base">
                                    123 Thủy Lợi, Phước Long A, Quận 9, TP. Hồ Chí Minh
                                </div>
                            </div>
                            <div className="self-center">
                                <FaDirections
                                    className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                    size={30}
                                />
                            </div>
                        </div>
                        <div className="float-right mt-3">
                            <Button type="primary">Vận chuyển</Button>
                        </div>
                    </div>
                </div>
                <div className="order__details bg-white rounded border border-wh-lightgray mb-6 md:min-h-[200px]">
                    <div className="provider__page--subtitle pt-4 px-6 font-semibold text-xl text-sub">Chiều về</div>
                    <div className="provider__page--content px-6 mt-2">
                        <div className="provider__services--wrapper flex justify-between gap-6">
                            <div className="delivery__info--shipper w-[200px]">
                                <div className="font-medium text-lg">
                                    <FaRunning className="inline" /> Nhân viên
                                </div>
                                <div className="text-sub text-base">Hoàng Trần</div>
                                <div className="text-sub text-base">0975926021</div>
                            </div>
                            <div className="w-[1.5px] h-[80px] rounded-full overflow-hidden bg-wh-gray"></div>
                            <div className="delivery__info--destination flex-grow">
                                <div className="font-medium text-lg">
                                    <RiUserLocationFill className="inline" /> Địa chỉ lấy đơn
                                </div>
                                <div className="text-sub text-base">
                                    123 Thủy Lợi, Phước Long A, Quận 9, TP. Hồ Chí Minh
                                </div>
                            </div>
                            <div className="self-center">
                                <FaDirections
                                    className="text-primary hover:text-ws-primary-hover transition-colors cursor-pointer"
                                    size={30}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                        <div className="">Thông tin thanh toán</div>
                        <Tag style={{ fontSize: 14, paddingTop: 2, paddingBottom: 2 }} color="default">
                            Đang chờ
                        </Tag>
                    </div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderDetailsPayment
                                orderPayment={{
                                    payment: orderDetails.orderPayment,
                                    orderDeliveryPrice: orderDetails.deliveryPrice,
                                    orderTotal: orderDetails.totalOrderValue,
                                }}
                            />
                        </div>
                    </div>
                </div>
                {orderDetails.deliveryType !== 0 && orderDetails.deliveryPrice > 0 && (
                    <div className="order__delivery w-full bg-white rounded border border-wh-lightgray mb-6">
                        <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl flex justify-between items-center">
                            <div className="">Thông tin giao hàng</div>
                        </div>
                        <div className="provider__page--content px-6 mt-6">
                            <div className="provider__services--wrapper mb-4">
                                <CenterOrderDetailsDelivery
                                    deliveries={orderDetails.orderDeliveries}
                                    deliveryType={orderDetails.deliveryType}
                                />
                            </div>
                        </div>
                    </div>
                )}
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
    );
};

export default CenterDeliveryOrderContainer;
