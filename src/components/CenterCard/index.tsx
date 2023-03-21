import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Placeholder from '../../assets/images/placeholder.png';
import { CenterModel } from '../../models/Center/CenterModel';
import { formatLink } from '../../utils/FormatUtils';
import { compareTime, formatTime, getToday } from '../../utils/TimeUtils';
import RatingStars from '../RatingStars/RatingStars';
import StatusTag from '../StatusTag';
import Tags from '../Tag';

type CenterCardProps = {
    center: CenterModel;
};

const CenterCard = ({ center }: CenterCardProps) => {
    const [status, setStatus] = useState<boolean>(false);
    const [isBreakDay, setIsBreakDay] = useState<boolean>(false);
    const today = getToday();
    useEffect(() => {
        const opening: string = center.centerOperatingHours[today].start ?? '';
        const closing: string = center.centerOperatingHours[today].end ?? '';
        if (opening && closing) {
            setStatus(compareTime(opening, closing));
        } else {
            setStatus(false);
            setIsBreakDay(true);
        }
    }, [status]);

    return (
        <div className="center__card w-[400px] rounded-2xl border-[0.5px] border-[#B3B3B3] p-3 text-left">
            <div className="center__card--thumbnail rounded w-full max-h-[180px] overflow-hidden">
                <img className="w-full object-cover" src={center.thumbnail ?? Placeholder} alt="" />
            </div>
            <div className="center__card--name text-lg font-bold mt-2">
                <h4>
                    <Link to={`/trung-tâm/${formatLink(center.title)}-c.${center.id}`}>{center.title}</Link>
                </h4>
            </div>
            <div className="center__card--info">
                <div className="center__card--address">
                    <h5>{center.address}</h5>
                </div>
                <div className="center__card--details flex justify-between">
                    <div className="center__card--opeHour flex items-center">
                        {center.centerOperatingHours[today].start && center.centerOperatingHours[today].end && (
                            <>
                                <FaRegClock className="mr-2 self-center" />
                                <span className="leading-7">{`${center.centerOperatingHours[today].start} - ${center.centerOperatingHours[today].end}`}</span>
                            </>
                        )}
                        <StatusTag opening={status} isBreakDay={isBreakDay} />
                    </div>
                    <div className="center__card--phone flex items-center">
                        <FaPhoneAlt className="mr-2" />
                        <span className="leading-7">{center.phone}</span>
                    </div>
                </div>
            </div>
            <div className="center__card--services mt-3">
                {center.service.slice(0, 3).map((ser) => (
                    <Tags key={ser.id} item={ser} type={true} />
                ))}
            </div>
            <div className="center__card--additions mt-4">
                {center.additions.map((add) => (
                    <Tags key={add.id} item={add} type={false} />
                ))}
            </div>
            <hr className="my-3" />
            <div className="center__card--more flex justify-between">
                <div className="center__card--rating flex">
                    <RatingStars rating={center.rating} />{' '}
                    <span className="ml-2 font-bold text-base">{center.numOfRating}</span>
                </div>
                <div className="center__card--distance">{center.distance} km</div>
            </div>
        </div>
    );
};

export default CenterCard;
