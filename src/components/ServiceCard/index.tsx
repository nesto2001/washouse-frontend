import clsx from 'clsx';
import { formatCurrency } from '../../utils/FormatUtils';
import Button from '../Button';
import './ServiceCard.scss';
import Placeholder from '../../assets/images/placeholder.png';
import { Tooltip } from 'antd';
import { CardData } from '../../types/CardData';

type ServiceData = {
    centerId: number;
    serviceId: number;
};

type ServiceCardProps = {
    cardData: CardData;
    serviceData?: ServiceData;
};

const ServiceCard = ({ cardData, serviceData }: ServiceCardProps) => {
    const style = {
        minHeight: cardData.minHeight || '135px',
    };
    const cardStyle = {
        maxHeight: cardData.cardHeight || '380px',
        height: cardData.cardHeight || '380px',
    };
    return (
        <div
            key={`card-${cardData.id}`}
            className={clsx(
                'servicecard flex flex-col max-w-[265px] md:min-w-[240px] p-5 rounded-2xl mx-2',
                cardStyle ? '' : ' h-[380px] max-h-[380px]',
            )}
            style={cardStyle}
        >
            <img
                className="rounded md:min-h-[126px] md:max-h-[126px] w-full object-cover object-center"
                src={cardData.thumbnail ?? Placeholder}
                alt={cardData.title}
            />
            <Tooltip title={cardData.title}>
                <h3 className="font-bold text-lg mt-4 w-full pt-2 text-left md:min-h-[36px] text-ellipsis line-clamp-1">
                    {cardData.title}
                </h3>
            </Tooltip>
            {cardData.price && (
                <h3 className={'font-bold text-xl w-full pt-2 text-primary text-left'}>
                    {cardData.price
                        ? formatCurrency(cardData.price)
                        : cardData.minPrice
                        ? 'Từ ' + formatCurrency(cardData.minPrice)
                        : formatCurrency(0)}
                </h3>
            )}
            <p className={clsx('flex-grow text-justify w-full mt-4')} style={style}>
                {cardData.description}
            </p>
            {cardData.action && (
                <Button
                    type={cardData.actionType}
                    link={cardData.actionLink}
                    state={
                        serviceData ? { centerId: serviceData.centerId, serviceId: serviceData.serviceId } : undefined
                    }
                >
                    {cardData.actionContent}
                </Button>
            )}
        </div>
    );
};

export default ServiceCard;
