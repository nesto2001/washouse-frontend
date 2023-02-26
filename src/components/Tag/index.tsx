import clsx from 'clsx';
import React from 'react';
import { ServiceTag } from '../../types/ServiceTag';
import style from './Tag.module.scss';

type Props = {
    item: ServiceTag;
    type: boolean;
};

const Tags = ({ item, type }: Props) => {
    return (
        <>
            <span
                key={item.id}
                className={clsx(type ? style.primary : style.sub, 'px-2.5 py-1 font-bold mr-3', style.servicesTag)}
            >
                {item.title}
            </span>
        </>
    );
};

export default Tags;
