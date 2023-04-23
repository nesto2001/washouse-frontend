import { Card, Col, Row, Space } from 'antd';
import React, { PureComponent } from 'react';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import { formatCurrency } from '../../utils/FormatUtils';

type Props = {};
const data = [
    {
        date: '15/04/2023',
        failed: 200,
        success: 2400,
        amt: 2400,
    },
    {
        date: '16/04/2023',
        failed: 300,
        success: 1398,
    },
    {
        date: '17/04/2023',
        failed: 200,
        success: 9800,
    },
    {
        date: '18/04/2023',
        failed: 200,
        success: 3908,
    },
    {
        date: '19/04/2023',
        failed: 200,
        success: 4800,
    },
    {
        date: '20/04/2023',
        failed: 200,
        success: 3800,
    },
    {
        date: '21/04/2023',
        failed: 200,
        success: 4300,
    },
];
const ManagerDashboardPage = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                    <div className="provider__page--content px-6 mt-8">
                        <div className="provider__staff--wrapper">
                            <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                                <Card className="col-span-3 row-span-3">
                                    <div className="font-extrabold text-2xl mb-8">Thống kê đơn hàng theo ngày</div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                    {/* <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Nhân viên</div>
                    <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                        Quản lý nhân viên của trung tâm
                    </div> */}
                    <div className="provider__page--content px-6 mt-8">
                        <div className="provider__staff--wrapper">
                            {/* <div className="grid grid-cols-3 gap-4">
                                <Card className="">
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
                                <Card className="">
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
                                <Card className="">
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
                            </div> */}
                            <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                                <Card className="col-span-2 row-span-3">
                                    <div className="font-extrabold text-2xl mb-8">Thống kê đơn hàng theo ngày</div>
                                    <LineChart
                                        width={600}
                                        height={400}
                                        data={data}
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
                                        <Line type="monotone" dataKey="failed" stroke="#82ca9d" name="Hủy" />
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

export default ManagerDashboardPage;
