import * as React from 'react';
import { useState, useEffect } from 'react';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Id from '../../assets/images/align-left.png';
import Calendar from '../../assets/images/calendar.png';
import DeliveryMan from '../../assets/images/delivery-man.png';
import Laundromat from '../../assets/images/laundromat.png';
import Customer from '../../assets/images/user.png';
import Notes from '../../assets/images/notes.png';
import Breadcrumb from '../../components/Breadcrumb';
import { UserModel } from '../../models/User/UserModel';
import clsx from 'clsx';
import { CenterOrderDetailsModel } from '../../models/Staff/CenterOrderDetailsModel';
import { getOrderDetails } from '../../repositories/OrderRepository';
import { useLocation, useParams } from 'react-router-dom';
import { TrackingState } from '../../types/Tracking/TrackingState';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import { DeliveryTypeMap } from '../../mapping/DeliveryTypeMap';
import { PaymentMethodMap } from '../../mapping/PaymentMethodMap';
import { LocationDetailsModel } from '../../models/Location/LocationDetailsModel';
import { getLocation } from '../../repositories/LocationRepository';
import { TableColumnProps, TableProps, Tabs, Tag } from 'antd';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';
import Table, { ColumnsType } from 'antd/es/table';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';
import { BadgeStatusMap } from '../../mapping/BadgeStatusMap';
import { formatCurrency } from '../../utils/FormatUtils';

type Props = {};

const OrderDetailsContainer = (props: Props) => {
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel>(userJson ? JSON.parse(userJson) : null);
    const [orderDetails, setOrderDetails] = useState<CenterOrderDetailsModel>();
    const [customerLocation, setCustomerLocation] = useState<LocationDetailsModel>();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const p = params.get('p');

    useEffect(() => {
        console.log(id, p);
        if (id && p) {
            const fetchOrder = async () => {
                return await getOrderDetails(id, p);
            };
            fetchOrder().then((res) => {
                setOrderDetails(res);
                getLocation(res.locationId).then((loc) => {
                    setCustomerLocation(loc);
                });
            });
        }
    }, [id, p]);

    const columns: ColumnsType<CenterOrderedServiceModel> = [
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
            render: (_, record) => (
                <div className="flex">
                    <div className="ordered__service--thumb max-w-[120px] max-h-[100px] h-[100px] w-[120px] rounded-lg overflow-hidden">
                        <img className="h-full w-full object-cover" src={record.image} alt="" />
                    </div>
                    <div className="ordered__service--content">
                        <div className="ordered__item--details ml-4 w-[300px]">
                            <div className="font-bold text-lg">{record.name}</div>
                            <div className="font-medium text-sub-gray text-sm">Phân loại: {record.category}</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Định lượng',
            dataIndex: 'measurement',
            key: 'measurement',
            render: (value, record) => (
                <div className="ordered__item--weight w-[100px] text-base font-bold">
                    {value} <span className="text-sub-gray">{record.unit}</span>
                </div>
            ),
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <div className="font-medium text-base">{formatCurrency(value ?? 0)}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (value) => (
                <Tag className="text-base font-medium py-0.5" color={BadgeStatusMap[value ?? 'None']}>
                    {OrderStatusMap[value ?? 'None']}
                </Tag>
            ),
        },
    ];

    if (!orderDetails) {
        return <ErrorScreen />;
    }

    return (
        <>
            {user && <Breadcrumb />}
            <div className={clsx('orderdetails--wrapper flex flex-wrap justify-between mt-9', !user && 'pt-20 -mt-1')}>
                <div className="orderdetails__order--main basis-full flex gap-10">
                    <div className="orderdetails__order basis-3/4 rounded-2xl border border-wh-gray">
                        <h2 className="orderdetails__order--header text-left text-xl font-bold pl-6 pt-4">
                            Thông tin đơn hàng
                        </h2>
                        <hr className="my-3 border-wh-gray" />
                        <div className="orderdetails__order--progress px-20 pt-9">
                            <div className="order--progressbar relative min-h-[56px] flex flex-col items-center">
                                <ProgressBar
                                    orderState={orderDetails.orderTrackings.map((tracking, index): TrackingState => {
                                        return {
                                            id: index,
                                            order: index + 1,
                                            completed: index < orderDetails.orderTrackings.length - 1 ? true : false,
                                            time: tracking.createdDate,
                                            title: tracking.status,
                                        };
                                    })}
                                />
                            </div>
                        </div>
                        <div className="orderdetails_order--content flex flex-wrap mt-8 px-9 text-left justify-between gap-y-8 mb-16">
                            <div className="orderdetails__order--id basis-1/3 max-w-[234px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={Id} alt="" />
                                    </div>
                                    Mã đơn hàng
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <h3 className="font-medium">{orderDetails.id}</h3>
                                </div>
                            </div>
                            <div className="orderdetails__order--id basis-1/3 max-w-[234px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={Calendar} alt="" />
                                    </div>
                                    Vận chuyển
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <h3 className="font-medium">{DeliveryTypeMap[orderDetails.deliveryType]}</h3>
                                </div>
                            </div>
                            <div className="orderdetails__order--id basis-1/3 max-w-[145px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={DeliveryMan} alt="" />
                                    </div>
                                    Thanh toán
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <h3 className="font-medium">
                                        {PaymentMethodMap[orderDetails.orderPayment.method]}
                                    </h3>
                                </div>
                            </div>
                            <div className="orderdetails__order--id basis-1/3 max-w-[234px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={Laundromat} alt="" />
                                    </div>
                                    Trung tâm
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <h3 className="font-medium">The Clean House</h3>
                                    <h3 className="font-medium">518 Lê Văn Sỹ, Phường 14, Quận 3, TP. HCM</h3>
                                    <h4 className="text-sm mt-2">thecleanhouse2020@gmail.com</h4>
                                    <h4 className="text-sm">089 851 0718</h4>
                                </div>
                            </div>
                            <div className="orderdetails__order--id basis-1/3 max-w-[234px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={Customer} alt="" />
                                    </div>
                                    Khách hàng
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <h3 className="font-medium">{orderDetails.customerName}</h3>
                                    <h3 className="font-medium">{`${customerLocation?.address}, ${customerLocation?.ward.name}, ${customerLocation?.ward.district.name}, TP. Hồ Chí Minh`}</h3>
                                    <h4 className="text-sm mt-2">{orderDetails.customerEmail}</h4>
                                    <h4 className="text-sm">{orderDetails.customerMobile}</h4>
                                </div>
                            </div>
                            <div className="orderdetails__order--id basis-1/3 max-w-[145px]">
                                <div className="orderdetails__order--header text-sub-gray font-bold flex gap-1 items-center">
                                    <div className="w-[28px] h-[28px]">
                                        <img src={Notes} alt="" />
                                    </div>
                                    Ghi chú
                                </div>
                                <div className="orderdetails__order--info text-sub pl-8 mt-2">
                                    <p className="font-medium"> {orderDetails.customerMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="orderdetails--sider basis-1/4 flex flex-col">
                        <div className="orderdetails__order--summary p-6 pt-4 border border-wh-gray rounded-2xl">
                            <h2 className="font-bold text-xl text-left">Thông tin thanh toán</h2>
                            <hr className="mt-3 mb-6" />
                            <div className="orderdetails__order--payment grid grid-cols-2 gap-y-3 items-baseline">
                                <h3 className="col-span-1 text-sm text-left">Tổng tiền</h3>
                                <h2 className="col-span-1 text-xl font-semibold text-primary text-right">90,000</h2>
                                <h3 className="col-span-1 text-sm text-left">Mã giảm giá</h3>
                                <h2 className="col-span-1 text-xl font-semibold text-primary text-right">0đ</h2>
                                <h3 className="col-span-1 text-sm text-left">Phí vận chuyển</h3>
                                <h2 className="col-span-1 text-xl font-semibold text-primary text-right">0đ</h2>
                            </div>
                        </div>
                        <div className="orderdetails__order--summary p-6 border border-wh-gray rounded-2xl mt-6">
                            <h2 className="font-bold text-xl text-left">Thanh toán</h2>
                            <hr className="mt-3 mb-6" />
                            <div className="orderdetails__order--payment grid grid-cols-2 gap-x-10 gap-y-3 items-baseline text-left">
                                <h3 className="col-span-1 font-bold text-sub-gray">
                                    Số lượng
                                    <div className="text-sub">3 dịch vụ</div>
                                </h3>
                                <h3 className="col-span-1 font-bold text-sub-gray">
                                    Mã giảm giá
                                    <div className="text-sub">Không có</div>
                                </h3>
                                <h3 className="col-span-1 font-bold text-sub-gray">
                                    Thanh toán
                                    <div className="text-sub">Tiền mặt</div>
                                </h3>
                                <h3 className="col-span-1 font-bold text-sub-gray">
                                    Trạng thái
                                    <div className="text-green">Đã thanh toán</div>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="orderdetails basis-3/4 mt-8 mb-16 pr-8">
                    <h2 className="orderdetails--header text-left text-xl font-bold pl-6 pt-4">Chi tiết đơn hàng</h2>
                    <div className="orderdetails--list w-full mt-3">
                        <Table
                            dataSource={orderDetails.orderedDetails}
                            columns={columns}
                            loading={orderDetails == null}
                        />
                        {/* <table className="orderdetails__list--table w-full">
                            <thead>
                                <tr className="font-bold text-sub-gray border-b border-wh-gray">
                                    <td className="py-4"></td>
                                    <td className="py-4">Dịch vụ</td>
                                    <td className="py-4">Khối lượng</td>
                                    <td className="py-4">Đơn giá</td>
                                    <td className="py-4">Thời gian</td>
                                    <td className="py-4">Trạng thái</td>
                                </tr>
                            </thead>
                            <tbody className="font-bold text-sub">
                                <tr className="border-b border-wh-gray">
                                    <td className="py-4">1.</td>
                                    <td className="py-4">Giặt sấy</td>
                                    <td className="py-4">4.5 kg</td>
                                    <td className="py-4">30,000đ</td>
                                    <td className="py-4">120 phút</td>
                                    <td className="py-4 text-green">Hoàn tất</td>
                                </tr>
                                <tr className="border-b border-wh-gray">
                                    <td className="py-4">2.</td>
                                    <td className="py-4">Giặt hấp</td>
                                    <td className="py-4">1.2 kg</td>
                                    <td className="py-4">30,000đ</td>
                                    <td className="py-4">120 phút</td>
                                    <td className="py-4 text-primary">Đang xử lý</td>
                                </tr>
                                <tr className="border-b border-wh-gray">
                                    <td className="py-4">3.</td>
                                    <td className="py-4">Giặt rèm</td>
                                    <td className="py-4">3.4 kg</td>
                                    <td className="py-4">30,000đ</td>
                                    <td className="py-4">120 phút</td>
                                    <td className="py-4 text-primary">Đang xử lý</td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsContainer;
