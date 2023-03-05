import React from 'react';
import Background from '../../assets/images/vector-bg-1.png';
import LoginBanner from '../../assets/images/login-banner.png';
import Logo from '../../assets/images/washouse-tagline.png';

type Props = {};

const LoginPage = () => {
    return (
        <>
            <div className="login__banner absolute left-0 h-screen w-full">
                <div className="login__banner--background max-h-[929px] h-full w-2/3">
                    <img className="h-full" src={Background} alt="" />
                </div>
                <div className="login__banner--decoration absolute z-10 top-1/4 translate-y-10 left-32 my-auto w-1/3 max-w-[622px]">
                    <img className="" src={LoginBanner} alt="" />
                </div>
                <div className="login__banner--text absolute z-10 top-20 left-24 text-white">
                    <h1 className="text-4xl capitalize font-bold -translate-x-0.5">Nhanh chóng và tiện lợi</h1>
                    <h3 className="text-2xl mt-3 font-semibold translate-x-12 w-2/3 text-left">
                        Dễ dàng hơn cho cuộc sống nhộn nhịp của bạn.
                    </h3>
                </div>
            </div>
            <div className="login__form h-screen text-left basis-2/5 flex flex-col justify-center px-5 text-sub">
                <div className="site__logo w-1/3 min-w-[285px] -mb-3">
                    <img src={Logo} alt="" />
                </div>
                <h1 className="font-bold text-4xl mt-9">Đăng nhập</h1>
                <h2 className="text-xl font-semibold mt-1">Chào mừng bạn đã quay trở lại!</h2>
            </div>
        </>
    );
};

export default LoginPage;
