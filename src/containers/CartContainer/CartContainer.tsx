import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/CartStore';
import Placeholder from '../../assets/images/placeholder.png';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import Button from '../../components/Button';

type Props = {};

const CartContainer = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);

    return (
        <div className="sitecart__wrapper flex justify-between gap-[40px] mt-9">
            <div className="sitecart text-left border border-wh-gray rounded-2xl p-6 basis-2/3">
                <h2 className="font-bold text-xl">Giỏ hàng của bạn ({cartQuantity}): </h2>
                <div className="sitecart--itemslist flex flex-col gap-4 mt-6">
                    {cartItems.map((item) => (
                        <div
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
                                    {item.price}đ
                                </h1>
                            </div>
                            <div className="sitecart__item--action self-start text-red pt-2 pr-2">
                                <FaTrashAlt size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sitecart__sideinfo basis-1/3">
                <div className="sitecart__sideinfo--rating p-6 border border-[#B3B3B3] rounded-2xl">
                    <h2 className="text-left font-bold text-2xl mb-3">Thông tin đơn hàng</h2>
                    <hr />
                    <div className="sitecart__total flex justify-between my-4">
                        <h4>Tổng tiền</h4>
                        <h3 className="font-semibold text-xl text-primary">{cartTotal}đ</h3>
                    </div>
                    <hr />
                    <ul className="mt-4 list-disc text-xs text-left list-inside pl-2 mb-8">
                        <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                        <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
                    </ul>
                    <Button type="primary" minWidth="330px" link="/checkout">
                        Thanh toán
                    </Button>
                </div>
                <div className="service__sideinfo--center mt-6 p-6 border border-[#B3B3B3] rounded-2xl"></div>
            </div>
        </div>
    );
};

export default CartContainer;
