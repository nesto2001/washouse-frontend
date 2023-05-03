import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoFull from '../../assets/images/washouse-tagline.png';
import { ServiceCategoryDetailModel } from '../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories } from '../../repositories/ServiceCategoryRepository';

const Footer = () => {
    const [services, setServices] = useState<ServiceCategoryDetailModel[]>();

    useEffect(() => {
        getServiceCategories().then((res) => {
            setServices(res);
        });
    }, []);

    return (
        <>
            {services && (
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
                                <ul className="list-none flex flex-col gap-5">
                                    {services.map((service) => (
                                        <Link
                                            to={'/trung-tam'}
                                            state={{ categoryId: service.categoryId }}
                                            className="list-none hover:text-primary hover:font-bold"
                                        >
                                            {service.categoryName}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-1 container mx-auto max-w-[1186px]" />
                    <div className="footer__credit container mx-auto max-w-[1186px] text-left py-5">
                        &copy; 2023 Washouse
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
