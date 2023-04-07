import React from 'react';
import CenterOrderedDetailsContainer from './CenterOrderedDetailsContainer';
import CenterOrderDetailsCustomerContainter from './CenterOrderDetailsCustomerContainter';

type Props = {};

const CenterOrderDetailsContainer = (props: Props) => {
    const orderDetails = {
        id: '20230402_0000012',
        customerName: 'Trần Tân Long',
        locationId: 55,
        customerEmail: 'tanlong6121@gmail.com',
        customerMobile: '0975926021',
        customerMessage: '',
        customerOrdered: 5,
        totalOrderValue: 120000,
        deliveryType: 0,
        deliveryPrice: 0,
        preferredDropoffTime: '2023-04-03T10:00:00',
        preferredDeliverTime: null,
        status: 'Received',
        orderedDetails: [
            {
                serviceName: 'Giặt sấy quần áo trắng',
                serviceCategory: 'Giặt sấy',
                measurement: 3,
                unit: '',
                image: 'https://storage.googleapis.com/washousebucket/giat_say-20230331171327.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=washouse-sa%40washouse-381309.iam.gserviceaccount.com%2F20230407%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230407T193958Z&X-Goog-Expires=1800&X-Goog-SignedHeaders=host&X-Goog-Signature=7d67fd04a3d77dfa3d88f9b1e5397c8ac9e0652bf0e89fa400e0614dca75927670a4b84936e0dcc554adad78ddee55d1e7922e616941b979fbe3ac5f46161bab034147e26d0b09f4a392e183303a5c277ede3942de6964079461780392b556f3fc72f99bbac1bb38bc72a013db9ec233a5f35007ce8b11a76120b80d8858653f14da4abd254ac65f63c0dbf4678e8b8a71cd2651e3a6afdbe69d940b0b025c5acbae8f1c1b25efa91754447285ae8252836a49f70ab54f211aaa1198dfa1bbdceba91d8319672f2334b1864de7904cc176ad03435ecdb6216524c6b58af40617a685418d4b621fbfb02d51f80d3f25b569bc410f2b28e68857affcf069f798e0',
                price: 40000,
                orderDetailTrackings: [],
            },
        ],
        orderTrackings: [],
        orderDeliveries: [],
        orderPayment: {
            paymentTotal: 120000,
            platformFee: 0,
            dateIssue: null,
            status: 'Pending',
            paymentMethod: 0,
            promoCode: null,
            discount: null,
            createdDate: '02-04-2023 19:13:38',
            updatedDate: null,
        },
    };

    const customerInfo = {
        customerName: 'Trần Tân Long',
        locationId: '199/1 Bãi Sậy, Phường 4, Quận 6, TP. Hồ Chí Minh',
        customerEmail: 'tanlong6121@gmail.com',
        customerMobile: '0975926021',
        customerMessage: '',
    };
    return (
        <>
            <div className=" basis-3/4 mx-auto">
                <div className="order__details w-full bg-white rounded border border-wh-lightgray mb-6 md:min-h-[400px]">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Chi tiết đơn hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderedDetailsContainer
                                orderTotal={orderDetails.totalOrderValue}
                                orderedDetails={orderDetails.orderedDetails.map((det) => {
                                    return {
                                        serviceName: det.serviceName,
                                        serviceCategory: det.serviceCategory,
                                        measurement: det.measurement,
                                        image: det.image,
                                        price: det.price,
                                        unit: det.unit,
                                    };
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className="order__customer w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thông tin khách hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper">
                            <CenterOrderDetailsCustomerContainter customerInfo={customerInfo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 mx-auto">
                <div className="order__tracking w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Trạng thái đơn hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper"></div>
                    </div>
                </div>
                <div className="order__payment w-full bg-white rounded border border-wh-lightgray mb-6">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thông tin thanh toán</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper"></div>
                    </div>
                </div>
                <div className="order__delivery w-full bg-white rounded border border-wh-lightgray">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Thông tin giao hàng</div>
                    <div className="provider__page--content px-6 mt-6">
                        <div className="provider__services--wrapper"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CenterOrderDetailsContainer;
