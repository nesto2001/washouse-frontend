import React from 'react';
import { useState, useEffect } from 'react';

import { CenterOrderDeliveryModel } from '../../../models/Staff/CenterOrderDeliveryModel';
import { DeliveryStatusMap } from '../../../mapping/DeliveryStatusMap';
import { Tag } from 'antd';
import { getLocation } from '../../../repositories/LocationRepository';

type Props = {
    deliveries: CenterOrderDeliveryModel[];
    deliveryType: number;
};

type DeliveryInfo = {
    type: boolean;
    locationId: number;
    address?: string;
    ward?: {
        id: number;
        name: string;
        district: {
            id: number;
            name: string;
        };
    };
};

const CenterOrderDetailsDelivery = ({ deliveries, deliveryType }: Props) => {
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo[]>([]);

    useEffect(() => {
        console.log(deliveries);
        if (deliveries && deliveryInfo.length === 0) {
            const promises = deliveries.map((deli, index) => {
                return getLocation(deli.locationId);
            });
            Promise.all(promises).then((res) =>
                setDeliveryInfo(
                    res.map((deliInfo, index) => {
                        return {
                            type: deliveries[index].type,
                            locationId: deliveries[index].locationId,
                            address: deliInfo.address,
                            ward: deliInfo.ward,
                        };
                    }),
                ),
            );
        }
    }, []);

    console.log(deliveryInfo);

    return (
        <>
            {deliveries.map((delivery, index) => {
                return (
                    (!delivery.type && (
                        <>
                            <div className="text-base">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h2 className="font-semibold text-xl">{'Lấy đơn hàng'}</h2>
                                    <h4 className="font-medium text-sm">
                                        <Tag>{DeliveryStatusMap[delivery.status]}</Tag>
                                    </h4>
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 mt-2 text-sm">
                                    <h2 className="col-span-1 text-sub-gray font-medium">Nhân viên:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.shipperName ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">SĐT Nhân viên:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.shipperPhone ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Ngày vận chuyển:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.date ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Địa điểm:</h2>
                                    <h2 className="col-span-1 text-right">
                                        {deliveryInfo[index]
                                            ? `${deliveryInfo[index].address}, ${deliveryInfo[index].ward?.name}, ${deliveryInfo[index].ward?.district.name}, TP. Hồ Chí Minh`
                                            : ''}
                                    </h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Ước tính</h2>
                                    <h2 className="col-span-1 text-right">
                                        {delivery.estimated ? `${delivery.estimated} phút` : '-'}
                                    </h2>
                                </div>
                            </div>
                            {index === 0 && deliveryType === 3 && <hr className="my-3 border-wh-gray" />}
                        </>
                    )) ||
                    (delivery.type && (
                        <>
                            <div className="text-base">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h2 className="font-semibold text-xl">Trả đơn hàng</h2>
                                    <h4 className="font-medium text-sm">
                                        <Tag>{DeliveryStatusMap[delivery.status]}</Tag>
                                    </h4>
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 mt-2 text-sm">
                                    <h2 className="col-span-1 text-sub-gray font-medium">Nhân viên:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.shipperName ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">SĐT Nhân viên:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.shipperPhone ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Ngày vận chuyển:</h2>
                                    <h2 className="col-span-1 text-right">{delivery.date ?? '-'}</h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Địa điểm:</h2>
                                    <h2 className="col-span-1 text-right">
                                        {deliveryInfo[index]
                                            ? `${deliveryInfo[index].address}, ${deliveryInfo[index].ward?.name}, ${deliveryInfo[index].ward?.district.name}, TP. Hồ Chí Minh`
                                            : ''}
                                    </h2>
                                    <h2 className="col-span-1 text-sub-gray font-medium">Thời gian ước tính:</h2>
                                    <h2 className="col-span-1 text-right">
                                        {delivery.estimated ? `${delivery.estimated} phút` : '-'}
                                    </h2>
                                </div>
                            </div>
                            {index === 0 && deliveryType === 3 && <hr className="my-3 border-wh-gray" />}
                        </>
                    ))
                );
            })}
        </>
    );
};

export default CenterOrderDetailsDelivery;
