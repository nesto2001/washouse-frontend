import { Button, message, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import ModalImg from '../../assets/images/laundry-modal.svg';
import Placeholder from '../../assets/images/placeholder.png';
import WHButton from '../../components/Button';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import PriceTable from '../../components/PriceTable';
import RatingStars from '../../components/RatingStars/RatingStars';
import StatusTag from '../../components/StatusTag';
import { CenterModel } from '../../models/Center/CenterModel';
import { ServiceDetailsModel } from '../../models/Service/ServiceDetailsModel';
import { addToCart, clearCart } from '../../reducers/CartReducer';
import { getCenterBrief } from '../../repositories/CenterRepository';
import { getService } from '../../repositories/ServiceRepository';
import { RootState } from '../../store/CartStore';
import { CartItem } from '../../types/CartType/CartItem';
import { calculatePrice, getRating, getWeightUnitPrice } from '../../utils/CommonUtils';
import { formatCurrency } from '../../utils/FormatUtils';
import { compareTime, getToday } from '../../utils/TimeUtils';

type Props = {};

const CenterServiceContainer = (props: Props) => {
    const cartCenterId = useSelector((state: RootState) => state.cart.centerId);
    const [messageApi, contextHolder] = message.useMessage();
    const [service, setService] = useState<ServiceDetailsModel>();
    const [center, setCenter] = useState<CenterModel>();
    const [weightInput, setWeightInput] = useState<string>('');
    const [quantityInput, setQuantityInput] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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

    const { centerId, id } = useParams();
    const serviceCenterId = centerId ? parseInt(centerId) : 0;

    useEffect(() => {
        const fetchData = async () => {
            if (id && centerId) return await getService(serviceCenterId, parseInt(id));
        };
        fetchData()
            .then((res) => {
                setService(res);
                const fetchData = async () => {
                    if (centerId) return await getCenterBrief(serviceCenterId);
                };
                fetchData().then((centerRes) => {
                    setCenter(centerRes);
                    setIsLoading(false);
                });
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    const dispatch = useDispatch();

    const [servicePrice, setServicePrice] = useState<string>(
        service?.price
            ? formatCurrency(service.price)
            : service?.prices
            ? `${formatCurrency(
                  service.minPrice ?? service.prices[0].price * service.prices[0].maxValue,
              )} - ${formatCurrency(
                  service.prices[service.prices.length - 1].price * service.prices[service.prices.length - 1].maxValue,
              )}`
            : formatCurrency(0),
    );
    const [status, setStatus] = useState<boolean>(false);
    const [isBreakDay, setIsBreakDay] = useState<boolean>(false);

    const today = getToday();

    useEffect(() => {
        const opening: string = center?.centerOperatingHours[today].start ?? '';
        const closing: string = center?.centerOperatingHours[today].end ?? '';
        if (opening && closing) {
            setStatus(compareTime(opening, closing));
            setIsBreakDay(false);
        } else {
            setStatus(false);
            setIsBreakDay(true);
        }
    }, [status, center]); // get center opening status

    // (`${service.prices[0].price.toString()} - ${service.priceChart[service.priceChart.length - 1].price.toString()}`) : null,
    useEffect(() => {
        if (service && weightInput && parseFloat(weightInput) > 0) {
            const calculatedPrice =
                service.prices && calculatePrice(service.prices, service.minPrice, parseFloat(weightInput));
            calculatedPrice && setServicePrice(formatCurrency(calculatedPrice));
        } else if (service && service.price && quantityInput > 0) {
            const calculatedPrice = service.price * quantityInput;
            calculatedPrice && setServicePrice(formatCurrency(calculatedPrice));
        } else {
            setServicePrice(
                service?.price
                    ? formatCurrency(service.price)
                    : service?.prices
                    ? `${formatCurrency(
                          service.minPrice ?? service.prices[0].price * service.prices[0].maxValue,
                      )} - ${formatCurrency(
                          service.prices[service.prices.length - 1].price *
                              service.prices[service.prices.length - 1].maxValue,
                      )}`
                    : formatCurrency(0),
            );
        }
    }, [weightInput, service, quantityInput]);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (!service || !center) {
        return <ErrorScreen />;
    }

    const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (centerId && cartCenterId && cartCenterId !== parseInt(centerId)) {
            setModalVisible(true);
        } else {
            if ((weightInput && parseFloat(weightInput)) || quantityInput > 0) {
                const cartItem: CartItem = {
                    id: service.id,
                    name: service.name,
                    thumbnail: service.image,
                    unitPrice:
                        service.price ?? (service.prices && getWeightUnitPrice(service.prices, parseInt(weightInput))),
                    weight: parseInt(weightInput) ?? null,
                    quantity: quantityInput ?? null,
                    unit: quantityInput ? 'pcs' : 'kg',
                    price: parseFloat(servicePrice.replace(/[^\d]*(\d{1,3})(?:[^\d]|$)/g, '$1')),
                    centerId: center.id,
                    priceChart: service.prices,
                };
                try {
                    dispatch(addToCart(cartItem) as any)
                        .then(() => messageApi.success('Đã thêm vào giỏ hàng'))
                        .catch((err: Error) => {
                            messageApi.error(err.message);
                        });
                    // dispatch(addItem(cartItem));
                } catch (error) {
                    messageApi.error(`Không thể thêm vào giỏ hàng, vui lòng thử lại sau!`);
                }
            }
        }
    };

    const handleOk = () => {
        setIsModalLoading(true);
        dispatch(clearCart());
        if ((weightInput && parseFloat(weightInput)) || quantityInput > 0) {
            const cartItem: CartItem = {
                id: service.id,
                name: service.name,
                thumbnail: service.image,
                unitPrice: service.price ?? 0,
                weight: parseInt(weightInput) ?? null,
                quantity: quantityInput ?? null,
                unit: quantityInput ? 'pcs' : 'kg',
                centerId: center.id,
                minPrice: service.minPrice,
            };
            try {
                setTimeout(() => {
                    dispatch(addToCart(cartItem) as any)
                        .then(() => messageApi.success('Đã thêm vào giỏ hàng'))
                        .catch((err: Error) => {
                            messageApi.error(err.message);
                        });
                    // dispatch(addItem(cartItem));
                    setIsModalLoading(false);
                    setModalVisible(false);
                }, 1500);
            } catch (error) {
                setIsModalLoading(false);
                setModalVisible(false);
            }
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const regex = /^[0-9.]*$/;
        const { value, maxLength } = event.target;
        if (regex.test(value)) setWeightInput(value.slice(0, maxLength));
    };

    const ratingText = getRating(service.rating ?? 0);
    return (
        <>
            {contextHolder}
            <div className="service__wrapper flex justify-between gap-[40px] mt-9">
                <div className="service__details text-left basis-2/3">
                    <div className="service__details--main flex">
                        <div className="service__details--thumbnail basis-5/12">
                            <div className="service__thumbnail--main">
                                <img className="w-full" src={service.image ?? Placeholder} alt="" />
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
                                <h1 className="text-3xl font-bold">{service.name}</h1>
                                <h3 className="mt-2 text-2xl font-bold text-primary">{servicePrice}</h3>
                                <p className="text-justify text-sm mt-3">{service.description}</p>
                                <h4 className="text-sm mt-3">
                                    <span className="font-bold">Thời gian xử lý:</span> {service.timeEstimate}'
                                    {/* {service.minTime * 60}' - {service.maxTime * 60}' */}
                                </h4>
                                <div className="service__inputgroup mt-3">
                                    <h3 className="text-sm font-bold">
                                        {service.priceType ? 'Khối lượng' : 'Số lượng'}
                                    </h3>
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
                            {service.priceType && service.prices && (
                                <div className="basis-1/2">
                                    <h3 className="text-xl font-bold">Bảng giá dịch vụ</h3>
                                    <div className="service__priceTable mt-3">
                                        <PriceTable priceChart={service.prices} unitType="ký"></PriceTable>
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
                                    <RatingStars rating={service.rating ?? 0} starSize={28}></RatingStars>
                                </div>
                            </div>
                            <div className="border-l border-[#B3B3B3]" />
                            <div className="service--distribution basis-2/5 flex-grow"></div>
                        </div>
                    </div>
                    <div className="service__sideinfo--center mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                        <h2 className="text-left font-bold text-2xl">Trung tâm</h2>
                        <div className="sideinfo__center--card mt-2">
                            <div className="sideinfo__center--thumb rounded-lg overflow-hidden">
                                <img src={center.thumbnail ?? Placeholder} alt="" />
                            </div>
                            <div className="sideinfo__center-content text-left">
                                <div className="font-bold mt-2">{center.title}</div>
                                <div className="text-sm text-sub-gray">{center.address}, TP. Hồ Chí Minh</div>
                                <div className="flex justify-between text-sm">
                                    <div className="sideinfo__center--opeHour flex items-center">
                                        {center.centerOperatingHours[today].start &&
                                            center.centerOperatingHours[today].end && (
                                                <>
                                                    <FaRegClock className="mr-2 self-center" />
                                                    <span className="leading-7">
                                                        {center.centerOperatingHours[today].start?.substring(0, 5)} -{' '}
                                                        {center.centerOperatingHours[today].end?.substring(0, 5)}
                                                    </span>
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
                        </div>
                    </div>
                </div>
                <Modal
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Hủy
                        </Button>,
                        <Button key="submit" type="primary" loading={isModalLoading} onClick={handleOk}>
                            Tiếp tục
                        </Button>,
                    ]}
                >
                    <img src={ModalImg} alt="" />
                    <div className="text-lg font-bold">Bạn muốn đặt dịch vụ ở trung tâm này?</div>
                    <div className="">Những dịch vụ bạn đã chọn từ trung tâm khác sẽ bị xóa khỏi giỏ hàng</div>
                </Modal>
            </div>
        </>
    );
};

export default CenterServiceContainer;
