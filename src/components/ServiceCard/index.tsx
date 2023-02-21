import React from 'react';
import { CardData } from '../../types/CardData';
import './ServiceCard.scss';

const ServiceCard = ({ thumbnail, title, description }: CardData) => {
    return (
        <div className="servicecard flex flex-col max-w-[265px] max-h-[380px] h-[380px] p-5 rounded-2xl mx-2">
            <img className="rounded-2xl" src={thumbnail} alt={title} />
            <h3 className="font-bold text-xl w-full pt-2">{title}</h3>
            <p className="flex-grow max-h-[135px] text-left w-full mt-4">{description}</p>
        </div>
    );
};

export default ServiceCard;
