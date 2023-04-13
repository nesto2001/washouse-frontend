import React, { useState, useEffect } from 'react';
import { CenterOrderTrackingModel } from '../../../models/Staff/CenterOrderTrackingModel';
import { Timeline } from 'antd';
import { OrderStatusMap } from '../../../mapping/OrderStatusMap';

type Props = {
    trackings: CenterOrderTrackingModel[];
};

const CenterOrderDetailsTracking = ({ trackings }: Props) => {
    const [pending, setPending] = useState<string>('');

    useEffect(() => {
        switch (trackings[trackings.length - 1].status.toLowerCase()) {
            case 'pending':
                setPending('Chờ xác nhận');
                break;
            case 'confirmed':
                setPending('Chờ nhận hàng');
                break;
            case 'processing':
                setPending('Đang xử lý');
                break;
            case 'ready':
                setPending('Chờ trả hàng');
                break;
            case 'completed':
                setPending('');
                break;
        }
    }, [trackings]);

    return (
        <div className="h-auto">
            <Timeline
                pending={pending}
                mode="left"
                items={trackings.map((tracking) => {
                    return {
                        label: tracking.createdDate,
                        children: <strong>{OrderStatusMap[tracking.status]}</strong>,
                    };
                })}
            />
        </div>
    );
};

export default CenterOrderDetailsTracking;
