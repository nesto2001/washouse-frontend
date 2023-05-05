import { DeliveryPriceType } from '../../types/Price/DeliveryPriceType';
import { formatCurrency } from '../../utils/FormatUtils';
import style from '../PriceTable/PriceTable.module.scss';

type Props = {
    priceChart: DeliveryPriceType[];
    unitType: string;
    isTooltip?: boolean;
};

const DeliveryPriceChart = ({ priceChart, unitType, isTooltip }: Props) => {
    return (
        <div className={style.pricetable__wrapper}>
            <table className={style.pricetable}>
                <thead className={isTooltip ? style.pricetable_tooltip__header : style.pricetable__header}>
                    <tr>
                        <th className={style.pricetable__data}>Khối lượng</th>
                        <th className={style.pricetable__data}>Khoảng cách</th>
                        <th className={style.pricetable__data}>Giá tiền</th>
                    </tr>
                </thead>
                <tbody className={style.pricetable__body}>
                    {priceChart.map((range, index) => (
                        <tr key={`range-${index}`} className={style.pricetable__body__row}>
                            <td className={style.pricetable__data}>
                                Dưới {range.maxWeight} {unitType}
                            </td>
                            <td className={style.pricetable__data}>Dưới {range.maxDistance} km</td>
                            <td className={style.pricetable__data}>{formatCurrency(range.price)}/kg</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryPriceChart;
