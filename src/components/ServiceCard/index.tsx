import clsx from 'clsx';
import { CardData } from '../../types/CardData';
import { formatCurrency } from '../../utils/FormatUtils';
import Button from '../Button';
import './ServiceCard.scss';
import Placeholder from '../../assets/images/placeholder.png';

const ServiceCard = ({
    thumbnail,
    title,
    description,
    action,
    actionContent,
    actionType,
    minHeight,
    cardHeight,
    actionLink,
    price,
}: CardData) => {
    const style = {
        minHeight: minHeight || '135px',
    };
    const cardStyle = {
        maxHeight: cardHeight || '380px',
        height: cardHeight || '380px',
    };
    return (
        <div
            className={clsx(
                'servicecard flex flex-col max-w-[265px] md:min-w-[240px] p-5 rounded-2xl mx-2',
                cardStyle ? '' : ' h-[380px] max-h-[380px]',
            )}
            style={cardStyle}
        >
            <img
                className="rounded md:min-h-[126px] md:max-h-[126px] max-w-[200px] object-cover object-center"
                src={thumbnail ?? Placeholder}
                alt={title}
            />
            <h3 className="font-bold text-xl w-full pt-2 text-left">{title}</h3>
            <h3 className={'font-bold text-xl w-full pt-2 text-primary text-left'}>{formatCurrency(price ?? 0)}</h3>
            <p className={clsx('flex-grow text-justify w-full mt-4')} style={style}>
                {description}
            </p>
            {action && (
                <Button type={actionType} link={actionLink}>
                    {actionContent}
                </Button>
            )}
        </div>
    );
};

export default ServiceCard;
