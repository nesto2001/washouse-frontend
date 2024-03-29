import * as React from 'react';
import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import clsx from 'clsx';
import style from './Checkout.module.scss';
import Logo from '../../assets/images/washouse-tagline.png';
import Successful from '../../assets/images/check.png';
import WHButton from '../../components/Button';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const CheckoutConfirmPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const location = useLocation();
    const id = location.state?.orderId;
    const p = location.state?.customerPhone;
    const e = location.state?.customerEmail;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        if (id && p && e) {
            setIsLoading(false);
        } else setIsLoading(true);
    }, [id, p, e]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className={style.modal_overlay}></div>
            <div className="checkout__confirm--modal relative h-screen">
                <div
                    className={clsx(
                        style.confirm__modal_wrapper,
                        'bg-white absolute w-3/4 min-h-[78%] h-3/4 top-0 bottom-0 left-0 right-0 my-auto mx-auto rounded-2xl p-10 flex flex-col items-center',
                    )}
                >
                    <div className="confirm__modal--logonav w-1/3 max-w-[320px] -mb-3">
                        <img className="min-h-[92.67px]" src={Logo} alt="" />
                    </div>
                    <div className="checkout__confirm--status w-1/3">
                        <Spin indicator={antIcon} spinning={imgLoading} className="min-h-[275px]">
                            <img
                                className="min-h-[275px]"
                                src={Successful}
                                alt=""
                                onLoad={() =>
                                    setTimeout(() => {
                                        setImgLoading(false);
                                    }, 1)
                                }
                            />
                        </Spin>
                    </div>
                    <h2 className="font-semibold text-3xl text-primary">Đơn hàng của bạn đã được đặt thành công!</h2>
                    <h3 className="font-semibold text-2xl text-sub mt-2">Mã đơn hàng: {id}</h3>
                    <p className="text-xl text-sub mt-3 w-3/5 max-w-[434px] ">
                        Chúng tôi sẽ gửi xác nhận đặt hàng thành công cùng với thông tin đơn hàng qua email: {e}.
                    </p>
                    <div className="checkout__confirm--action mt-14 flex gap-10">
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
