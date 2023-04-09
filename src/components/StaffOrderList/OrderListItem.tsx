import * as React from 'react';
import { useState, useEffect } from 'react';

import Placeholder from '../../assets/images/placeholder.png';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
    orderedService: CenterOrderedServiceModel[];
};

const OrderListItem = ({ orderedService }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const [itemShowed, setItemShowed] = useState(1);

    const slicedList = orderedService.slice(0, itemShowed).map((data) => (
        <div
            key={`key-${data.name}`}
            className={`order__item--details flex items-start mb-3 ${isCollapsed ? '' : 'mb-3'}`}
        >
            <div className="order__details--thumb w-28 h-24">
                <img className="w-full h-full object-cover" src={data.image ?? Placeholder} alt="" />
            </div>
            <div className="order__details--service ml-4 w-[200px] mr-4">
                <div className="order__details--name font-bold text-base">{data.name}</div>
                <div className="order__details--category">Phân loại: {data.category}</div>
            </div>
            <div className="order__details--measurement text-base w-[40px]">
                {data.measurement + ' ' + data.unit ?? 'Bộ'}
            </div>
        </div>
    ));

    return (
        <>
            {slicedList}
            {orderedService.length > 1 && (
                <div
                    className={`w-full flex justify-center text-base py-1 cursor-pointer text-sub-gray mb-1 ${
                        isCollapsed ? '' : '-mt-3'
                    }`}
                    onClick={() => {
                        if (isCollapsed) {
                            setItemShowed(orderedService.length);
                            setIsCollapsed(false);
                        } else {
                            setItemShowed(1);
                            setIsCollapsed(true);
                        }
                    }}
                >
                    <div className="font-bold flex items-center gap-2">
                        {isCollapsed ? 'Xem thêm' : 'Thu gọn'}
                        {isCollapsed ? <FaAngleDown /> : <FaAngleUp />}
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderListItem;
