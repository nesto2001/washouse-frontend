import { Card, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { FaStore, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getAdminStatistic } from '../../repositories/AdminRepository';
import { AdminStatisticsModel } from '../../models/Admin/AdminCenterDetails/AdminStatisticsModel';
const { RangePicker } = DatePicker;

function AdminDashboardContainer() {
    const [statistics, setStatistics] = useState<AdminStatisticsModel>();
    const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().add(-7, 'd'), dayjs()]);

    const onRangeChange = (dates: null | (dayjs.Dayjs | null)[], dateStrings: string[]) => {
        if (dates && dates[0] && dates[1]) {
            setRange([dates[0], dates[1]]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets: {
        label: string;
        value: [dayjs.Dayjs, dayjs.Dayjs];
    }[] = [
        { label: 'Hôm nay', value: [dayjs(), dayjs()] },
        { label: 'Hôm qua', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
        { label: '7 ngày qua', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày qua', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày qua', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày qua', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];
    useEffect(() => {
        getAdminStatistic({ from: range[0], to: range[1] }).then((res) => {
            setStatistics(res);
        });
    }, [range]);
    return (
        <>
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray min-w-[1033px]">
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__staff--wrapper">
                        <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
                            <Card className="col-span-3 row-span-3">
                                <div className="font-extrabold text-2xl mb-8">Quản lý trung tâm</div>
                                <div className="grid grid-cols-3 gap-4 gap-y-4">
                                    <Link to={'/admin/centers/request'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.centerOverview.numberOfPendingCenters}
                                            </div>
                                            <div className="">Đợi duyệt</div>
                                        </div>
                                    </Link>
                                    <Link to={'/admin/centers'}>
                                        <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.centerOverview.numberOfActiveCenters}
                                            </div>
                                            <div className="">Đang hoạt động</div>
                                        </div>
                                    </Link>
                                    <Link to={'/admin/centers'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.centerOverview.numberOfClosedCenters}
                                            </div>
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
                            <Card className="col-span-2 row-span-4">
                                <div className="font-extrabold text-2xl mb-8">Thống kê đơn hàng theo ngày</div>
                                <LineChart
                                    width={600}
                                    height={400}
                                    data={statistics?.dailystatistics.map((daily) => {
                                        return {
                                            date: daily.day.format('DD-MM'),
                                            center: daily.numberOfNewCenters,
                                            user: daily.numberOfNewUsers,
                                        };
                                    })}
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
                                        dataKey="center"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                        name="Trung tâm"
                                    />
                                    <Line type="monotone" dataKey="user" stroke="#82ca9d" name="Tài khoản" />
                                </LineChart>
                            </Card>
                            <RangePicker
                                onChange={onRangeChange}
                                className="h-12"
                                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                                placement="bottomRight"
                                presets={rangePresets}
                                defaultValue={range}
                            />
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
                                            +{' '}
                                            {statistics?.dailystatistics.reduce(
                                                (pre, current) => pre + current.numberOfNewUsers,
                                                0,
                                            )}{' '}
                                            <span className="font-bold text-xl text-ws-black">người dùng</span>
                                        </div>
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
                                            +{' '}
                                            {statistics?.dailystatistics.reduce(
                                                (pre, current) => pre + current.numberOfNewCenters,
                                                0,
                                            )}{' '}
                                            <span className="font-bold text-xl text-ws-black">trung tâm</span>
                                        </div>
                                    </Space>
                                </div>
                            </Card>{' '}
                            <Card className="col-span-1 row-span-1">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="font-extrabold text-2xl">Bài đăng mới</div>
                                        <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center">
                                            <BsFileEarmarkPost className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <Space direction="vertical">
                                        <div className="font-extrabold text-4xl text-primary">
                                            +{' '}
                                            {statistics?.dailystatistics.reduce(
                                                (pre, current) => pre + current.numberOfNewPosts,
                                                0,
                                            )}{' '}
                                            <span className="font-bold text-xl text-ws-black">bài đăng</span>
                                        </div>
                                    </Space>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardContainer;
