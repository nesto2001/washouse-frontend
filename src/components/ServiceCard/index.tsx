import React from 'react';

type Props = {
    thumbnail: string;
    title: string;
    description: string;
};

const ServiceCard = ({ thumbnail, title, description }: Props) => {
    return (
        <div>
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ServiceCard;
