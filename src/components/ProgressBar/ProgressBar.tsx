import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TrackingState } from '../../types/Tracking/TrackingState';
import { formatDateTime } from '../../utils/TimeUtils';

import style from './ProgressBar.module.scss';
import { OrderStatusMap } from '../../mapping/OrderStatusMap';

type Props = {
    orderState: TrackingState[];
};

const ProgressBar = ({ orderState }: Props) => {
    const states: TrackingState[] = [
        {
            id: 1,
            order: 1,
        },
        {
            id: 2,
            order: 2,
        },
        {
            id: 3,
            order: 3,
        },
        {
            id: 4,
            order: 4,
        },
        {
            id: 5,
            order: 5,
        },
        {
            id: 6,
            order: 6,
        },
    ];
    // const orderStates: TrackingState[] = [
    //     {
    //         id: 1,
    //         order: 1,
    //         completed: true,
    //         time: new Date(),
    //         title: 'Xác nhận',
    //     },
    //     {
    //         id: 2,
    //         order: 2,
    //         completed: true,
    //         time: new Date(),
    //         title: 'Nhận hàng',
    //     },
    //     {
    //         id: 3,
    //         order: 3,
    //         completed: false,
    //         time: new Date(),
    //         title: 'Đang xử lý',
    //     },
    // ];

    const mergedStates = states.map((state) => {
        const matchingOrderState = orderState.find((order) => order.order === state.order);

        if (matchingOrderState) {
            return { ...state, ...matchingOrderState };
        }
        return state;
    });
    console.log(mergedStates);

    const currentState = orderState.slice(-1)[0];
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (currentState) setProgress(((currentState.order - 1) / (states.length - 1)) * 100);
    }, [currentState]);

    return (
        <>
            <div className={clsx(style.progressbar, 'w-full')}>
                <div className={clsx(style.progressbar_fill)} style={{ width: `${progress}%` }}></div>
                {states.map((state, index) => (
                    <div
                        key={`state-${index}`}
                        className={clsx(
                            style.progressbar_milestone,
                            currentState?.order === state.order && style.active,
                            index === 0 && style.first,
                            orderState.find((e) => e.order === state.order)?.completed ? style.completed : '',
                        )}
                    ></div>
                ))}
            </div>
            <div className={clsx(style.progressbar_tracking, 'mt-10 flex justify-between w-full')}>
                {mergedStates.map((state, index) => (
                    <div
                        key={`mergestate-${index}`}
                        className={clsx(style.tracking_details, 'min-w-[96px] max-w-[96px]')}
                    >
                        <h4 className={clsx('text-sm font-bold', state.completed ? 'text-sub' : 'text-primary')}>
                            {state.title && OrderStatusMap[state.title]}
                        </h4>
                        <h4 className="text-sm text-sub-gray">{state.time}</h4>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProgressBar;
