import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import Placeholder from '../../assets/images/placeholder.png';
import Carousel from '../../components/Carousel';
import RatingStars from '../../components/RatingStars/RatingStars';
import ServiceCard from '../../components/ServiceCard';
import StatusTag from '../../components/StatusTag';
import { CenterData } from '../../types/CenterData';
import compareTime from '../../utils/compareTime';
import formatTime from '../../utils/formatTime';
import getRating from '../../utils/getRating';
import getToday from '../../utils/getToday';
import './CenterContainer.scss';

type Props = {};

const CenterContainer = (props: Props) => {
    const [status, setStatus] = useState<boolean>(false);
    const today = getToday();
    useEffect(() => {
        setStatus(compareTime(center.operatingHours[today].start, center.operatingHours[today].end));
    }, [status]);

    const center: CenterData = {
        id: 1,
        thumbnail: Placeholder,
        title: 'The Clean House',
        description: 'This is a great place to do your laundry.',
        service: [
            {
                id: 1,
                thumbnail: Placeholder,
                title: 'Giặt sấy',
                description: 'Dịch vu giặt cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
            },
            {
                id: 2,
                thumbnail: Placeholder,
                title: 'Giặt hấp',
                description:
                    'Phương pháp làm sạch sử dụng dung môi thay vì nước để loại bỏ bụi bẩn và vết bẩn khỏi quần áo.',
            },
            {
                id: 3,
                thumbnail: Placeholder,
                title: 'Ủi đồ',
                description:
                    'Dịch vụ ủi quần áo để loại bỏ các nếp nhăn và làm cho quần áo trông sạch sẽ và tinh tươm.',
            },
            {
                id: 4,
                thumbnail: Placeholder,
                title: 'Chỉnh sửa',
                description: 'Dịch vụ sửa đổi các loại quần áo, chẳng hạn như may viền quần hoặc lấy váy.',
            },
            {
                id: 5,
                thumbnail: Placeholder,
                title: 'Giặt công nghiệp',
                description:
                    'Dịch vụ ủi quần áo để loại bỏ các nếp nhăn và làm cho quần áo trông sạch sẽ và tinh tươm.',
            },
            {
                id: 6,
                thumbnail: Placeholder,
                title: 'Giặt thảm',
                description: 'Dịch vụ sửa đổi các loại quần áo, chẳng hạn như may viền quần hoặc lấy váy.',
            },
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

    const handleChangeTabs = (event: React.MouseEvent<HTMLLIElement>) => {
        const tabs = document.querySelectorAll<HTMLElement>('.service__slider--tab');
        tabs.forEach((element) => {
            element.classList.remove('service__slider--active');
        });

        const clickedTab = event.target as HTMLElement;
        clickedTab.classList.add('service__slider--active');
    };
    const ratingText = getRating(center.rating);
    return (
        <div className="center__wrapper flex justify-between gap-[40px] mt-9">
            <div className="center__details text-left basis-2/3">
                <div className="center__details--main flex">
                    <div className="center__details--thumbnail max-h-[280px] basis-5/12 overflow-hidden">
                        <img
                            className="h-full w-full object-cover object-center inline-block"
                            src={center.thumbnail}
                            alt=""
                        />
                    </div>
                    <div className="center__details--content basis-7/12 p-6 ml-10 border border-[#B3B3B3] rounded-2xl">
                        <h1 className="text-2xl font-bold">{center.title}</h1>
                        <h3 className="mt-2 text-base">{center.address}</h3>
                        <h3 className="mt-4 text-base flex items-center">
                            <FaRegClock className="inline-block mr-2" />
                            {`${formatTime(center.operatingHours[today].start)} - ${formatTime(
                                center.operatingHours[today].end,
                            )}`}
                            <StatusTag opening={status} />
                        </h3>
                        <h3 className="mt-1 text-base">
                            <FaPhoneAlt className="inline-block mr-2" />
                            {center.phone}
                        </h3>
                    </div>
                </div>
                <div className="center__details--services mt-16 text-center">
                    <h1 className="center__details-header font-bold text-3xl">Dịch vụ</h1>
                    <div className="service__slider--tabs mt-8 px-2">
                        <div className="ol flex list-none font-semibold justify-center h-10 border-b border-[#B3B3B3]">
                            <li
                                onClick={handleChangeTabs}
                                className="px-6 service__slider--tab service__slider--active"
                            >
                                Giặt ủi
                            </li>
                            <li onClick={handleChangeTabs} className="px-6 service__slider--tab">
                                Giặt hấp
                            </li>
                            <li onClick={handleChangeTabs} className="px-6 service__slider--tab">
                                Sửa chữa
                            </li>
                            <li onClick={handleChangeTabs} className="px-6 service__slider--tab">
                                Giặt thảm
                            </li>
                            <li onClick={handleChangeTabs} className="px-6 service__slider--tab">
                                Công nghiệp
                            </li>
                        </div>
                    </div>
                    <div className="center__details--slider max-w-[820px] mt-4 mb-10">
                        <div className="service__slider--wrapper">
                            <Carousel
                                showItem={3}
                                items={center.service.map((card) => {
                                    return (
                                        <ServiceCard
                                            id={card.id}
                                            thumbnail={card.thumbnail}
                                            title={card.title}
                                            description={card.description}
                                            action={true}
                                            actionContent="Xem dịch vụ"
                                            actionType="primary"
                                            minHeight="132px"
                                            cardHeight="436px"
                                            actionLink="/centers/center/service"
                                        ></ServiceCard>
                                    );
                                })}
                            ></Carousel>
                        </div>
                    </div>
                </div>
                <div className="center__details--gallery"></div>
                <div className="center__details--gallery"></div>
            </div>
            <div className="center__sideinfo basis-1/3">
                <div className="center__sideinfo--rating p-6 border border-[#B3B3B3] rounded-2xl">
                    <h2 className="text-left font-bold text-2xl">Đánh giá</h2>
                    <div className="center__rating--wrapper flex gap-3 mt-2">
                        <div className="center__rating--overall basis-2/5">
                            <div className="rating--overall p-2 pt-4 flex flex-wrap justify-center items-end rounded-lg">
                                <span className="text-4xl font-bold text-white pl-2">{center.rating}</span>
                                <svg width={40} height={40} viewBox="2 1 16 16">
                                    <path
                                        fill="white"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10 13.3736L12.5949 14.7111C12.7378 14.7848 12.9006 14.8106 13.0593 14.7847C13.4681 14.718 13.7454 14.3325 13.6787 13.9237L13.2085 11.0425L15.2824 8.98796C15.3967 8.8748 15.4715 8.72792 15.4959 8.569C15.5588 8.15958 15.2779 7.77672 14.8685 7.71384L11.983 7.2707L10.6699 4.66338C10.5975 4.51978 10.481 4.40322 10.3374 4.33089C9.96742 4.14458 9.51648 4.29344 9.33017 4.66338L8.01705 7.2707L5.13157 7.71384C4.97265 7.73825 4.82577 7.81309 4.71261 7.92731C4.42109 8.22158 4.42332 8.69645 4.71759 8.98796L6.79152 11.0425L6.32131 13.9237C6.29541 14.0824 6.3212 14.2452 6.39486 14.3881C6.58464 14.7563 7.03696 14.9009 7.40514 14.7111L10 13.3736Z"
                                    ></path>
                                </svg>
                                <div className="basis-full font-bold text-lg text-white">{ratingText}</div>
                            </div>
                            <div className="rating--stars mt-2">
                                <RatingStars rating={center.rating} starSize={28}></RatingStars>
                            </div>
                        </div>
                        <div className="border-l border-[#B3B3B3]"></div>
                        <div className="center__rating--distribution basis-2/5 flex-grow"></div>
                    </div>
                </div>
                <div className="center__sideinfo--map mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                    <h2 className="text-left font-bold text-2xl">Bản đồ</h2>
                    <div className="center__map--wrapper w-full min-h-[420px] border border-[#B3B3B3] rounded-lg mt-6"></div>
                </div>
            </div>
        </div>
    );
};

export default CenterContainer;
