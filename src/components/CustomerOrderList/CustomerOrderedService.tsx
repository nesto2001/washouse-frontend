import { useMemo, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CenterOrderedServiceModel } from '../../models/Staff/CenterOrderedServiceModel';
import { formatCurrency } from '../../utils/FormatUtils';
import './CustomerOrder.scss';

type Props = {
    orderedServices: CenterOrderedServiceModel[];
};

const CustomerOrderedService = ({ orderedServices }: Props) => {
    const [viewItem, setViewItem] = useState(1);
    const [timeOut, setTimeOut] = useState(0);
    const [slicedList, setSlicedList] = useState<CenterOrderedServiceModel[]>(orderedServices.slice(0, viewItem));

    useMemo(() => {
        const timeout = setTimeout(() => {
            setSlicedList(orderedServices.slice(0, viewItem));
        }, timeOut);
        return () => clearTimeout(timeout);
    }, [viewItem]);

    return (
        <div className={`customer__ordered--services w-full h-full ${viewItem === 1 ? 'collapsed' : ''}`}>
            {slicedList.map((ord, index) => (
                <div
                    key={`details-${index}-${ord.id}`}
                    className={`ordered__service--item flex justify-between py-2 border-t border-wh-gray first-of-type:border-none first:border-none `}
                >
                    <div className="ordered__service--thumb h-[100px] w-[120px] rounded-xl overflow-hidden">
                        <img className="w-full h-full object-cover" src={ord.image} alt="" />
                    </div>
                    <div className="ordered__service--content flex flex-grow flex-col ml-3 justify-between py-2">
                        <div className="ordered__service--info">
                            <div className="ordered__service--name text-base font-bold">{ord.name}</div>
                            <div className="ordered__service--category text-sm font-medium text-sub-gray">
                                Phân loại: {ord.category}
                            </div>
                        </div>
                        <div className="ordered__service--note flex-grow mt-2">
                            Ghi chú: {ord.customerNote ?? 'không có'}
                        </div>
                    </div>
                    <div className="ordered__service--measurement w-[200px] self-center">
                        {ord.measurement} {ord.unit}
                    </div>
                    <div className="ordered__service--price w-[200px] text-right self-center font-bold text-xl">
                        {formatCurrency(ord.price ?? 0)}
                    </div>
                </div>
            ))}
            {orderedServices.length > 1 && (
                <div className="">
                    {viewItem === 1 ? (
                        <div
                            className="flex justify-center items-center cursor-pointer font-medium text-sub-gray -mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setViewItem(orderedServices.length);
                                setTimeOut(0);
                            }}
                        >
                            Xem thêm {orderedServices.length - 1} dịch vụ khác đã đặt <FaAngleDown />
                        </div>
                    ) : (
                        <div
                            className="flex justify-center items-center cursor-pointer font-medium text-sub-gray -mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setViewItem(1);
                                setTimeOut(190);
                            }}
                        >
                            Thu gọn <FaAngleUp />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerOrderedService;
