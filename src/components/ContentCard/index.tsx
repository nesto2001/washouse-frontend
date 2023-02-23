import React from 'react';
import { CardData } from '../../types/CardData';

const ContentCard = ({ thumbnail, title, description }: CardData) => {
    return (
        <div className="contentcard flex flex-col max-w-[180px] max-h-[384px] h-[384px]">
            <div className="contentcard__inner">
                <div className="contentcard__inner-image w-[180] h-[167px] flex justify-center items-center">
                    <img className="max-h-[117px] max-w-[125px]" src={thumbnail} alt={title} />
                </div>
                <h3 className="font-bold text-base w-full pt-2">{title}</h3>
                <p className="flex-grow max-h-[135px] text-justify w-full mt-4 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default ContentCard;
