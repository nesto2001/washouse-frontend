import React from 'react';
import { CardData } from '../../types/CardData';

const HorizontalContentCard = ({ thumbnail, title, description }: CardData) => {
    return (
        <div className="contentcard w-full">
            <div className="contentcard__inner flex gap-9 w-full">
                <div className="contentcard__inner--image basis-1/2">
                    <img className="max-w-[462px] max-h-[284px] w-full object-cover" src={thumbnail} alt={title} />
                </div>
                <div className="contentcard-inner--details flex flex-col basis-1/2 justify-center">
                    <h3 className="font-bold text-2xl w-full pt-2 text-left">{title}</h3>
                    <p className="max-h-[410px] h-auto text-justify w-full mt-4 text-xl">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalContentCard;
