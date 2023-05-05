import type { TabsProps } from 'antd';
import { Col, DatePicker, Empty, Form, Radio, Row, Tabs } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CustomerOrderList from '../../components/CustomerOrderList/CustomerOrderList';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { CustomerOrderModel } from '../../models/Customer/CustomerOrderModel';
import { UserModel } from '../../models/User/UserModel';
import { getCustomerOrders } from '../../repositories/CustomerRepository';
import './CustomerContainer.scss';

const { RangePicker } = DatePicker;

type Props = {};

type RangeValue = [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;

type SearchParamsData = {
    searchString?: string;
    orderType: string | null;
    status?: string;
    page?: number;
    pageSize?: number;
    fromDate?: string;
    toDate?: string;
};

const items: TabsProps['items'] = [
    {
        key: 'All',
        label: `Tất cả`,
    },
    {
        key: 'Pending',
        label: `Đang chờ`,
    },
    {
        key: 'Confirmed',
        label: `Xác nhận`,
    },
    {
        key: 'Processing',
        label: `Đang xử lý`,
    },
    {
        key: 'Ready',
        label: `Sẵn sàng`,
    },
    {
        key: 'Completed',
        label: `Hoàn thành`,
    },
    {
        key: 'Cancelled',
        label: `Đã hủy`,
    },
];

const CustomerOrdersContainer = (props: Props) => {
    const userJson = localStorage.getItem('currentUser');
    const user: UserModel = userJson && JSON.parse(userJson);
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [customerOrder, setcustomerOrder] = useState<CustomerOrderModel[]>();
    const [dates, setDates] = useState<RangeValue>([
        dayjs(dayjs(), 'DD-MM-YYYY'),
        dayjs(dayjs().subtract(30, 'day'), 'DD-MM-YYYY'),
    ]);
    const [value, setValue] = useState<RangeValue>(null);
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        orderType: null,
        page: 1,
        pageSize: 10,
    });

    useEffect(() => {
        setisLoading(true);
        const fetchData = async () => {
            return await getCustomerOrders(searchParams);
        };
        fetchData()
            .then((res) => {
                setcustomerOrder(res.items);
                setisLoading(false);
            })
            .catch(() => {
                setcustomerOrder(undefined);
                setisLoading(false);
            });
    }, [searchParams]);

    const onChange = (key: string) => {
        if (key !== 'All') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        } else {
            setSearchParams((prev) => ({ ...prev, status: undefined }));
        }
    };

    const onDateChange = (value: RangePickerProps['value'], dateString: [string, string]) => {};

    const onDateOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const disabledDate = (current: dayjs.Dayjs) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 30;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
        return !!tooEarly || !!tooLate;
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    return (
        <>
            <div className="customer__order--filter w-full px-6 pt-4 mb-3">
                <Form>
                    <Row gutter={[100, 20]}>
                        <Col span={24}>
                            <strong>Đặt hàng:</strong>
                            <Radio.Group
                                className="ml-2"
                                defaultValue={searchParams.orderType}
                                onChange={(e) => setSearchParams((prev) => ({ ...prev, orderType: e.target.value }))}
                            >
                                <Radio value={null}>Tất cả</Radio>
                                <Radio value="orderbyme">Đặt bởi tôi</Radio>
                                <Radio value="orderbyanother">Đặt hộ tôi</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={12}>
                            <Input
                                placeholder="Nhập chuỗi tìm kiếm"
                                name="searchString"
                                type="text"
                                onBlur={(e) => setSearchParams((prev) => ({ ...prev, searchString: e.target.value }))}
                            />
                        </Col>
                        <Col span={12}>
                            <RangePicker
                                className="border border-wh-gray py-2 w-full rounded"
                                format="DD-MM-YYYY"
                                onOk={onDateOk}
                                disabledDate={disabledDate}
                                value={dates || value}
                                onCalendarChange={(val) => setDates(val)}
                                onChange={(val, dateString: [string, string]) => {
                                    setValue(val);
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        fromDate: dateString[0],
                                        toDate: dateString[1],
                                    }));
                                }}
                                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                                onOpenChange={onOpenChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
            <Tabs
                defaultActiveKey="All"
                items={items}
                onChange={onChange}
                className="w-full"
                tabBarStyle={{ display: 'flex', justifyContent: 'space-between' }}
            />
            {!isLoading && customerOrder ? (
                <CustomerOrderList customerOrders={customerOrder} customerPhone={user.phone} />
            ) : !isLoading && !customerOrder ? (
                <Empty description="Không tìm thấy đơn hàng nào" />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default CustomerOrdersContainer;
