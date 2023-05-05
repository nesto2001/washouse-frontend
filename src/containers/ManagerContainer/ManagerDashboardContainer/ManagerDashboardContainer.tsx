import { Card, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import { ManagerStatisticsModel } from '../../../models/Staff/ManagerStatisticsModel';
import { getManagerStatistic } from '../../../repositories/StaffRepository';
import { formatCurrency } from '../../../utils/FormatUtils';
const { RangePicker } = DatePicker;

function ManagerDashboardContainer() {
    const [statistics, setStatistics] = useState<ManagerStatisticsModel>();
    const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().add(-7, 'd'), dayjs()]);

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
        getManagerStatistic({ from: range[0], to: range[1] }).then((res) => {
            setStatistics(res);
        });
    }, [range]);

    const onRangeChange = (dates: null | (dayjs.Dayjs | null)[], dateStrings: string[]) => {
        if (dates && dates[0] && dates[1]) {
            setRange([dates[0], dates[1]]);
        } else {
            console.log('Clear');
        }
    };
    return (
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
                                                {statistics?.orderOverview.numOfPendingOrder}
                                            </div>
                                            <div className="">Chờ xác nhận</div>
                                        </div>
                                    </Link>
                                    <Link to={'/provider/orders'}>
                                        <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.orderOverview.numOfProcessingOrder}
                                            </div>
                                            <div className="">Đang xử lý</div>
                                        </div>
                                    </Link>

                                    <Link to={'/provider/orders'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.orderOverview.numOfReadyOrder}
                                            </div>
                                            <div className="">Sẵn sàng</div>
                                        </div>
                                    </Link>
                                    <Link to={'/provider/orders'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.orderOverview.numOfCancelledOrder}
                                            </div>
                                            <div className="">Đã hủy</div>
                                        </div>
                                    </Link>
                                    <Link to={'/provider/orders'}>
                                        <div className="col-span-1 text-center border-x hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.orderOverview.numOfPendingDeliveryOrder}
                                            </div>
                                            <div className="">Chờ vận chuyển</div>
                                        </div>
                                    </Link>
                                    <Link to={'/provider/orders'}>
                                        <div className="col-span-1 text-center hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer transition-colors ease-in-out py-4 rounded-md">
                                            <div className="font-medium text-base text-primary">
                                                {statistics?.orderOverview.numOfCompletedOrder}
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
                                    data={statistics?.dailystatistics.map((daily) => {
                                        return {
                                            date: daily.day.format('DD-MM'),
                                            success: daily.successfulOrder,
                                            failed: daily.cancelledOrder,
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
                                        dataKey="success"
                                        stroke="#396afc"
                                        activeDot={{ r: 8 }}
                                        name="Thành công"
                                    />
                                    <Line type="monotone" dataKey="failed" stroke="#b60000" name="Hủy" />
                                </LineChart>
                            </Card>

                            <RangePicker
                                className="h-12"
                                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                                placement="bottomRight"
                                presets={rangePresets}
                                defaultValue={range}
                                onChange={onRangeChange}
                            />

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
                                            {statistics?.dailystatistics.reduce(
                                                (pre, current) => pre + current.totalOrder,
                                                0,
                                            )}{' '}
                                            <span className="font-bold text-xl text-ws-black">đơn hàng</span>
                                        </div>
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
                                            {formatCurrency(
                                                statistics?.dailystatistics.reduce(
                                                    (pre, current) => pre + current.revenue,
                                                    0,
                                                ) ?? 0,
                                            )}
                                        </div>
                                    </Space>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerDashboardContainer;
