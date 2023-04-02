import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyCart from '../../assets/images/empty-cart.png';
import Placeholder from '../../assets/images/placeholder.png';
import WHButton from '../../components/Button';
import StatusTag from '../../components/StatusTag';
import { CenterModel } from '../../models/Center/CenterModel';
import { removeItem } from '../../reducers/CartReducer';
import { getCenterBrief } from '../../repositories/CenterRepository';
import { RootState } from '../../store/CartStore';
import { formatCurrency, formatLink } from '../../utils/FormatUtils';
import { compareTime, getToday } from '../../utils/TimeUtils';

type Props = {};

const CartContainer = () => {
    const [center, setCenter] = useState<CenterModel>();
    const [status, setStatus] = useState<boolean>(false);
    const [isBreakDay, setIsBreakDay] = useState<boolean>(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);
    const cartCenterId = useSelector((state: RootState) => state.cart.centerId);

    const today = getToday();

    const dispatch = useDispatch();

    const handleRemoveFromCart = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const itemId = (event.target as HTMLDivElement).getAttribute('data-id');
        if (itemId) {
            try {
                dispatch(removeItem(parseInt(itemId)));
                console.log('Đã xóa khỏi giỏ hàng!');
            } catch (error) {
                console.error('Không thể xóa khỏi giỏ hàng:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            return await getCenterBrief(cartCenterId);
        };
        fetchData().then((res) => {
            setCenter(res);
            if (res) {
                const opening: string = res.centerOperatingHours[today]?.start ?? '';
                const closing: string = res.centerOperatingHours[today]?.end ?? '';
                if (opening && closing) {
                    setStatus(compareTime(opening, closing));
                    setIsBreakDay(false);
                } else {
                    setStatus(false);
                    setIsBreakDay(true);
                }
            }
        });
    }, [cartCenterId]);

    return (
        <div className="sitecart__wrapper flex justify-between gap-[40px] mt-9">
            {cartItems.length > 0 ? (
                <>
                    <div className="sitecart--cart basis-2/3">
                        <div className="sitecart text-left border border-wh-gray rounded-2xl p-6">
                            <h2 className="font-bold text-xl">Giỏ hàng của bạn ({cartQuantity}): </h2>
                            <div className="sitecart--itemslist flex flex-col gap-4 mt-6">
                                {cartItems.map((item, index) => (
                                    <div
                                        key={`cartitem-${index}`}
                                        className="sitecart--item flex justify-between items-center p-3 gap-4 border border-wh-gray rounded-2xl"
                                        id={item.id.toString()}
                                    >
                                        <div className="sitecart__item--thumbnail rounded overflow-hidden">
                                            <img className="max-h-[120px]" src={item.thumbnail ?? Placeholder} alt="" />
                                        </div>
                                        <div className="sitecart__item--content pt-2 flex-grow">
                                            <h2 className="sitecart__item--title text-xl font-bold">{item.name}</h2>
                                            <h3 className="sitecart__item--details mt-2">
                                                Chi tiết: {item.weight || item.quantity} {item.unit ?? ''}
                                            </h3>
                                            <h1 className="sitecart__item--price text-2xl font-bold text-primary mt-1">
                                                {formatCurrency(item.price ?? 0)}
                                            </h1>
                                        </div>
                                        <div
                                            className="sitecart__item--action self-start text-red pt-2 pr-2 cursor-pointer"
                                            data-id={item.id.toString()}
                                            onClick={(e) => handleRemoveFromCart(e)}
                                        >
                                            <FaTrashAlt className="pointer-events-none" size={24} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="sitecart__sideinfo basis-1/3">
                        <div className="sitecart__sideinfo--rating p-6 border border-[#B3B3B3] rounded-2xl">
                            <h2 className="text-left font-bold text-2xl mb-3">Thông tin đơn hàng</h2>
                            <hr />
                            <div className="sitecart__total flex justify-between my-4">
                                <h4>Tổng tiền</h4>
                                <h3 className="font-semibold text-xl text-primary">{formatCurrency(cartTotal)}</h3>
                            </div>
                            <hr />
                            <ul className="mt-4 list-disc text-xs text-left list-inside pl-2 mb-8">
                                <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                                <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
                            </ul>
                            <WHButton type="primary" minWidth="330px" link="/cart/checkout">
                                Thanh toán
                            </WHButton>
                        </div>
                        <div className="sitecart__sideinfo--center mt-6 p-6 border border-[#B3B3B3] rounded-2xl">
                            <div className="flex justify-between items-end">
                                <h2 className="text-left font-bold text-2xl">Trung tâm</h2>
                                <h4 className="text-base font-medium text-primary cursor-pointer">
                                    <Link to={`/trung-tâm/${formatLink(center?.title ?? ' ')}-c.${center?.id}`}>
                                        Chi tiết
                                    </Link>
                                </h4>
                            </div>
                            <div className="sitecart__center--wrapper  text-left mt-3">
                                <div className="sitecart__center--thumbnail rounded-lg overflow-hidden">
                                    <img
                                        className="max-h-[200px] w-full object-cover object-center"
                                        src={center?.thumbnail ?? Placeholder}
                                        alt=""
                                    />
                                </div>
                                <h2 className="font-bold text-base mt-2">{center?.title}</h2>
                                <h3 className="text-sm text-bold text-sub-gray">{center?.address}</h3>
                                <div className="flex justify-between mt-1">
                                    <h3 className="text-sm flex items-center">
                                        {center?.centerOperatingHours[today].start &&
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
                                    </h3>
                                    <h3 className="text-sm">
                                        <FaPhoneAlt className="inline-block mr-2" />
                                        0975926021
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="sitecart--cartempty w-full flex flex-col items-center justify-start mt-10 mb-32">
                        <div className="cartempty__pic opacity-70">
                            <img className="max-w-[420px]" src={EmptyCart} alt="empty-cart" />
                        </div>
                        <h1 className="font-bold text-3xl mt-10 text-sub mb-6">Giỏ hàng của bạn hiện đang trống.</h1>
                        <WHButton type="primary" fontSize="24px" link="/trung-tâm">
                            Đặt dịch vụ ngay
                        </WHButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartContainer;
