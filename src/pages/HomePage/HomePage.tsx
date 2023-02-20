import VectorBG from '../../assets/images/vector-bg.png';
import Banner from '../../assets/images/washouse-banner.png';
import Button from '../../components/Button';

const HomePage = () => {
    return (
        <>
            <div id="hero" className="w-full">
                <div className="hero__wrapper relative h-[768px]">
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
                                <Button type="primary" uppercase fontSize="24px">
                                    Đặt dịch vụ ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full container mx-auto px-4" id="service">
                <div className="h-[768px]"></div>
            </div>
        </>
    );
};

export default HomePage;
