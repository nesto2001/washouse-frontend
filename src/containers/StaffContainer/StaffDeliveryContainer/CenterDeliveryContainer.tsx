import { useState, useEffect } from 'react';

import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { Avatar, Empty, Form, Input, Select, Space, Spin, Tabs, TabsProps, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import OrderList from '../../../components/StaffOrderList/OrderList';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';
import { Paging } from '../../../types/Common/Pagination';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import Destination from '../../../assets/images/destination.png';
import React from 'react';

type Props = {
    setSelectedOrder: React.Dispatch<React.SetStateAction<string | undefined>>;
    openPanel: boolean;
};

const searchType = [
    { value: 'id', label: 'Mã đơn hàng' },
    { value: 'name', label: 'Tên khách hàng' },
];

export type SearchParamsData = {
    searchString?: string;
    searchType?: string;
    status?: string;
    page?: number;
    pageSize?: number;
    fromDate?: string;
    toDate?: string;
    deliveryType?: boolean;
    deliveryStatus?: string;
};

const CenterDeliveryContainer = ({ setSelectedOrder, openPanel }: Props) => {
    const [form] = Form.useForm();
    const [orders, setOrders] = useState<CenterOrderModel[]>([]);
    const [msg, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [paging, setPaging] = useState<Paging>({
    //     itemsPerPage: 10,
    //     pageNumber: 1,
    // });
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchType: 'id',
        deliveryType: true,
        deliveryStatus: 'Waiting',
    });

    // const [centerOrders, setCenterOrders] = useState<CenterOrderModel[]>();

    // const onChange = (key: string) => {
    //     setCurrentPage(1);
    //     if (key !== '1') {
    //         setSearchParams((prev) => ({ ...prev, status: key }));
    //     } else {
    //         setSearchParams((prev) => ({ ...prev, status: '' }));
    //     }
    // };

    // useEffect(() => {}, [currentPage]);
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getManagerCenterOrders({
                ...searchParams,
            });
        };
        fetchData()
            .then((res) => {
                setOrders(res.items);
                // setPaging({
                //     itemsPerPage: res.itemsPerPage,
                //     pageNumber: res.pageNumber,
                //     totalItems: res.totalItems,
                //     totalPages: res.totalPages,
                // });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                msg.error('Không tìm thấy đơn hàng mong muốn');
                setIsLoading(false);
                setOrders([]);
            });
    }, [searchParams]);

    // const items: TabsProps['items'] = centerOrders && [
    //     {
    //         key: '1',
    //         label: `Tất cả`,
    //     },
    //     {
    //         key: 'Pending',
    //         label: `Đang chờ`,
    //     },
    //     {
    //         key: 'Confirmed',
    //         label: `Xác nhận`,
    //     },
    //     {
    //         key: 'Processing',
    //         label: `Xử lý`,
    //     },
    //     {
    //         key: 'Ready',
    //         label: `Sẵn sàng`,
    //     },
    //     {
    //         key: 'Completed',
    //         label: `Hoàn tất`,
    //     },
    //     {
    //         key: 'Cancelled',
    //         label: `Đã hủy`,
    //     },
    // ];
    if (isError) {
        return <Empty description="Không có đơn hàng nào" className="mb-5" />;
    }

    const handleViewOrder = (id: string) => {
        setSelectedOrder(id);
    };

    return (
        <div className="">
            <div className="provider__deliveries--active font-bold text-xl mb-6">
                Đơn hàng chờ vận chuyển ({orders.length})
            </div>
            <div className="provider__deliveries--filter">
                <Form
                    form={form}
                    name="service"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 1200 }}
                    initialValues={{}}
                    autoComplete="off"
                    size="large"
                >
                    <div className="flex flex-wrap justify-between">
                        <Form.Item className="basis-1/2 mb-1">
                            <Space.Compact size="large">
                                <Form.Item name={['search', 'type']} style={{ width: 160 }}>
                                    <Select defaultValue="id" options={searchType} />
                                </Form.Item>
                                <Form.Item
                                    name={['search', 'string']}
                                    rules={[{ min: 2, message: 'Vui lòng nhập tối thiểu 2 ký tự' }]}
                                    style={{ width: 260, flexGrow: 1 }}
                                >
                                    <Input
                                        defaultValue=""
                                        placeholder="Vui lòng nhập tối thiểu 2 ký tự"
                                        onChange={(e) => {
                                            setSearchParams((prevData) => ({
                                                ...prevData,
                                                searchString: e.target.value ?? null,
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div
                className={`provider__deliveries mt-12 mb-72 flex flex-wrap gap-10 ${
                    openPanel ? 'w-[440px]' : 'w-full max-w-[680px]'
                }`}
            >
                {orders.map((order) => (
                    <div
                        className={`provider__delivery--item ${
                            openPanel ? 'w-[440px]' : 'w-full max-w-[680px]'
                        } p-4 border border-wh-gray rounded-xl cursor-pointer`}
                        onClick={(e) => handleViewOrder(order.id)}
                    >
                        <div className="delivery__item--header flex justify-between items-center">
                            <div className="delivery__item--id font-semibold">Mã đơn: #{order.id}</div>
                            <div className="delivery__item--status">
                                <Tag color="default">{order.status}</Tag>
                            </div>
                        </div>
                        <div
                            className={`deliveries justify-between gap-0 ${
                                openPanel ? 'flex-col w-[406px]' : 'flex w-full max-w-[680px]'
                            }`}
                        >
                            {order.deliveries.map(
                                (delivery) =>
                                    delivery && (
                                        <>
                                            <div className="deliveries__to flex-shrink">
                                                <div className="delivery__item--type font-bold text-sub-gray text-base my-2">
                                                    Lấy đơn
                                                </div>
                                                <div className="delivery__item--destination flex gap-3">
                                                    <Avatar src={Destination} size={50} />
                                                    <div className="destination__info flex flex-col justify-center">
                                                        <div className="destination__info--address font-bold text-base">
                                                            123 Thủy Lợi
                                                        </div>
                                                        <div className="destination__info--administrative font-medium text-sub-gray">
                                                            Phước Long A, Quận 9, TP. Hồ Chí Minh
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${
                                                    openPanel ? 'w-full h-[1px] my-3' : 'w-[1px]'
                                                } bg-wh-gray`}
                                            ></div>
                                            <div className="deliveries__back">
                                                <div className="delivery__item--type font-bold text-sub-gray text-base my-2">
                                                    Trả đơn
                                                </div>
                                                <div className="delivery__item--destination flex gap-3">
                                                    <Avatar src={Destination} size={50} />
                                                    <div className="destination__info flex flex-col justify-center">
                                                        <div className="destination__info--address font-bold text-base">
                                                            123 Thủy Lợi
                                                        </div>
                                                        <div className="destination__info--administrative font-medium text-sub-gray">
                                                            Phước Long A, Quận 9, TP. Hồ Chí Minh
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ),
                            )}
                        </div>
                        <hr className="my-3" />
                        <div className="delivery__item--customer">
                            <div className="font-medium text-sub-gray w-20 inline-block">Khách hàng</div>
                            <div className="delivery__item--customerinfo flex justify-between items-baseline">
                                <div className="text-base font-bold">{order.customerName}</div>
                                <div className="font-medium">{}</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="provider__delivery--item w-[440px] p-4 border border-wh-gray rounded-xl">
                    <div className="delivery__item--header flex justify-between items-center">
                        <div className="delivery__item--id font-semibold">Mã đơn: #20230412_00000001</div>
                        <div className="delivery__item--status">
                            <Tag color="default">Đang chờ</Tag>
                        </div>
                    </div>
                    <div className="delivery__item--type font-bold text-sub-gray text-base my-2">Chiều đi</div>
                    <div className="delivery__item--destination flex gap-3">
                        <Avatar src={Destination} size={50} />
                        <div className="destination__info flex flex-col justify-center">
                            <div className="destination__info--address font-bold text-base">123 Thủy Lợi</div>
                            <div className="destination__info--administrative font-medium text-sub-gray">
                                Phước Long A, Quận 9, TP. Hồ Chí Minh
                            </div>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="delivery__item--customer">
                        <div className="font-medium text-sub-gray">Khách hàng</div>
                        <div className="delivery__item--customerinfo flex justify-between items-baseline">
                            <div className="text-base font-bold">Lê Thành Đạt</div>
                            <div className="font-medium">0966751198</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterDeliveryContainer;
