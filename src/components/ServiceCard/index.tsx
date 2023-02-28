import clsx from 'clsx';
import React, { useState } from 'react';
import { CardData } from '../../types/CardData';
import Button from '../Button';
import './ServiceCard.scss';

const ServiceCard = ({
    thumbnail,
    title,
    description,
    action,
    actionContent,
    actionType,
    minHeight,
    cardHeight,
    actionLink,
}: CardData) => {
    const style = {
        minHeight: minHeight || '135px',
    };
    const cardStyle = {
        maxHeight: cardHeight || '380px',
        height: cardHeight || '380px',
    };
    return (
        <div
            className="servicecard flex flex-col max-w-[265px] max-h-[380px] h-[380px] p-5 rounded-2xl mx-2"
            style={cardStyle}
        >
            <img className="rounded-2xl" src={thumbnail} alt={title} />
            <h3 className="font-bold text-xl w-full pt-2">{title}</h3>
            <p className={clsx('flex-grow text-justify w-full mt-4')} style={style}>
                {description}
            </p>
            {action && <Button type={actionType} link={actionLink}>{actionContent}</Button>}
        </div>
    );
};

export default ServiceCard;
