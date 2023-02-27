import React, { useEffect, useState } from 'react';
import { FaClock, FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import StatusTag from '../../components/StatusTag';
import { CenterCardData } from '../../types/CenterCardData';
import Placeholder from '../../assets/images/placeholder.png';
import compareTime from '../../utils/compareTime';
import formatTime from '../../utils/formatTime';
import getToday from '../../utils/getToday';

type Props = {};

const CenterContainer = (props: Props) => {
    const [status, setStatus] = useState<boolean>(false);
    const today = getToday();
    useEffect(() => {
        setStatus(compareTime(center.operatingHours[today].start, center.operatingHours[today].end));
    }, [status]);

    const center: CenterCardData = {
        id: 1,
        thumbnail: Placeholder,
        title: 'Laundry Center',
        description: 'This is a great place to do your laundry.',
        service: [
            { id: 1, title: 'Wash & Fold' },
            { id: 2, title: 'Dry Cleaning' },
        ],
        additions: [
            { id: 3, title: 'Ironing' },
            { id: 4, title: 'Alterations' },
        ],
        rating: 4.5,
        numOfRating: 100,
        phone: '0975926021',
        address: '518 Lê Văn Sỹ, Phường 14, Quận 3, TP. HCM',
        operatingHours: [
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
        ],
    };
    return (
        <div className="center__wrapper flex mt-9">
            <div className="center__details text-left basis-4/6">
                <div className="center__details--main flex m">
                    <div className="center__details--thumbnail max-h-[320px] basis-1/2">
                        <img
                            className="h-full w-full object-cover object-center inline-block"
                            src={center.thumbnail}
                            alt=""
                        />
                    </div>
                    <div className="center__details--content basis-1/2 pt-4 pl-10">
                        <h1 className="text-4xl font-bold">{center.title}</h1>
                        <h3 className="mt-1 text-xl">{center.address}</h3>
                        <h3 className="mt-2 text-xl flex items-center">
                            <FaRegClock className="inline-block mr-2" />
                            {`${formatTime(center.operatingHours[today].start)} - ${formatTime(
                                center.operatingHours[today].end,
                            )}`}
                            <StatusTag opening={status} />
                        </h3>
                        <h3 className="mt-2 text-xl">
                            <FaPhoneAlt className="inline-block mr-2" />
                            {center.phone}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="center__sideinfo basis-2/6"></div>
        </div>
    );
};

export default CenterContainer;
