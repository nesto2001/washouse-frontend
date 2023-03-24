import { Space } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Placeholder from '../../assets/images/placeholder.png';
import WHButton from '../../components/Button';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import PriceTable from '../../components/PriceTable';
import RatingStars from '../../components/RatingStars/RatingStars';
import { ServiceDetailsModel } from '../../models/Service/ServiceDetailsModel';
import { addItem } from '../../reducers/CartReducer';
import { getService } from '../../repositories/ServiceRepository';
import { CartItem } from '../../types/CartType/CartItem';
import { SubService } from '../../types/ServiceType/SubService';
import { calculatePrice, getRating } from '../../utils/CommonUtils';

type Props = {};

const CenterServiceContainer = (props: Props) => {
    const [service, setService] = useState<ServiceDetailsModel>();
    const [weightInput, setWeightInput] = useState<string>('');
    const [quantityInput, setQuantityInput] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    // const ServiceDetailsModel = useMemo(
    //     () => ({
    //         id: 1,
    //         thumbnail: Placeholder,
    //         title: 'Giặt ủi quần áo',
    //         description:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem accumsan, commodo velit ac, dictum sem. Proin pharetra lectus ac dolor dictum, eget tempor nulla efficitur. Nam eget euismod odio. Nunc euismod, eros ac dapibus interdum, magna libero placerat dui, ac commodo ante magna et mi.',
    //         minTime: 2,
    //         maxTime: 3,
    //         rating: 4.5,
    //         priceChart: [
    //             { maxValue: 3, price: 30000 },
    //             { maxValue: 4, price: 35000 },
    //             { maxValue: 5, price: 40000 },
    //             { maxValue: 6, price: 45000 },
    //             { maxValue: 7, price: 50000 },
    //         ],
    //     }),
    //     [],
    // );

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (id) return await getService(parseInt(id));
        };
        fetchData()
            .then((res) => {
                setService(res);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    const dispatch = useDispatch();

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (!service) {
        return <ErrorScreen />;
    }

    // const [servicePrice, setServicePrice] = useState(service?.servicePrices ?? service?.servicePrices);
    // (`${service.priceChart[0].price.toString()} - ${service.priceChart[service.priceChart.length - 1].price.toString()}`) : null,
    // useEffect(() => {
    //     servicePrice &&

    //         if (weightInput && parseFloat(weightInput) > 0) {
    //         const calculatedPrice = calculatePrice(service, parseFloat(weightInput));
    //         calculatedPrice && setServicePrice(calculatedPrice.toString());
    //     } else {
    //         setServicePrice(
    //             `${service.priceChart[0].price.toString()} - ${service.priceChart[
    //                 service.priceChart.length - 1
    //             ].price.toString()}`,
    //         );
    //     }

    // }, [weightInput, service]);

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if ((weightInput && parseFloat(weightInput)) || quantityInput > 0) {
            const cartItem: CartItem = {
                id: service.id,
                name: service.serviceName,
                thumbnail: service.image,
                price: service.price,
                weight: parseInt(weightInput) ?? null,
                quantity: quantityInput ?? null,
                unit: 'pcs',
            };
            try {
                dispatch(addItem(cartItem));
                console.log('Đã thêm vào giỏ hàng!');
            } catch (error) {
                console.error('Không thể thêm vào giỏ hàng:', error);
            }
        }
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const regex = /^[0-9.]*$/;
        const { value, maxLength } = event.target;
        if (regex.test(value)) setWeightInput(value.slice(0, maxLength));
    };

    const ratingText = getRating(service?.rating);
    return (
        <div className="service__wrapper flex justify-between gap-[40px] mt-9">
            <div className="service__details text-left basis-2/3">
                <div className="service__details--main flex">
                    <div className="service__details--thumbnail basis-5/12">
                        <div className="service__thumbnail--main">
                            <img src={Placeholder} alt="" />
                        </div>
                        <div className="service__thumbnail--gallery flex gap-3 mt-3">
                            <div className="gallery__image-1">
                                <img src={Placeholder} alt="" />
                            </div>
                            <div className="gallery__image-2">
                                <img src={Placeholder} alt="" />
                            </div>
                            <div className="gallery__image-3">
                                <img src={Placeholder} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="service__details--content basis-7/12 p-6 pl-10 ml-10 border border-[#B3B3B3] rounded-2xl">
                        <form action="" id="addcartForm">
                            <h1 className="text-3xl font-bold">{service.serviceName}</h1>
                            <h3 className="mt-2 text-2xl font-bold text-primary">
                                {service.priceType ? '' : service.price}đ
                            </h3>
                            <p className="text-justify text-sm mt-3">{service.description}</p>
                            <h4 className="text-sm mt-3">
                                <span className="font-bold">Thời gian xử lý:</span> {service.timeEstimate}'
                                {/* {service.minTime * 60}' - {service.maxTime * 60}' */}
                            </h4>
                            <div className="service__inputgroup mt-3">
                                <h3 className="text-sm font-bold">{service.priceType ? 'Khối lượng' : 'Số lượng'}</h3>
                                <div className="inputgroup flex items-center mt-1">
                                    {service.priceType ? (
                                        <>
                                            <input
                                                className="border border-[#424242] pl-2 py-1 rounded w-[100px] mr-1"
                                                type="number"
                                                name=""
                                                id=""
                                                value={weightInput}
                                                placeholder="KG"
                                                maxLength={8}
                                                onChange={handleChangeInput}
                                                // max={service.priceChart[service.priceChart.length - 1].maxValue}
                                            />
                                            KG
                                        </>
                                    ) : (
                                        <Space.Compact>
                                            <Input
                                                className="border border-[#424242] pl-2 py-1 rounded w-[100px] mr-1"
                                                type="number"
                                                name="item-quantity"
                                                value={quantityInput}
                                                onChange={(e) => setQuantityInput(parseInt(e.target.value))}
                                            />
                                        </Space.Compact>
                                    )}
                                </div>
                            </div>
                            <div className="service__actiongroup mt-6 flex justify-between">
                                <WHButton type="sub" minWidth="180px" form="addcartForm" onClick={handleAddToCart}>
                                    Thêm vào giỏ
                                </WHButton>
                                <WHButton type="primary" minWidth="180px">
                                    Đặt dịch vụ
                                </WHButton>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="service__details--description mt-14 md:w-[820px]">
                    <h3 className="text-xl font-bold pl-9">Mô tả</h3>
                    <hr className="mt-2" />
                    <div className="service__description--content px-5 py-9 flex gap-20">
                        <div className="basis-1/2">
                            <h3 className="text-xl font-bold">Thông tin dịch vụ</h3>
                            <p className="text-sm mt-3 text-justify">{service.description}</p>
                            <h4 className="text-sm mt-2">
                                <span className="font-bold">Thời gian xử lý:</span> {service.timeEstimate}'
                                {/* {service.minTime * 60}' - {service.maxTime * 60}' */}
                            </h4>
                        </div>
                        {service.priceType && (
                            <div className="basis-1/2">
                                <h3 className="text-xl font-bold">Bảng giá dịch vụ</h3>
                                <div className="service__priceTable mt-3">
                                    {/* <PriceTable priceChart={service.priceChart} unitType="ký"></PriceTable> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="service__sideinfo basis-1/3">
                <div className="service__sideinfo--rating p-6 border border-[#B3B3B3] rounded-2xl">
                    <h2 className="text-left font-bold text-2xl">Đánh giá</h2>
                    <div className="service__rating--wrapper flex gap-3 mt-2">
                        <div className="service__rating--overall basis-2/5">
                            <div className="rating--overall p-2 pt-4 flex flex-wrap justify-center items-end rounded-lg">
                                <span className="text-4xl font-bold text-white pl-2">{service.rating}</span>
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
                                <RatingStars rating={service.rating} starSize={28}></RatingStars>
                            </div>
                        </div>
                        <div className="border-l border-[#B3B3B3]" />
                        <div className="service--distribution basis-2/5 flex-grow"></div>
                    </div>
                </div>
                <div className="service__sideinfo--center mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                    <h2 className="text-left font-bold text-2xl">Trung tâm</h2>
                </div>
            </div>
        </div>
    );
};

export default CenterServiceContainer;
