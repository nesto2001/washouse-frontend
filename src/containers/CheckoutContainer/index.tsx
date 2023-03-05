import { useEffect, useState } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import Logo from '../../assets/images/washouse-tagline.png';
import Breadcrumb from '../../components/Breadcrumb';
import './CheckoutContainer.scss';

import { FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/CartStore';
import { Step1, Step2 } from './CheckoutFormContainer';
import { CheckoutFormData } from '../../types/FormData/CheckoutFormData';

type Props = {};

const CheckoutContainer = (props: Props) => {
    const navigate = useNavigate();
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        address: '',
        city: 0,
        district: 0,
        ward: 0,
        email: '',
        phone: '',
        delivery: {
            type: 1,
            freight: 0,
        },
        paymentType: 1,
    });

    const handleNext = (data: Partial<CheckoutFormData>) => {
        setFormData({ ...formData, ...data });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        navigate('/cart/checkout/confirm');
    };

    const [discount, setDiscount] = useState<number>(0);
    const [freight, setFreight] = useState<number>(0);
    const [total, setTotal] = useState<number>(cartTotal + freight - discount);
    useEffect(() => {
        setTotal(cartTotal + freight - discount);
    }, [discount, freight, total, cartTotal]);

    return (
        <div className="checkoutsite__wrapper flex justify-between h-screen container mx-auto text-sub">
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
                <form onSubmit={handleSubmit}>
                    {step === 1 && <Step1 onNext={handleNext} formData={formData} />}
                    {step === 2 && <Step2 setFormData={setFormData} onBack={handleBack} formData={formData} />}
                </form>
            </div>
            <div className="checkout__sidebar basis-[45%] border-l border-ws-gray text-left px-6 pt-6">
                <div className="checkout__center">
                    <h2 className="font-bold text-xl">Trung tâm</h2>
                    <div className="checkout__center--details flex mt-3 mb-6">
                        <div className="checkout__center--thumbnail rounded-2xl overflow-hidden">
                            <img className="max-h-[145px] max-w-[200px]" src={Placeholder} alt="" />
                        </div>
                        <div className="checkout__center--info ml-6 flex-grow">
                            <h1 className="text-xl font-bold pt-4">The Clean House</h1> {/* center.title */}
                            <h3 className="text-sm mt-1">518 Lê Văn Sỹ, Phường 14, Quận 3, TP. HCM</h3>{' '}
                            {/* center.address */}
                            <h3 className="text-sm mt-1">
                                <FaRegClock className="inline-block" />
                                <span className="ml-1 inline-block align-middle">08:00 - 21:00</span>
                            </h3>{' '}
                            {/* center.operationHour */}
                            <h1 className="text-sm mt-1">
                                <FaPhoneAlt className="inline-block" />
                                <span className="ml-1 inline-block align-middle">0975926021</span>
                            </h1>{' '}
                            {/* center.phone */}
                        </div>
                    </div>
                    <hr className="border-wh-gray" />
                    <div className="checkout__order py-6">
                        <h2 className="font-bold text-xl">Chi tiết đơn hàng</h2>
                        <div className="checkout__order--details mt-5">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div className="checkout__order--item py-3 flex gap-4 border-b border-wh-gray">
                                        <div className="checkout__order--item order__item--thumb flex-shrink rounded-2xl overflow-hidden">
                                            <img className="max-h-[120px]" src={Placeholder} alt="" />
                                        </div>
                                        <div className="checkout__order--item order__item--info flex flex-col">
                                            <input type="hidden" value={item.id} name="cart__item-id" />
                                            <h3 className="font-bold text-xl mt-3">{item.name}</h3>
                                            <h4 className="text-sm flex-grow mt-2">
                                                Chi tiết: {item.quantity ?? item.weight} {item.unit === 'kg' ?? ''}
                                            </h4>
                                            <h4 className="text-2xl font-bold mb-1">{item.price}đ</h4>
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
                                    {cartTotal}đ
                                </div>
                                <div className="checkout__summary--header col-span-1 text-sm">Mã giảm giá</div>
                                <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                    {discount}đ
                                </div>
                                <div className="checkout__summary--header col-span-1 text-sm">Phí ship</div>
                                <div className="checkout__order--subtotal col-span-1 text-xl text-right font-semibold">
                                    {freight}đ
                                </div>
                                <hr className="col-span-2 border-wh-gray mt-2" />
                                <div className="checkout__summary--header col-span-1 font-semibold pt-1">Tổng cộng</div>
                                <div className="checkout__order--subtotal col-span-1 text-2xl text-right text-primary font-semibold">
                                    {total}đ
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
