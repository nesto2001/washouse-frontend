import { Tag, Timeline } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { BadgeProps, Col, Radio, Row, Select, Tooltip, Typography, theme } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import localeData from 'dayjs/plugin/localeData';
import type { Dayjs } from 'dayjs';

import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { getManagerCenterOrders } from '../../../repositories/StaffRepository';
import { BadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { useNavigate } from 'react-router-dom';
import { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { CenterOrderModel } from '../../../models/Staff/CenterOrderModel';
import './CenterTimeline.scss';

dayjs.locale('vi');
dayjs.extend(localeData);

type Props = {
    orderList: CenterOrderModel[];
};

type Order = {
    id: string;
    name: string;
    orderedDate: string;
};

type TimelineOrderItem = {
    orderId: string;
    orderName: string;
};

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

type TimelineItemProps = {
    label: string;
    children?: TimelineOrderItem[];
};

const CenterTimelineContainer = ({ orderList }: Props) => {
    const [orders, setOrders] = useState<Order[]>(
        orderList.map((order): Order => {
            return { id: order.id, name: order.id, orderedDate: order.orderedDate };
        }),
    );

    const timelineItems = [];
    for (let i = 0; i < 24; i++) {
        const start = dayjs('02-04-2023', 'DD-MM-YYYY').hour(i).minute(0).second(0);
        const end = start.hour(i + 1);
        const ordersInInterval = orderList.filter(
            (order) =>
                dayjs(order.orderedDate, 'DD-MM-YYYY HH:mm:ss').isAfter(start) &&
                dayjs(order.orderedDate, 'DD-MM-YYYY HH:mm:ss').isBefore(end),
        );
        const tagItems = ordersInInterval.map((order) => (
            <Tag key={order.id} color={BadgeStatusMap[order.status]} className="h-[40px] flex items-center mb-2">
                OrderID: {order.id}
            </Tag>
        ));
        timelineItems.push({
            label: <div className="w-[50px]">{start.format('HH:mm')}</div>,
            dot: <div className="plus-sign"></div>,
            children: <div>{tagItems}</div>,
        });
    }

    return <Timeline className="w-full" items={timelineItems} mode="left" />;
};

export default CenterTimelineContainer;
