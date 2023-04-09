import React from 'react';
import Placeholder from '../../../assets/images/placeholder.png';
import { formatCurrency } from '../../../utils/FormatUtils';
import { Tag } from 'antd';
import { CenterOrderedServiceModel } from '../../../models/Staff/CenterOrderedServiceModel';

type OrderDetailsInfo = {
    orderedDetails: CenterOrderedServiceModel[];
};

type Props = {
    details: OrderDetailsInfo;
};

const CenterOrderedDetailsContainer = ({ details }: Props) => {
    return (
        <>
            {details.orderedDetails.map((det, index) => (
                <div key={`item-${index}`} className="ordered__item flex jus items-center mb-6">
                    <div className="ordered__item--thumb w-[120px] h-[100px] rounded-lg overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={det.image}
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = Placeholder;
                            }}
                        />
                    </div>
                    <div className="ordered__item--details ml-4 w-[300px]">
                        <div className="font-bold text-lg">{det.name}</div>
                        <div className="font-medium text-sub-gray text-sm">Phân loại: {det.category}</div>
                    </div>
                    <div className="ordered__item--weight w-[100px] text-base font-bold">
                        {det.measurement} <span className="text-sub-gray">{det.unit}</span>
                    </div>
                    <div className="ordered__item--unitprice font-bold text-lg w-[200px]">
                        {formatCurrency(det.price ?? 0)}
                    </div>
                    <div className="ordered__item--price font-bold text-xl w-[100px] text-right">
                        {formatCurrency((det.price && det.price * det.measurement) ?? 0)}
                    </div>
                    <div className="ordered__item--price font-bold text-xl w-[284px] text-right">
                        <Tag className="flex w-1/2 justify-center items-center mx-auto h-8" color="default">
                            Đang chờ
                        </Tag>
                    </div>
                </div>
            ))}
            {/* <hr />
            <div className="order__summary flex mt-4 text-2xl font-bold">
                <div className="flex-grow text-right">Tổng đơn hàng</div>
                <div className="w-[284px] text-right">{formatCurrency(orderTotal)}</div>
            </div> */}
        </>
    );
};

export default CenterOrderedDetailsContainer;
