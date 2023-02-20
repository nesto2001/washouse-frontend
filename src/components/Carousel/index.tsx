import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import React from 'react';
import Card from '../ServiceCard';

type CardData = {
    thumbnail: string;
    title: string;
    description: string;
};

type Props = {
    children: React.ReactNode;
};

const Carousel = ({ children }: Props) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {React.Children.map(children, (child) => {
                    return (
                        <div className="slider-item">
                            {React.cloneElement(child as React.ReactElement<any>, {
                                className: 'card',
                            })}
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Carousel;
