import * as React from 'react';
import { useState, useEffect } from 'react';

import Placeholder from '../../assets/images/placeholder.png';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';

type Props = {
    orderedService: CenterOrderedServiceModel[];
};

const OrderListItem = ({ orderedService }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const [itemShowed, setItemShowed] = useState(1);

    const slicedList = orderedService.slice(0, itemShowed).map((data) => (
        <div key={`key-${data.name}`} className={`order__item--details flex justify-evenly mb-3  `}>
            <div className="order__details--thumb w-24 h-24">
                <img className="w-full h-full object-cover" src={Placeholder} alt="" />
            </div>
            <div className="order__details--service ml-2">
                <div className="order__details--name">{data.name}</div>
                <div className="order__details--category">Phân loại: {data.category}</div>
            </div>
            <div className="order__details--measurement ml-2">{data.measurement + ' ' + data.unit}</div>
        </div>
    ));

    return (
        <>
            {slicedList}
            {orderedService.length > 1 && (
                <div
                    className="w-full flex justify-center border border-dashed border-wh-gray rounded-xl my-4 text-base py-1 cursor-pointer"
                    onClick={() => {
                        if (isCollapsed) {
                            setItemShowed(orderedService.length);
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
