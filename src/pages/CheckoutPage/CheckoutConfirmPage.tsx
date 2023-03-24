import clsx from 'clsx';
import style from './Checkout.module.scss';
import Logo from '../../assets/images/washouse-tagline.png';
import Successful from '../../assets/images/check.png';
import WHButton from '../../components/Button';

const CheckoutConfirmPage = () => {
    const id = '31401263';
    const p = '0975926021';
    return (
        <>
            <div className={style.modal_overlay}></div>
            <div className="checkout__confirm--modal relative h-screen">
                <div
                    className={clsx(
                        style.confirm__modal_wrapper,
                        'bg-white absolute w-3/4 min-h-[75%] h-3/4 top-0 bottom-0 left-0 right-0 my-auto mx-auto rounded-2xl p-10 flex flex-col items-center',
                    )}
                >
                    <div className="confirm__modal--logonav w-1/3 max-w-[320px] -mb-3">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="checkout__confirm--status w-1/3">
                        <img src={Successful} alt="" />
                    </div>
                    <h2 className="font-semibold text-3xl text-primary">Đơn hàng của bạn đã được đặt thành công!</h2>
                    <h3 className="font-semibold text-2xl text-sub mt-2">Mã đơn hàng: {id}</h3>
                    <p className="text-xl text-sub mt-3 w-3/5 max-w-[434px] ">
                        Chúng tôi sẽ gửi xác nhận đặt hàng thành công cùng với thông tin đơn hàng qua email.
                    </p>
                    <div className="checkout__confirm--action mt-16 flex gap-10">
                        <WHButton type="sub" link="/" fontSize="20px" minWidth="224px">
                            Trang chủ
                        </WHButton>
                        <WHButton
                            type="primary"
                            link={`/orders/details?id=${id}&p=${p}`}
                            fontSize="20px"
                            minWidth="224px"
                        >
                            Thông tin đơn hàng
                        </WHButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutConfirmPage;
