import * as React from 'react';
import { useState, useEffect } from 'react';
import { BadgeProps, Spin, Tooltip } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import type { Dayjs } from 'dayjs';

import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { Link, useNavigate } from 'react-router-dom';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import './CenterCalendar.scss';

dayjs.locale('vi');

type Props = {};

type CalendarCell = {
    id: string;
    content: string;
    date: string;
    status: string;
};

// const getListData = (value: Dayjs) => {
//     let listData;
//     switch (value.date()) {
//         case 8:
//             listData = [
//                 { type: 'warning', content: 'This is warning event.' },
//                 { type: 'success', content: 'This is usual event.' },
//             ];
//             break;
//         case 10:
//             listData = [
//                 { type: 'warning', content: 'This is warning event.' },
//                 { type: 'success', content: 'This is usual event.' },
//                 { type: 'error', content: 'This is error event.' },
//             ];
//             break;
//         case 15:
//             listData = [
//                 { type: 'warning', content: 'This is warning event' },
//                 { type: 'success', content: 'This is very long usual event。。....' },
//                 { type: 'error', content: 'This is error event 1.' },
//                 { type: 'error', content: 'This is error event 2.' },
//                 { type: 'error', content: 'This is error event 3.' },
//                 { type: 'error', content: 'This is error event 4.' },
//             ];
//             break;
//         default:
//     }
//     return listData || [];
// };

// const getMonthData = (value: Dayjs) => {
//     if (value.month() === 8) {
//         return 1394;
//     }
// };

const CenterCalendarContainer = (props: Props) => {
    const [orderList, setOrderList] = useState<CalendarCell[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            return await getManagerCenterOrders({ pageSize: -1 });
        };
        fetchData()
            .then((res) => {
                setOrderList(
                    res.items.map((r) => {
                        return {
                            id: r.id,
                            content: r.id,
                            date: r.orderedDate,
                            status: r.status,
                        };
                    }),
                );
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    const dateCellRender = (value: Dayjs) => {
        const stringValue = value.format('DD-MM-YYYY');
        if (orderList) {
            const listData = orderList.filter(({ date }) => date.split(' ')[0] === stringValue);
            return (
                <Tooltip title={`${listData.length} đơn hàng`}>
                    <ul className="events">
                        {listData.map((item) => (
                            <li key={item.content} className="mb-1">
                                <Link to={`/provider/orders/${item.id}`}>
                                    <Badge
                                        status={BadgeStatusMap[item.status] as BadgeProps['status']}
                                        text={item.content}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Tooltip>
            );
        }
    };

    const onSelect = (value: Dayjs) => {
        const date = value.format('YYYY/MM/DD');
        navigate(`/provider/calendar/day/${date}`);
    };

    if (isLoading) {
        return <OthersSpin />;
    }
    return <Calendar dateCellRender={dateCellRender} onSelect={onSelect} value={dayjs()} />;
};

export default CenterCalendarContainer;
