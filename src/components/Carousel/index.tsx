import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React from 'react';
import './Carousel.scss';

type Props = {
    items: React.ReactNode[];
    showItem?: number;
};

const Carousel = ({ items, showItem }: Props) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: showItem || 4,
        slidesToScroll: showItem || 4,
        arrow: true,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {items.map((item, index) => {
                    return (
                        <div className="slider-item my-5 ml-4" key={index}>
                            {item}
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Carousel;
