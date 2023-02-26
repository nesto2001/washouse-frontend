import React, { useState, useEffect } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import { CenterCardData } from '../../types/CenterCardData';
import getToday from '../../utils/getToday';

type Props = {};


const CenterCard = (center: CenterCardData) => {
    const [operatingDay, setOperatingDay] = useState('');
    const today: Weekday = getToday();
    const ope = center.operatingHours[`${today}`];

    return (
        <div className="center__card rounded-2xl border-[0.5px] border-[#B3B3B3] p-3">
            <div className="center__card--thumbnail rounded">
                <img src={Placeholder} alt="" />
            </div>
            <div className="center__card--name text-base font-bold">
                <h4>{center.title}</h4>
            </div>
            <div className="center__card--info">
                <div className="center__card--address">
                    <h5>{center.address}</h5>
                </div>
                <div className="center__card--details">
                    <div className="center__card--opeHour">{center.operatingHours[today]?.start.toString()}</div>
                </div>
            </div>
        </div>
    );
};

export default CenterCard;
