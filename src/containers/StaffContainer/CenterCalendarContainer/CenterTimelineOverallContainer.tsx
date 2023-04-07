import * as React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, Col, Radio, Row, Select, theme } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import localeData from 'dayjs/plugin/localeData';
import CenterTimelineContainer from '../../../containers/StaffContainer/CenterCalendarContainer/CenterTimelineContainer';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import { useParams } from 'react-router-dom';

dayjs.locale('vi');
dayjs.extend(localeData);

type Props = {};

const CenterTimelineOverallContainer = (props: Props) => {
    const { year, month, day } = useParams<{ year: string; month: string; day: string }>();
    const { token } = theme.useToken();
    const [orderList, setOrderList] = useState<CenterOrderModel[]>([]);
    const [fetchingDate, setFetchingDate] = useState(`${day}-${month}-${year}`);

    useEffect(() => {
        const fetchData = async () => {
            return await getManagerCenterOrders({ fromDate: fetchingDate, pageSize: 50 });
        };
        fetchData()
            .then((res) => {
                setOrderList(res);
            })
            .catch(() => {
                setOrderList([]);
            });
    }, [fetchingDate]);

    const headerRender = ({
        value,
        type,
        onChange,
        onTypeChange,
    }: {
        value: Dayjs;
        type: string;
        onChange: (value: Dayjs) => void;
        onTypeChange: (type: CalendarMode) => void;
    }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        let current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
        }

        for (let i = start; i < end; i++) {
            monthOptions.push(
                <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                </Select.Option>,
            );
        }

        const year = value.year();
        const month = value.month();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
                <Select.Option key={i} value={i} className="year-item">
                    {i}
                </Select.Option>,
            );
        }
        return (
            <div style={{ padding: 8, paddingTop: 0 }}>
                <div className="mb-2 text-sub font-semibold text-2xl">Chọn ngày</div>
                <Row gutter={8}>
                    <Col>
                        <Radio.Group size="small" onChange={(e) => onTypeChange(e.target.value)} value={type}>
                            <Radio.Button value="month">Tháng</Radio.Button>
                            <Radio.Button value="year">Năm</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col>
                        <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            className="my-year-select"
                            value={year}
                            onChange={(newYear) => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                            }}
                        >
                            {options}
                        </Select>
                    </Col>
                    <Col>
                        <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            value={month}
                            onChange={(newMonth) => {
                                const now = value.clone().month(newMonth);
                                onChange(now);
                            }}
                        >
                            {monthOptions}
                        </Select>
                    </Col>
                </Row>
            </div>
        );
    };

    const wrapperStyle: React.CSSProperties = {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const onSelect = (newValue: Dayjs) => {
        setFetchingDate(newValue.format('DD-MM-YYYY'));
    };

    return (
        <>
            <div className="basis-1/3 relative">
                <div
                    className="bg-white mx-auto rounded border border-wh-lightgray sticky max-w-[390px]"
                    style={{ position: '-webkit-sticky', top: 12 }}
                >
                    <div style={wrapperStyle} className="">
                        <Calendar
                            headerRender={headerRender}
                            fullscreen={false}
                            onSelect={onSelect}
                            defaultValue={dayjs(fetchingDate, 'DD-MM-YYYY')}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white basis-full mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Đặt lịch</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý đơn hàng dễ dàng hơn chế độ xem lịch
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__calender--wrapper flex">
                        {orderList && <CenterTimelineContainer orderList={orderList} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CenterTimelineOverallContainer;
