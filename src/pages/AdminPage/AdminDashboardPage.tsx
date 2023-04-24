import { Card, Space } from 'antd';
import { BsClipboard2DataFill, BsFileEarmarkPost } from 'react-icons/bs';
import { FaMoneyBillWave, FaStore, FaUserFriends } from 'react-icons/fa';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils/FormatUtils';
import { Link } from 'react-router-dom';

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
const AdminDashboardPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray min-w-[1033px]">
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                            <Card className="col-span-3 row-span-3">
                                <div className="font-extrabold text-2xl mb-8">Quản lý trung tâm</div>
                                <div className="grid grid-cols-3 gap-4 gap-y-4">
                                    <Link to={'/admin/centers/request'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">0</div>
                                            <div className="">Đợi duyệt</div>
                                        </div>
                                    </Link>
                                    <Link to={'/admin/centers'}>
                                        <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">0</div>
                                            <div className="">Đang hoạt động</div>
                                        </div>
                                    </Link>
                                    <Link to={'/admin/centers'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">0</div>
                                            <div className="">Đã đóng cửa</div>
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
                                        <div className="font-extrabold text-2xl text-ws-black">Người dùng mới</div>
                                        <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                            <FaUserFriends className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <Space direction="vertical">
                                        <div className="font-extrabold text-4xl text-primary">
                                            + 7 <span className="font-bold text-xl text-ws-black">người dùng</span>
                                        </div>
                                        <div>+40% so với hôm qua</div>
                                    </Space>
                                </div>
                            </Card>
                            <Card className="col-span-1 row-span-1">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="font-extrabold text-2xl">Trung tâm mới</div>
                                        <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                            <FaStore className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <Space direction="vertical">
                                        <div className="font-extrabold text-4xl text-primary">
                                            + 7 <span className="font-bold text-xl text-ws-black">trung tâm</span>
                                        </div>
                                        <div>+40% so với hôm qua</div>
                                    </Space>
                                </div>
                            </Card>{' '}
                            <Card className="col-span-1 row-span-1">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="font-extrabold text-2xl">Tổng bài đăng</div>
                                        <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                            <BsFileEarmarkPost className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <Space direction="vertical">
                                        <div className="font-extrabold text-4xl text-primary">
                                            100 <span className="font-bold text-xl text-ws-black">bài đăng</span>
                                        </div>
                                        <div>+15% so với hôm qua</div>
                                    </Space>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
