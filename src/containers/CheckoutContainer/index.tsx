import { useEffect, useState } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import Logo from '../../assets/images/washouse-tagline.png';
import Breadcrumb from '../../components/Breadcrumb';
import './CheckoutContainer.scss';

import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CenterModel } from '../../models/Center/CenterModel';
import { getCenterBrief } from '../../repositories/CenterRepository';
import { RootState } from '../../store/CartStore';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';
import { formatCurrency } from '../../utils/FormatUtils';
import { getToday } from '../../utils/TimeUtils';
import { Step1, Step2, Step3 } from './CheckoutFormContainer';
import { createOrder, getEstimateTime } from '../../repositories/OrderRepository';
import { CreateOrderRequest } from '../../models/Order/CreateOrderRequest';

type Props = {};

const CheckoutContainer = (props: Props) => {
    const navigate = useNavigate();
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCenterId = useSelector((state: RootState) => state.cart.centerId);
    const today = getToday();

    const [center, setCenter] = useState<CenterModel>();

    const [totalEst, setTotalEst] = useState<number>(0);

    const [step, setStep] = useState<number>(1);

    const [formData, setFormData] = useState<CheckoutFormData>({
        fullname: '',
        address: '',
        city: 0,
        district: 0,
        wardId: 0,
        email: '',
        phone: '',
        preferredDropoffTime: '',
        preferredDeliverTime: '',
        deliveryType: 0,
        deliveryPrice: 0,
        paymentType: 1,
        deliveryInfo: [],
    });

    const [discount, setDiscount] = useState<number>(0);

    const [freight, setFreight] = useState<number>(0);

    const [total, setTotal] = useState<number>(cartTotal + freight - discount);

    //calculate order
    useEffect(() => {
        setTotal(cartTotal + freight - discount);
    }, [discount, freight, total, cartTotal]);

    //fetch center
    useEffect(() => {
        const fetchData = async () => {
            return await getCenterBrief(cartCenterId);
        };
        fetchData().then((res) => {
            setCenter(res);
        });
    }, [cartCenterId]);

    //calculate time

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getEstimateTime(cartItems);
        };
        fetchData().then((res) => {
            setTotalEst(res.estimated);
        });
    }, [cartItems]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (center) {
            const CreateOrderData: CreateOrderRequest = {
                centerId: center.id,
                order: {
                    customerName: formData.fullname,
                    customerAddressString: formData.address,
                    customerEmail: formData.email,
                    customerMessage: '',
                    customerMobile: formData.phone,
                    customerWardId: formData.wardId,
                    deliveryPrice: formData.deliveryPrice,
                    deliveryType: formData.deliveryType,
                    preferredDeliverTime: formData.preferredDeliverTime,
                    preferredDropoffTime: formData.preferredDropoffTime,
                },
                deliveries: [],
                orderDetails: cartItems.map((item) => {
                    return {
                        serviceId: item.id,
                        measurement: item.quantity && item.quantity > 0 ? item.quantity : item.weight ?? 0,
                        price: item.price ?? 0,
                        customerNote: '',
                    };
                }),
                paymentMethod: 0,
            };
            console.log(CreateOrderData);
            const placeOrder = async () => {
                return await createOrder(CreateOrderData);
            };
            placeOrder()
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="checkoutsite__wrapper flex justify-between h-screen container mx-auto text-sub relative">
            <div className="checkout__main basis-[55%] pt-16 pr-16">
                <div className="washouse-logo -mb-4">
                    <Link to="/">
                        <img className="max-w-[327px]" src={Logo} alt="" />
                    </Link>
                </div>
                <Breadcrumb />
                <div className="checkout__customer--wrapper text-left mt-6">
                    {step === 1 && (
                        <>
                            <h3 className="font-bold text-xl">Thông tin khách hàng</h3>
                            <div className="login--nav">
                                Bạn đã có tài khoản?{' '}
                                <Link className="text-primary font-bold" to="/login">
                                    Đăng nhập
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {step === 1 && center && <Step1 onNext={handleNext} formData={formData} setFormData={setFormData} />}
                {step === 2 && center && (
                    <Step2
                        onNext={handleNext}
                        setFormData={setFormData}
                        onBack={handleBack}
                        formData={formData}
                        centerOperatingDays={center.centerOperatingHours}
                    />
                )}
                {step === 3 && center && (
                    <Step3 setFormData={setFormData} onBack={handleBack} formData={formData} onSubmit={handleSubmit} />
                )}
            </div>
            <div className="checkout__sidebar basis-[45%] text-left px-6 pt-6 relative">
                <div className="checkout__center fixed">
                    <h2 className="font-bold text-xl">Trung tâm</h2>
                    <div className="checkout__center--details flex mt-3 mb-6">
                        <div className="checkout__center--thumbnail md:w-[200px] md:h-[145px] rounded-2xl overflow-hidden">
                            <img
                                className="max-h-[145px] max-w-[200px] md:w-[200px] w-full h-full object-cover"
                                src={center?.thumbnail ?? Placeholder}
                                alt=""
                            />
                        </div>
                        <div className="checkout__center--info ml-6 w-[271px]">
                            <h1 className="text-xl font-bold pt-3">{center?.title}</h1> {/* center.title */}
                            <h3 className="text-sm mt-1">{center?.address}, TP. Hồ Chí Minh</h3> {/* center.address */}
                            <h3 className="text-sm">
                                {center?.centerOperatingHours[today]?.start &&
                                    center?.centerOperatingHours[today]?.end && (
                                        <>
                                            <FaRegClock className="mr-2 inline-block" />
                                            <span className="leading-7">
                                                {center?.centerOperatingHours[today].start?.substring(0, 5)} -{' '}
                                                {center?.centerOperatingHours[today].end?.substring(0, 5)}
                                            </span>
                                        </>
                                    )}
                            </h3>{' '}
                            {/* center.operationHour */}
                            <h1 className="text-sm">
                                <FaPhoneAlt className="inline-block mr-2" />
                                <span className="inline-block align-middle">{center?.phone}</span>
                            </h1>{' '}
                            {/* center.phone */}
                        </div>
                    </div>
                    <hr className="border-wh-gray" />
                    <div className="checkout__order py-6">
                        <h2 className="font-bold text-xl">Chi tiết đơn hàng</h2>
                        <div className="">Ước tính xử lý đơn hàng: {totalEst}'</div>
                        <div className="checkout__order--details mt-5">
                            {cartItems &&
                                cartItems.map((item, index) => (
                                    <div
                                        key={`cartitem-${index}`}
                                        className="checkout__order--item py-3 flex gap-4 border-b border-wh-gray"
                                    >
                                        <div className="checkout__order--item order__item--thumb flex-shrink rounded-2xl overflow-hidden">
                                            <img className="max-h-[120px]" src={item.thumbnail ?? Placeholder} alt="" />
                                        </div>
                                        <div className="checkout__order--item order__item--info flex flex-col">
                                            <input type="hidden" value={item.id} name="cart__item-id" />
                                            <h3 className="font-bold text-xl mt-3">{item.name}</h3>
                                            <h4 className="text-sm flex-grow mt-2">
                                                Chi tiết:{' '}
                                                {item.quantity && item.quantity > 0 ? item.quantity : item.weight}{' '}
                                                {item.unit === 'kg' ? 'kg' : ''}
                                            </h4>
                                            <h4 className="text-2xl font-bold mb-1">
                                                {formatCurrency(item.price ?? 0)}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="checkout__order--payment mt-6">
                            <div className="checkout__order--promotion">
                                <form action="">
                                    <h4>Mã giảm giá</h4>
                                    <div className="promo__inputgroup flex justify-between mt-3">
                                        <input
                                            type="text"
                                            name="promoCode"
                                            id=""
                                            className="w-[80%] mr-3 max-w-[377px] rounded bg-white border border-wh-gray"
                                        />
                                        <input
                                            type="submit"
                                            value="Áp dụng"
                                            className="w-[20%] text-sm font-bold rounded px-5 py-2.5 bg-[#b3b3b3]"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="checkout__order--summary grid grid-cols-2 mt-8 gap-y-3">
                                <div className="checkout__summary--header col-span-1 text-sm">Tổng tiền</div>
                                <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                    {formatCurrency(cartTotal)}
                                </div>
                                <div className="checkout__summary--header col-span-1 text-sm">Mã giảm giá</div>
                                <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                    {discount > 0 ? '-' : '' + formatCurrency(discount)}
                                </div>
                                <div className="checkout__summary--header col-span-1 text-sm">Phí ship</div>
                                <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                    {formatCurrency(freight)}
                                </div>
                                <hr className="col-span-2 border-wh-gray mt-2" />
                                <div className="checkout__summary--header col-span-1 font-semibold pt-1">Tổng cộng</div>
                                <div className="checkout__order--subtotal col-span-1 text-2xl text-right text-primary font-semibold">
                                    {formatCurrency(total)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutContainer;
