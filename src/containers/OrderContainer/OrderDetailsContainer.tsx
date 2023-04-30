import { useEffect, useState } from 'react';
import { QrcodeOutlined } from '@ant-design/icons';
import { Modal, QRCode, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import Id from '../../assets/images/align-left.png';
import Calendar from '../../assets/images/calendar.png';
import DeliveryMan from '../../assets/images/delivery-man.png';
import Laundromat from '../../assets/images/laundromat.png';
import Notes from '../../assets/images/notes.png';
import Customer from '../../assets/images/user.png';
import Breadcrumb from '../../components/Breadcrumb';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import Loading from '../../components/Loading/Loading';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { BadgeStatusMap, PaymentBadgeStatusMap } from '../../mapping/BadgeStatusMap';
import { DeliveryTypeMap } from '../../mapping/DeliveryTypeMap';
import { OrderStatusMap, PaymentStatusMap } from '../../mapping/OrderStatusMap';
import { PaymentMethodMap } from '../../mapping/PaymentMethodMap';
import { CustomerOrderDetailsModel } from '../../models/Customer/CustomerOrderDetailsModel';
import { LocationDetailsModel } from '../../models/Location/LocationDetailsModel';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';
import { UserModel } from '../../models/User/UserModel';
import { getLocation } from '../../repositories/LocationRepository';
import { getOrderDetails } from '../../repositories/OrderRepository';
import { TrackingState } from '../../types/Tracking/TrackingState';
import { formatCurrency, formatPercentage } from '../../utils/FormatUtils';
import WHButton from '../../components/Button';
import RatingStars from '../../components/RatingStars/RatingStars';
import { BsReplyFill } from 'react-icons/bs';
import StarFull from '../../components/Star/StarFull';

type Props = {};

const OrderDetailsContainer = (props: Props) => {
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel>(userJson ? JSON.parse(userJson) : null);
    const [openQR, setOpenQR] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<CustomerOrderDetailsModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [customerLocation, setCustomerLocation] = useState<LocationDetailsModel>();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const p = params.get('p');

    useEffect(() => {
        setIsLoading(true);
        if (id && p) {
            getOrderDetails(id, p)
                .then((res) => {
                    setOrderDetails(res);
                    getLocation(res.locationId).then((loc) => {
                        setCustomerLocation(loc);
                    });
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                    setIsError(true);
                });
            setIsLoading(false);
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
            render: (_, record) =>
                record.orderDetailTrackings && (
                    <Tag
                        className="text-base font-medium py-0.5"
                        color={
                            BadgeStatusMap[
                                record.orderDetailTrackings[record.orderDetailTrackings.length - 1].status
                                    ? record.orderDetailTrackings[
                                          record.orderDetailTrackings.length - 1
                                      ].status.toLowerCase()
                                    : ''
                            ]
                        }
                    >
                        {
                            OrderStatusMap[
                                record.orderDetailTrackings[record.orderDetailTrackings.length - 1].status
                                    ? record.orderDetailTrackings[
                                          record.orderDetailTrackings.length - 1
                                      ].status.toLowerCase()
                                    : ''
                            ]
                        }
                    </Tag>
                ),
        },
    ];

    if (isLoading) {
        return <Loading screen />;
    }

    if (isError) {
        return <ErrorScreen />;
    }

    return (
        <>
            {user && <Breadcrumb />}
            {orderDetails && (
                <>
                    <div
                        className={clsx(
                            'orderdetails--wrapper flex flex-wrap justify-between mt-9',
                            !user && 'pt-20 -mt-1',
                        )}
                    >
                        <div className="orderdetails__order--main basis-full flex gap-10">
                            <div className="orderdetails__order basis-3/4 rounded-2xl border border-wh-gray">
                                <div className="flex justify-between px-6 pt-4">
                                    <h2 className="orderdetails__order--header text-left text-xl font-bold">
                                        Thông tin đơn hàng
                                    </h2>
                                    {orderDetails.status.toLowerCase() !== 'completed' && (
                                        <div
                                            className=""
                                            onClick={() => {
                                                setOpenQR(true);
                                            }}
                                        >
                                            <QrcodeOutlined
                                                style={{
                                                    fontSize: 22,
                                                    padding: 4,
                                                    border: '1px solid #424242',
                                                    borderRadius: 8,
                                                }}
                                                className="hover:bg-ws-light-gray cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>
                                <hr className="my-3 border-wh-gray" />
                                <div className="orderdetails__order--progress px-20 pt-9">
                                    <div className="order--progressbar relative min-h-[56px] flex flex-col items-center">
                                        <ProgressBar
                                            orderState={orderDetails.orderTrackings.map(
                                                (tracking, index): TrackingState => {
                                                    return {
                                                        id: index,
                                                        order: index + 1,
                                                        completed:
                                                            index < orderDetails.orderTrackings.length - 1
                                                                ? true
                                                                : false,
                                                        time: tracking.createdDate,
                                                        title: tracking.status,
                                                    };
                                                },
                                            )}
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
                                            <h3 className="font-medium">
                                                {DeliveryTypeMap[orderDetails.deliveryType]}
                                            </h3>
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
                                            <h3 className="font-medium">{orderDetails.center.centerName}</h3>
                                            <h3 className="font-medium">
                                                {orderDetails.center.centerAddress}, TP. Hồ Chí Minh
                                            </h3>
                                            <h4 className="text-sm">{orderDetails.center.centerPhone}</h4>
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
                                        <h2 className="col-span-1 text-xl font-semibold text-primary text-right">
                                            {formatCurrency(orderDetails.totalOrderValue ?? 0)}
                                        </h2>
                                        <h3 className="col-span-1 text-sm text-left">Mã giảm giá</h3>
                                        <h2 className="col-span-1 text-xl font-semibold text-primary text-right">
                                            {orderDetails.orderPayment.discount > 0
                                                ? formatPercentage(orderDetails.orderPayment.discount)
                                                : '0%'}
                                        </h2>
                                        <h3 className="col-span-1 text-sm text-left">Phí vận chuyển</h3>
                                        <h2 className="col-span-1 text-xl font-semibold text-primary text-right">
                                            {formatCurrency(orderDetails.deliveryPrice ?? 0)}
                                        </h2>
                                    </div>
                                    {orderDetails.status.toLowerCase() === 'ready' && (
                                        <div className="col-span-2 mt-4">
                                            <WHButton
                                                type="primary"
                                                className="w-full h-12"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                Thanh toán
                                            </WHButton>
                                        </div>
                                    )}
                                </div>
                                <div className="orderdetails__order--summary p-6 border border-wh-gray rounded-2xl mt-6">
                                    <h2 className="font-bold text-xl text-left">Thanh toán</h2>
                                    <hr className="mt-3 mb-6" />
                                    <div className="orderdetails__order--payment grid grid-cols-2 gap-x-10 gap-y-3 items-baseline text-left">
                                        <h3 className="col-span-1 font-bold text-sub-gray">
                                            Số lượng
                                            <div className="text-sub">{orderDetails.orderedDetails.length} dịch vụ</div>
                                        </h3>
                                        <h3 className="col-span-1 font-bold text-sub-gray">
                                            Mã giảm giá
                                            <div className="text-sub">
                                                {orderDetails.orderPayment.discount > 0
                                                    ? formatPercentage(orderDetails.orderPayment.discount)
                                                    : 'Không có'}
                                            </div>
                                        </h3>
                                        <h3 className="col-span-1 font-bold text-sub-gray">
                                            Ngày đặt
                                            <div className="text-sub">{orderDetails.orderTrackings[0].createdDate}</div>
                                        </h3>
                                        <h3 className="col-span-1 font-bold text-sub-gray">
                                            Trạng thái
                                            <Tag
                                                style={{ fontSize: 16, padding: '2px 4px' }}
                                                color={
                                                    PaymentBadgeStatusMap[
                                                        orderDetails.orderPayment.status.toLowerCase()
                                                    ]
                                                }
                                            >
                                                {PaymentStatusMap[orderDetails.orderPayment.status.toLowerCase()]}
                                            </Tag>
                                        </h3>
                                    </div>
                                </div>
                                {orderDetails.feedback && (
                                    <div className="orderdetails__order--summary p-6 border border-wh-gray rounded-2xl mt-6">
                                        <div className="flex justify-between">
                                            <h2 className="font-bold text-xl text-left">Đánh giá</h2>
                                            <div className="flex items-center gap-1">
                                                <div className="">
                                                    <StarFull numOfStar={1} />
                                                </div>
                                                <h2 className="font-bold text-xl">
                                                    {orderDetails.feedback.rating.toFixed(1)}
                                                </h2>
                                            </div>
                                        </div>
                                        <hr className="mt-3 mb-6" />
                                        <div className="orderdetails__order--payment gap-x-10 items-baseline flex flex-col">
                                            <div className="flex justify-between w-full items-end">
                                                <div className="font-bold flex-1 text-left overflow-hidden">
                                                    {orderDetails.feedback.createdBy}
                                                </div>
                                                <div className="text-sm text-ws-gray">
                                                    {orderDetails.feedback.createdDate.format('DD-MM-YYYY')}
                                                </div>
                                            </div>
                                            <div className="">{orderDetails.feedback.content}</div>
                                        </div>
                                        {orderDetails.feedback.replyMessage && (
                                            <div className="flex w-full justify-between bg-ws-light-gray rounded-lg p-2 pr-4 mt-2">
                                                <div className="flex gap-3">
                                                    <BsReplyFill className="text-lg" />
                                                    <div className="text-left">
                                                        <div className="font-semibold">{'Trung tâm'}</div>
                                                        <div>{orderDetails.feedback.replyMessage}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="orderdetails basis-3/4 mt-8 mb-16 pr-8">
                            <h2 className="orderdetails--header text-left text-xl font-bold pl-6 pt-4">
                                Chi tiết đơn hàng
                            </h2>
                            <div className="orderdetails--list w-full mt-3">
                                <Table
                                    rowClassName="cursor-pointer"
                                    dataSource={orderDetails.orderedDetails}
                                    columns={columns}
                                    loading={orderDetails == null}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal
                        closable
                        title="Mã QR đơn hàng"
                        open={openQR}
                        onCancel={() => setOpenQR(false)}
                        footer={null}
                        getContainer={'HTMLElement'}
                        centered
                        maskClosable
                        width={460}
                        cancelButtonProps={{ style: { background: 'white' } }}
                        bodyStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <QRCode
                            size={360}
                            value={orderDetails!.id}
                            style={{ marginBottom: 16, backgroundColor: 'white', border: '1px solid #b3b3b3' }}
                        />
                        <div className="text-center w-full flex justify-center">
                            <div className="w-[320px] font-medium text-lg">
                                Đưa mã QR cho nhân viên khi mang đồ đến trung tâm để check-in đơn hàng
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
};

export default OrderDetailsContainer;
