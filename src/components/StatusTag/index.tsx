import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import style from './StatusTag.module.scss';
type Props = {
    opening: boolean;
    isBreakDay?: boolean;
};

const StatusTag = ({ opening, isBreakDay }: Props) => {
    const [tagContent, setTagContent] = useState('');
    useEffect(() => {
        if (opening) {
            setTagContent('Mở cửa');
        } else {
            setTagContent('Đóng cửa');
        }
    }, [tagContent]);

    return (
        <>
            <div
                className={clsx(
                    opening ? style.open : style.closed,
                    'flex items-center font-bold',
                    isBreakDay ? '' : 'ml-3',
                )}
            >
                <FaCircle size="10px" className="mr-1" /> {tagContent}
            </div>
        </>
    );
};

export default StatusTag;
