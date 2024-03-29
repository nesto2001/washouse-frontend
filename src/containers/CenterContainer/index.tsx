import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Placeholder from '../../assets/images/placeholder.png';
import Carousel from '../../components/Carousel';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import Loading from '../../components/Loading/Loading';
import Map from '../../components/Map/Map';
import RatingStars from '../../components/RatingStars/RatingStars';
import ServiceCard from '../../components/ServiceCard';
import StatusTag from '../../components/StatusTag';
import { CenterDetailsModel } from '../../models/Center/CenterDetailsModel';
import { getCenter } from '../../repositories/CenterRepository';
import { getRating, getURLId } from '../../utils/CommonUtils';
import { compareTime, getToday } from '../../utils/TimeUtils';

import { Tabs, TabsProps } from 'antd';

import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import CouponTag from '../../components/CouponTag/CouponTag';
import RatingDistribution from '../../components/RatingDistribution/RatingDistribution';
import { PromotionModel } from '../../models/Promotion/PromotionModel';
import { getPromotionsCenter } from '../../repositories/PromotionRepository';
import { CenterMap } from '../../types/CenterMap';
import { formatLink } from '../../utils/FormatUtils';
import './CenterContainer.scss';
import DeliveryPriceChart from '../../components/DeliveryPriceChart';

type Props = {};

function mapCenterDetailsToMap(center: CenterDetailsModel): CenterMap {
    return {
        id: center.id,
        title: center.alias ?? center.title,
        rating: center.rating,
        numOfRating: center.numOfRating,
        location: {
            latitude: center.centerLocation.latitude,
            longitude: center.centerLocation.longitude,
        },
        thumbnail: center.thumbnail,
    };
}

const CenterContainer = (props: Props) => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('0');
    const [status, setStatus] = useState<boolean>(false);
    const [center, setCenter] = useState<CenterDetailsModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [isBreakDay, setIsBreakDay] = useState<boolean>(false);
    const [promotions, setPromotions] = useState<PromotionModel[]>();

    const id = getURLId(location.pathname);

    const onChange = (key: string) => {
        setSelectedKey(key);
    };

    const today = getToday();

    const mapStyles: React.CSSProperties = { height: '420px' };

    useEffect(() => {
        const fetchData = async () => {
            if (id) return await getCenter(parseInt(id));
        };
        fetchData()
            .then((res) => {
                setCenter(res);
                setIsLoading(false);
                if (res) {
                    const opening: string = res.operatingHours[today]?.start ?? '';
                    const closing: string = res.operatingHours[today]?.end ?? '';
                    console.log(opening, closing);
                    if (opening && closing) {
                        setStatus(compareTime(opening, closing));
                        setIsBreakDay(false);
                    } else {
                        setStatus(false);
                        setIsBreakDay(true);
                    }
                    getPromotionsCenter(res.id).then((pomos) => {
                        setPromotions(pomos);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    const ratingText = center?.numOfRating != 0 ? getRating(center ? center.rating : 0) : 'Chưa có';

    const items: TabsProps['items'] = center?.service.map((category, index) => {
        return {
            key: index.toString(),
            label: category.categoryName,
            children: category.services && (
                <>
                    <Carousel
                        showItem={category.services.length < 3 ? category.services.length : 3}
                        items={category.services.map((service) => {
                            return (
                                <ServiceCard
                                    cardData={{
                                        id: service.id,
                                        thumbnail: service.image,
                                        title: service.name,
                                        action: true,
                                        actionContent: 'Xem dịch vụ',
                                        actionLink: `/trung-tam/${formatLink(center.title)}-c.${center.id}/${formatLink(
                                            service.name,
                                        )}`,
                                        actionType: 'primary',
                                        cardHeight: '464px',
                                        description: service.description,
                                        minHeight: '132px',
                                        minPrice: service.minPrice,
                                        price: service.price,
                                    }}
                                    serviceData={{ centerId: center.id, serviceId: service.id }}
                                ></ServiceCard>
                            );
                        })}
                    ></Carousel>
                </>
            ),
        };
    });

    useEffect(() => {
        console.log(center);
    }, []);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (!center) {
        return <ErrorScreen />;
    }

    return (
        <>
            <div className="center__wrapper flex justify-between gap-[40px] mt-9">
                <div className="center__details text-left basis-2/3">
                    <div className="center__details--main flex">
                        <div className="center__details--thumbnail max-w-[306px] max-h-[280px] w-[306px] h-[218 px] basis-5/12 overflow-hidden">
                            <img
                                className="h-full w-full object-cover object-center inline-block"
                                src={center.thumbnail ?? Placeholder}
                                alt=""
                            />
                        </div>
                        <div className="center__details--content basis-7/12 p-6 ml-10 border border-[#B3B3B3] rounded-2xl">
                            <h1 className="text-2xl font-bold">{center.title}</h1>
                            <h3 className="mt-2 text-base capitalize">{center.centerAddress + ', TP. Hồ Chí Minh'}</h3>
                            <h3 className="mt-4 text-base flex items-center">
                                {center.operatingHours[today]?.start && center.operatingHours[today]?.end && (
                                    <>
                                        <FaRegClock className="inline-block mr-2" />
                                        {center.operatingHours[today].start?.substring(0, 5)} -{' '}
                                        {center.operatingHours[today].end?.substring(0, 5)}
                                    </>
                                )}
                                <StatusTag opening={status} isBreakDay={isBreakDay} />
                            </h3>
                            <h3 className="mt-1 text-base">
                                <FaPhoneAlt className="inline-block mr-2" />
                                {center.phone}
                            </h3>
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {promotions ? (
                                    <>
                                        {promotions.slice(0, 1).map((promotion) => (
                                            <CouponTag content={promotion.code} />
                                        ))}
                                        {promotions.length > 1 ? (
                                            <CouponTag content={`+ ${promotions.length - 1} mã khuyến mãi`} primary />
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="center__details--services my-16 text-center overflow-visible">
                        <h1 className="center__details-header font-bold text-3xl">Dịch vụ</h1>
                        <div className="service__slider--tabs mt-8 px-2 max-w-[780px]">
                            <Tabs items={items} onChange={onChange} activeKey={selectedKey} />
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
                                            fillRule="evenodd"
                                            clipRule="evenodd"
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
                            <div className="center__rating--distribution basis-2/5 flex-grow">
                                <RatingDistribution ratings={center.ratings} />
                            </div>
                        </div>
                    </div>
                    <div className="center__sideinfo--map mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                        <h2 className="text-left font-bold text-2xl">Bản đồ</h2>
                        <div className="center__map--wrapper w-full min-h-[420px] border border-[#B3B3B3] rounded-lg mt-6 overflow-hidden">
                            <Map
                                centerLocation={center.centerLocation}
                                selectedCenter={mapCenterDetailsToMap(center)}
                                style={mapStyles}
                            ></Map>
                        </div>
                    </div>
                    {center.hasDelivery && center.centerDeliveryPrices && (
                        <div className="center__sideinfo--map mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                            <h2 className="text-left font-bold text-2xl">Bảng giá vận chuyển</h2>
                            <div className="center__map--wrapper w-full rounded-lg mt-6 overflow-hidden">
                                <DeliveryPriceChart priceChart={center.centerDeliveryPrices} unitType="kg" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CenterContainer;
