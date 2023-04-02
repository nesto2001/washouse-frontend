import { useState, useEffect } from 'react';

import Partnership from '../../assets/images/partnership.png';
import VectorBG from '../../assets/images/vector-bg.png';
import Banner from '../../assets/images/washouse-banner.png';
import WHButton from '../../components/Button';
import Loading from '../../components/Loading/Loading';
import HomeBlogs from '../../containers/HomeContainer/HomeBlogs';
import HomeFeatures from '../../containers/HomeContainer/HomeFeatures';
import HomeGuide from '../../containers/HomeContainer/HomeGuide';
import HomeServices from '../../containers/HomeContainer/HomeServices';
import './Homepage.scss';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const hasVisited = sessionStorage.getItem('hasVisited');

    useEffect(() => {
        if (!hasVisited) {
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('hasVisited', JSON.stringify(true));
            }, 2000);
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loading screen />;
    }
    return (
        <>
            <div id="hero" className="homepage__section h-[768px] w-full">
                <div className="hero__wrapper relative h-full">
                    <div className="w-full h-full">
                        <img className="absolute max-h-[600px] z-10 right-8 bottom-16" src={Banner} alt="" />
                        <img className="absolute right-0" src={VectorBG} alt="" />
                        <div className="hero__content container mx-auto h-full px-4 flex flex-col items-start justify-center">
                            <div className="hero__content--subtitle uppercase text-5xl font-bold mb-3 text-sub">
                                Nền tảng
                            </div>
                            <div className="hero__content--title uppercase text-7xl font-bold text-left text-primary">
                                Cung ứng giải pháp
                                <br />
                                dịch vụ giặt ủi
                            </div>
                            <div className="hero__content--action mt-10">
                                <WHButton type="primary" uppercase fontSize="24px" link="/trung-tâm">
                                    Đặt dịch vụ ngay
                                </WHButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage__section w-full container mx-auto pt-32 h-[768px]" id="service">
                <HomeServices />
            </div>
            <div className="homepage__section w-full container mx-auto pt-32 h-[768px]" id="features">
                <HomeFeatures />
            </div>
            <div className="homepage__section w-full container mx-auto pt-32 mb-9" id="guide">
                <HomeGuide />
            </div>
            <div className="homepage__section w-full container mx-auto pt-32 h-[768px]" id="partnership">
                <div className="partnership__wrapper h-full">
                    <div className="homepage__section--content w-full h-full flex justify-center items-start">
                        <div className="partnership__inner w-[77%] flex items-center mx-auto px-12 py-[75px] gap-12 rounded-2xl">
                            <div className="partnership__content basis-3/5">
                                <div className="partnership__content--title w-2/3 text-left font-extrabold text-4xl">
                                    Trở thành đối tác của Washouse!
                                </div>
                                <div className="partnership__content--title mt-9 text-justify text-xl">
                                    Washouse cung cấp công cụ quản lý đơn hàng cho các đối tác của nền tảng cung ứng
                                    giải pháp dịch vụ giặt ủi. <br /> <br />
                                    Washouse luôn sẵn sàng hợp tác với các tiệm, các trung tâm dịch vụ giặt ủi,... để mở
                                    rộng kinh doanh cũng như gia tăng khách hàng. Hãy kết nối vào hệ thống đặt và giao
                                    hàng để giảm bớt chi phí quản lý, vận hành, marketing, công nghệ.
                                </div>
                                <div className="partnership__content--action mt-9 text-left">
                                    <WHButton type="primary" fontSize="20px" link="/provider/register">
                                        <div className="py-3 px-6">Tham gia ngay</div>
                                    </WHButton>
                                </div>
                            </div>
                            <div className="partnership__decoration basis-2/5 align-middle">
                                <img src={Partnership} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage__section w-full container mx-auto pt-32" id="blogs">
                <HomeBlogs />
            </div>
        </>
    );
};

export default HomePage;
