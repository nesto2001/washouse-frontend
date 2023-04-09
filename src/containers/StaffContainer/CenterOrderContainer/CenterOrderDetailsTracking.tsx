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
        switch (trackings[trackings.length - 1].status) {
            case 'Pending':
                setPending('Chờ xác nhận');
                break;
            case 'confirmed':
                setPending('Chờ nhận hàng');
                break;
            case 'Processing':
                setPending('Đang xử lý');
                break;
            case 'Ready':
                setPending('Chờ trả hàng');
                break;
            case 'Completed':
                setPending('');
                break;
        }
    }, [trackings]);

    return (
        <div className="h-auto">
            <Timeline
                pending={pending}
                mode="alternate"
                items={trackings.map((tracking) => {
                    return {
                        label: tracking.createdDate,
                        children: OrderStatusMap[tracking.status],
                    };
                })}
            />
        </div>
    );
};

export default CenterOrderDetailsTracking;
