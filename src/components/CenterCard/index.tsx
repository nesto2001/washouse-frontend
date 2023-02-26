import React, { useState, useEffect } from 'react';
import { FaClock, FaPhone, FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import Placeholder from '../../assets/images/placeholder.png';
import { CenterCardData } from '../../types/CenterCardData';
import { Weekday } from '../../types/Weekday';
import formatTime from '../../utils/formatTime';
import getToday from '../../utils/getToday';
import RatingStars from '../RatingStars/RatingStars';
import StatusTag from '../StatusTag';
import Tags from '../Tag';

type Props = {};

const CenterCard = (center: CenterCardData) => {
    const [opening, setOpening] = useState<boolean>(false);
    const today = getToday();
    useEffect(() => {
        const now = new Date();
        if (now >= center.operatingHours[today].start && now <= center.operatingHours[today].end) {
            setOpening(true);
        }
    }, []);
    return (
        <div className="center__card w-[400px] rounded-2xl border-[0.5px] border-[#B3B3B3] p-3 text-left">
            <div className="center__card--thumbnail rounded w-full max-h-[180px] overflow-hidden">
                <img className="object-fill" src={Placeholder} alt="" />
            </div>
            <div className="center__card--name text-lg font-bold mt-2">
                <h4>{center.title}</h4>
            </div>
            <div className="center__card--info">
                <div className="center__card--address">
                    <h5>{center.address}</h5>
                </div>
                <div className="center__card--details flex justify-between">
                    <div className="center__card--opeHour flex items-center">
                        <FaRegClock className="mr-2 self-center" />
                        <span className="leading-7">{`${formatTime(center.operatingHours[today].start)} - ${formatTime(
                            center.operatingHours[today].end,
                        )}`}</span>{' '}
                        <StatusTag opening={opening} />
                    </div>
                    <div className="center__card--phone flex items-center">
                        <FaPhoneAlt className="mr-2" />
                        <span className="leading-7">{center.phone}</span>
                    </div>
                </div>
            </div>
            <div className="center__card--services mt-3">
                {center.service.slice(0, 3).map((ser) => (
                    <Tags item={ser} type={true} />
                ))}
            </div>
            <div className="center__card--additions mt-4">
                {center.additions.map((add) => (
                    <Tags item={add} type={false} />
                ))}
            </div>
            <hr className="my-3" />
            <div className="center__card--more flex justify-between">
                <div className="center__card--rating flex">
                    <RatingStars rating={center.rating} />{' '}
                    <span className="ml-2 font-bold text-base">{center.numOfRating}</span>
                </div>
                <div className="center__card--distance">0.5km</div>
            </div>
        </div>
    );
};

export default CenterCard;
