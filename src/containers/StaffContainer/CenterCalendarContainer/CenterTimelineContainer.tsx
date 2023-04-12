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
import { Link, useNavigate } from 'react-router-dom';
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

type TimelineItemProps = {
    label: string;
    children?: TimelineOrderItem[];
};

const CenterTimelineContainer = ({ orderList }: Props) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        div.ant-timeline-item-label {
            width: calc(8% - 12px) !important;
        }
        
        div.ant-timeline-item-content {
            left: calc(7% - 4px) !important;
            width: calc(79% - 4px) !important;
            padding-top: 20px;
        }
        
        div.ant-timeline-item-tail,
        div.ant-timeline-item-head {
            left: 7% !important;
        }
        
        .ant-timeline .ant-timeline-item-head-custom {
            padding: 0;
        }
        
        li.ant-timeline-item {
            min-height: 48px;
            width: 100%;
            padding-bottom: 0px !important;
        }
        
        div.ant-timeline-item-content {
            display: flex;
            flex-direction: column;
        }
        
        .plus-sign {
            width: 30px;
            height: 30px;
            position: relative;
        }

        .plus-sign::before, .plus-sign::after{
            content: '';
                position: absolute;
                background-color: rgba(5, 5, 5, 0.06);
        }

        .plus-sign::before{
            width: 2px;
            height: 30px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .plus-sign::after{
            width: 1040px;
            height: 2px;
            top: 50%;
            left: 100%;
            transform: translate(-3%, -50%);
        }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const timelineItems = [];
    for (let i = 0; i < 24; i++) {
        const start = dayjs('02-04-2023', 'DD-MM-YYYY').hour(i).minute(0).second(0);
        const ordersInInterval = orderList.filter((order) => {
            return (
                dayjs(order.orderedDate, 'DD-MM-YYYY HH:mm:ss').hour() >= i &&
                dayjs(order.orderedDate, 'DD-MM-YYYY HH:mm:ss').hour() < i + 1
            );
        });
        console.log(ordersInInterval);
        const tagItems = ordersInInterval.map((order) => (
            <Link to={`/provider/orders/${order.id}`}>
                <Tag key={order.id} color={BadgeStatusMap[order.status]} className="h-[40px] flex items-center mb-2">
                    OrderID: {order.id}
                </Tag>
            </Link>
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
