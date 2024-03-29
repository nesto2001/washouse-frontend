import { useEffect, useState } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import Logo from '../../assets/images/washouse-tagline.png';
import Breadcrumb from '../../components/Breadcrumb';
import './CheckoutContainer.scss';
import dayjs from 'dayjs';
import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
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
import { clearCart } from '../../reducers/CartReducer';
import { Tooltip, message } from 'antd';
import { applyPromotion } from '../../repositories/PromotionRepository';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import Loading from '../../components/Loading/Loading';
import { DeliveryInfoRequest } from '../../models/Order/DeliveryInfoRequest';

type Props = {};

const CheckoutContainer = (props: Props) => {
    const navigate = useNavigate();
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCenterId = useSelector((state: RootState) => state.cart.centerId);
    const orderNote = useSelector((state: RootState) => state.cart.orderNote);
    const today = getToday();

    const dispatch = useDispatch();

    const [center, setCenter] = useState<CenterModel>();
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState<boolean>(false);

    const [promoCode, setPromoCode] = useState<string>('');

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
        paymentType: 0,
        deliveryInfo: [],
    });

    const [discount, setDiscount] = useState<number>(0);

    const [freight, setFreight] = useState<number>(formData.deliveryPrice);

    const [total, setTotal] = useState<number>(cartTotal + freight - discount);

    //calculate order
    useEffect(() => {
        setTotal(cartTotal + freight - discount);
    }, [discount, freight, total, cartTotal]);

    useEffect(() => {
        setLoading(true);
        getMe()
            .then((res) => {
                if (res) {
                    setUser(res);
                    setFormData((prev) => ({ ...prev, fullname: res.name, phone: res.phone, email: res.email }));
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

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
                    customerMessage: orderNote ?? undefined,
                    customerMobile: formData.phone,
                    customerWardId: formData.wardId,
                    deliveryPrice: formData.deliveryPrice,
                    deliveryType: formData.deliveryType,
                    preferredDeliverTime: formData.preferredDeliverTime ?? undefined,
                    preferredDropoffTime:
                        formData.preferredDropoffTime.length > 0
                            ? formData.preferredDropoffTime
                            : dayjs().format('DD-MM-YYYY HH:mm:ss'),
                },
                deliveries: formData.deliveryInfo.map((delivery): DeliveryInfoRequest => {
                    return {
                        addressString: delivery.addressString,
                        deliveryType: delivery.deliveryType,
                        wardId: delivery.wardId,
                    };
                }),
                orderDetails: cartItems.map((item) => {
                    return {
                        serviceId: item.id,
                        measurement: item.quantity && item.quantity > 0 ? item.quantity : item.weight ?? 0,
                        price: item.price ?? 0,
                        customerNote: item.customerNote,
                    };
                }),
                paymentMethod: formData.paymentType ?? 0,
            };
            console.log(JSON.stringify(CreateOrderData));
            const placeOrder = async () => {
                return await createOrder(CreateOrderData);
            };
            placeOrder()
                .then((res) => {
                    dispatch(clearCart());
                    navigate('/cart/checkout/confirm', {
                        state: { orderId: res.orderId, customerPhone: formData.phone, customerEmail: formData.email },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleApplyCode = () => {
        const applyCode = async () => {
            return await applyPromotion(promoCode);
        };
        applyCode()
            .then((res) => {
                setDiscount(cartTotal * res);
                setFormData((prev) => ({ ...prev, promoCode: promoCode }));
            })
            .catch((err) => {
                message.error(err);
            });
    };

    return (
        <>
            {!loading ? (
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
                                    {!user && (
                                        <div className="login--nav">
                                            Bạn đã có tài khoản?
                                            <Link className="text-primary font-bold" to="/login">
                                                Đăng nhập
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {step === 1 && center && (
                            <Step1 onNext={handleNext} formData={formData} setFormData={setFormData} />
                        )}
                        {step === 2 && center && (
                            <Step2
                                centerHasDelivery={center.hasDelivery}
                                onNext={handleNext}
                                setFormData={setFormData}
                                onBack={handleBack}
                                formData={formData}
                                centerOperatingDays={center.centerOperatingHours}
                            />
                        )}
                        {step === 3 && center && (
                            <Step3
                                hasOnlinePayment={center.hasOnlinePayment}
                                setFormData={setFormData}
                                onBack={handleBack}
                                formData={formData}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </div>
                    <div className="checkout__sidebar basis-[45%] text-left px-6 pt-6 relative">
                        <div className="checkout__center">
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
                                    <h3 className="text-sm mt-1">{center?.address}, TP. Hồ Chí Minh</h3>
                                    {/* center.address */}
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
                                    </h3>
                                    {/* center.operationHour */}
                                    <h1 className="text-sm">
                                        <FaPhoneAlt className="inline-block mr-2" />
                                        <span className="inline-block align-middle">{center?.phone}</span>
                                    </h1>
                                    {/* center.phone */}
                                </div>
                            </div>
                            <hr className="border-wh-gray" />
                            <div className="checkout__order py-6">
                                <h2 className="font-bold text-xl">Chi tiết đơn hàng</h2>
                                <div className="">Ước tính xử lý đơn hàng: {totalEst} phút</div>
                                <div className="">Ghi chú đơn hàng: {orderNote ?? 'Không có'}</div>
                                <div className="checkout__order--details mt-5">
                                    {cartItems &&
                                        cartItems.map((item, index) => (
                                            <div
                                                key={`cartitem-${index}`}
                                                className="checkout__order--item py-3 flex gap-4 border-b border-wh-gray"
                                            >
                                                <div className="checkout__order--item order__item--thumb flex-shrink rounded-2xl overflow-hidden">
                                                    <img
                                                        className="h-[120px] w-[140px] object-cover"
                                                        src={item.thumbnail ?? Placeholder}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="checkout__order--item order__item--info flex-grow flex flex-col">
                                                    <input type="hidden" value={item.id} name="cart__item-id" />
                                                    <div className="flex w-full justify-between items-baseline">
                                                        <h3 className="font-bold text-xl mt-3">
                                                            <Tooltip
                                                                className=" max-w-[200px] overflow-ellipsis line-clamp-1"
                                                                title={item.name}
                                                            >
                                                                {item.name}
                                                            </Tooltip>
                                                        </h3>
                                                        <h4 className="text-2xl font-bold mt-3">
                                                            {formatCurrency(item.price ?? 0)}
                                                        </h4>
                                                    </div>
                                                    <h4
                                                        className="text-sm flex
                -                                           grow mt-2"
                                                    >
                                                        Chi tiết:{' '}
                                                        {item.quantity && item.quantity > 0
                                                            ? item.quantity.toFixed(0)
                                                            : item.weight?.toFixed(1)}{' '}
                                                        {item.unit === 'kg' ? 'kg' : 'cái'}
                                                    </h4>
                                                    <h4 className="text-sm flex-grow max-w-[355.94px] line-clamp-2 pt-1">
                                                        Ghi chú:{' '}
                                                        {item.customerNote.length > 0 ? item.customerNote : 'không có'}
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
                                                    placeholder="Áp dụng mã giảm giá"
                                                    className="w-[80%] mr-3 max-w-[377px] rounded bg-white border border-wh-gray pl-3"
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                />
                                                <input
                                                    type="submit"
                                                    value="Áp dụng"
                                                    className="w-[20%] text-sm font-bold rounded px-5 py-2.5 bg-[#b3b3b3] cursor-pointer hover:opacity-70 transition-all"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleApplyCode();
                                                    }}
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
                                            {(discount > 0 ? '-' : '') + formatCurrency(discount)}
                                        </div>
                                        <div className="checkout__summary--header col-span-1 text-sm">Phí ship</div>
                                        <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                            {formatCurrency(freight)}
                                        </div>
                                        <hr className="col-span-2 border-wh-gray mt-2" />
                                        <div className="checkout__summary--header col-span-1 font-semibold pt-1">
                                            Tổng cộng
                                        </div>
                                        <div className="checkout__order--subtotal col-span-1 text-2xl text-right text-primary font-semibold">
                                            {formatCurrency(total)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default CheckoutContainer;
