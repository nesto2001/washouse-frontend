import VectorBG from '../../assets/images/vector-bg.png';
import Banner from '../../assets/images/washouse-banner.png';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import ServiceCard from '../../components/ServiceCard';
import Placeholder from '../../assets/images/placeholder.png';
import LogoText from '../../assets/images/washouse-textonly.png';
import { CardData } from '../../types/CardData';

const HomePage = () => {
    const cards: CardData[] = [
        {
            id: 1,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 2,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 3,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 4,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 5,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 6,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 7,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
        {
            id: 8,
            thumbnail: Placeholder,
            title: 'Giặt & Gấp',
            description: 'Dịch vu cơ bản bao gồm việc giặt, sấy khô và gấp quần áo.',
        },
    ];

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
                                <Button type="primary" uppercase fontSize="24px">
                                    Đặt dịch vụ ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage__section w-full container mx-auto pt-32 h-[768px]" id="service">
                <div className="service__wrapper h-full">
                    <div className="homepage__section--title flex flex-col items-center mb-10">
                        <div className="service__title font-bold text-4xl text-sub mb-3">
                            CÁC LOẠI HÌNH DỊCH VỤ GIẶT ỦI CÓ MẶT TRÊN
                        </div>
                        <div className="service__title--logo w-1/3 max-w-[303px] h-[44px] overflow-hidden">
                            <img className="object-cover" src={LogoText} alt="" />
                        </div>
                    </div>
                    <div className="homepage__section--content">
                        <div className="service__slider-wrapper mx-40">
                            <Carousel
                                items={cards.map((card) => {
                                    return (
                                        <ServiceCard
                                            id={card.id}
                                            description={card.description}
                                            thumbnail={card.thumbnail}
                                            title={card.title}
                                        ></ServiceCard>
                                    );
                                })}
                            ></Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
