import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import style from './StatusTag.module.scss';
type Props = {
    opening: boolean;
};

const StatusTag = ({ opening }: Props) => {
    const [tagContent, setTagContent] = useState('');
    const [className, setClassName] = useState('');
    useEffect(() => {
        if (opening) {
            setTagContent('Mở cửa');
        } else {
            setTagContent('Đóng cửa');
        }
    }, []);

    return (
        <>
            <div className={clsx(opening ? style.open : style.closed, 'flex items-center ml-3 font-bold')}>
                <FaCircle size="10px" className="mr-1" /> {tagContent}
            </div>
        </>
    );
};

export default StatusTag;
