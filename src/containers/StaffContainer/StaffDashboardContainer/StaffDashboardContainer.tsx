import { Card, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../../utils/FormatUtils';
import { DailyStatisticsModel } from '../../../models/Dashboard/DailyStatisticsModel';
import { OrderOverviewModel } from '../../../models/Dashboard/OrderOverviewModel';
import { getCenterStatistics } from '../../../repositories/StaffRepository';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';

type Props = {};

const StaffDashboardContainer = (props: Props) => {
    const [dailyStats, setDailyStats] = useState<DailyStatisticsModel[]>([]);
    const [orderOverview, setOrderOverview] = useState<OrderOverviewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getCenterStatistics()
            .then((res) => {
                setDailyStats(res.dailystatistics);
                setOrderOverview(res.orderOverview);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <OthersSpin />;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray min-w-[1033px]">
                    <div className="provider__page--content px-6 mt-8">
                        <div className="provider__staff--wrapper">
                            <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                                <Card className="col-span-3 row-span-3">
                                    <div className="font-extrabold text-2xl mb-8">Tổng quan đơn hàng</div>
                                    <div className="grid grid-cols-3 gap-4 gap-y-4">
                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfPendingOrder ?? 0}
                                                </div>
                                                <div className="">Chờ xác nhận</div>
                                            </div>
                                        </Link>
                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfProcessingOrder ?? 0}
                                                </div>
                                                <div className="">Đang xử lý</div>
                                            </div>
                                        </Link>

                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfReadyOrder ?? 0}
                                                </div>
                                                <div className="">Sẵn sàng</div>
                                            </div>
                                        </Link>
                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfCancelledOrder ?? 0}
                                                </div>
                                                <div className="">Đã hủy</div>
                                            </div>
                                        </Link>
                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfPendingDeliveryOrder ?? 0}
                                                </div>
                                                <div className="">Chờ vận chuyển</div>
                                            </div>
                                        </Link>
                                        <Link to={'/provider/orders'}>
                                            <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                                <div className="font-medium text-base text-primary">
                                                    {orderOverview?.numOfCompletedOrder ?? 0}
                                                </div>
                                                <div className="">Hoàn tất</div>
                                            </div>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                    <div className="provider__page--content px-6 mt-8">
                        <div className="provider__staff--wrapper">
                            <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                                <Card className="col-span-2 row-span-3">
                                    <div className="font-extrabold text-2xl mb-8">Thống kê đơn hàng theo ngày</div>
                                    <LineChart
                                        width={600}
                                        height={400}
                                        data={dailyStats}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="success"
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                            name="Thành công"
                                        />
                                        <Line type="monotone" dataKey="cancelled" stroke="#82ca9d" name="Hủy" />
                                    </LineChart>
                                </Card>
                                <Card className="col-span-1 row-span-1">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="font-extrabold text-2xl text-ws-black">Tổng đơn hàng</div>
                                            <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                                <BsClipboard2DataFill className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <Space direction="vertical">
                                            <div className="font-extrabold text-4xl text-primary">
                                                20 <span className="font-bold text-xl text-ws-black">đơn hàng</span>
                                            </div>
                                            <div>+55% so với hôm qua</div>
                                        </Space>
                                    </div>
                                </Card>
                                <Card className="col-span-1 row-span-1">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="font-extrabold text-2xl">Doanh thu</div>
                                            <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                                <FaMoneyBillWave className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <Space direction="vertical">
                                            <div className="font-extrabold text-4xl text-primary">
                                                {formatCurrency(538000)}
                                            </div>
                                            <div>+15% so với hôm qua</div>
                                        </Space>
                                    </div>
                                </Card>
                                <Card className="col-span-1 row-span-1">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="font-extrabold text-2xl">Khách hàng mới</div>
                                            <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                                <FaUserFriends className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <Space direction="vertical">
                                            <div className="font-extrabold text-4xl text-primary">
                                                + 7 <span className="font-bold text-xl text-ws-black">khách hàng</span>
                                            </div>
                                            <div>+40% so với hôm qua</div>
                                        </Space>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>Thống kê trong tháng 1/2023</div> */}
        </>
    );
};

export default StaffDashboardContainer;
