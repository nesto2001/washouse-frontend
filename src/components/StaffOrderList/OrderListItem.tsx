import * as React from 'react';
import { useState, useEffect } from 'react';

import Placeholder from '../../assets/images/placeholder.png';

type Props = {
    orderId: string;
};

const OrderListItem = ({ orderId }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const [itemShowed, setItemShowed] = useState(1);
    const orderDetails = [
        {
            id: 1,
            serviceName: 'Giặt sấy quần áo màu',
            serviceCategory: 'Giặt sấy',
            unit: 'Bộ',
            quantity: 3,
            weight: 3 * 0.3,
        },
        {
            id: 2,
            serviceName: 'Giặt sấy hấp ủi',
            serviceCategory: 'Giặt sấy',
            unit: 'kg',
            quantity: 0,
            weight: 4.5,
        },
        {
            id: 3,
            serviceName: 'Giặt hấp áo vest',
            serviceCategory: 'Giặt hấp',
            unit: 'áo',
            quantity: 2,
            weight: 2 * 0.3,
        },
    ];

    const slicedList = orderDetails.slice(0, itemShowed).map((data) => (
        <div key={data.id} className={`order__item--details flex justify-evenly mb-3  `}>
            <div className="order__details--thumb w-24 h-24">
                <img className="w-full h-full object-cover" src={Placeholder} alt="" />
            </div>
            <div className="order__details--service ml-2">
                <div className="order__details--name">{data.serviceName}</div>
                <div className="order__details--category">Phân loại: {data.serviceCategory}</div>
            </div>
            <div className="order__details--measurement ml-2">
                {data.unit.toLowerCase() !== 'kg' ? data.quantity + ' ' + data.unit : data.weight + ' ' + data.unit}
            </div>
        </div>
    ));

    return (
        <>
            {slicedList}
            {orderDetails.length > 1 && (
                <div
                    className="w-full flex justify-center border border-dashed border-wh-gray rounded-xl my-4 text-base py-1 cursor-pointer"
                    onClick={() => {
                        if (isCollapsed) {
                            setItemShowed(orderDetails.length);
                            setIsCollapsed(false);
                        } else {
                            setItemShowed(1);
                            setIsCollapsed(true);
                        }

                        console.log(isCollapsed);
                    }}
                >
                    {isCollapsed ? 'Xem thêm' : 'Thu gọn'}
                </div>
            )}
        </>
    );
};

export default OrderListItem;
