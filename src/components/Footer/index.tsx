import React from 'react';
import LogoFull from '../../assets/images/washouse-tagline.png';

type Props = {};

const Footer = (props: Props) => {
    return (
        <div className="w-full" id="footer">
            <div className="footer__inner container mx-auto max-w-[1186px] gap-32 flex pt-9 mb-14">
                <div className="footer__logo basis-1/3 text-left text-xl font-bold">
                    <img src={LogoFull} alt="" />
                    Nền tảng cung ứng giải pháp dịch vụ giặt ủi Washouse
                </div>
                <div className="footer__about basis-1/3 ml-1 text-left">
                    <div className="footer__about--title font-bold text-xl">Về Washouse</div>
                    <div className="footer__about--links mt-6">
                        <ul className="list-none">
                            <li className="list-none mt-5">Giới thiệu</li>
                            <li className="list-none mt-5">Đối tác</li>
                            <li className="list-none mt-5">Điều khoản sử dụng</li>
                            <li className="list-none mt-5">Chính sách bảo mật</li>
                        </ul>
                    </div>
                </div>
                <div className="footer__services basis-1/3 ml-1 text-left">
                    <div className="footer__services--title font-bold text-xl">Dịch vụ</div>
                    <div className="footer__services--links mt-6">
                        <ul className="list-none">
                            <li className="list-none mt-5">Giặt gấp</li>
                            <li className="list-none mt-5">Giặt hấp</li>
                            <li className="list-none mt-5">Loại bỏ vết bẩn</li>
                            <li className="list-none mt-5">Giặt giao - nhận</li>
                            <li className="list-none mt-5">Giặt ga trải giường</li>
                            <li className="list-none mt-5">Giặt thảm</li>
                            <li className="list-none mt-5">Giặt ghế sofa, nội thất</li>
                            <li className="list-none mt-5">Giặt rèm</li>
                            <li className="list-none mt-5">Giặt nệm</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="mt-1 container mx-auto max-w-[1186px]" />
            <div className="footer__credit container mx-auto max-w-[1186px] text-left py-5">&copy; 2023 Washouse</div>
        </div>
    );
};

export default Footer;
