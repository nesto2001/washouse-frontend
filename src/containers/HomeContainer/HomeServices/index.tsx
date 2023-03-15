import React, { useEffect, useState } from 'react';
import Carousel from '../../../components/Carousel';
import ServiceCard from '../../../components/ServiceCard';
import Placeholder from '../../../assets/images/placeholder.png';
import { CardData } from '../../../types/CardData';
import LogoText from '../../../assets/images/washouse-textonly.png';
import { getAllCenter } from '../../../repositories/CenterRepository';

const HomeServices = () => {
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
                <div className="service__slider--wrapper mx-40">
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
    );
};

export default HomeServices;
