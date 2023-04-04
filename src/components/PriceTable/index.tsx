import React from 'react';
import { PriceRange } from '../../types/PriceRange';
import { formatCurrency } from '../../utils/FormatUtils';
import style from './PriceTable.module.scss';

type Props = {
    priceChart: PriceRange[];
    unitType: string;
    isTooltip?: boolean;
};

const PriceTable = ({ priceChart, unitType, isTooltip }: Props) => {
    return (
        <div className={style.pricetable__wrapper}>
            <table className={style.pricetable}>
                <thead className={isTooltip ? style.pricetable_tooltip__header : style.pricetable__header}>
                    <tr>
                        <th className={style.pricetable__data}>Khối lượng</th>
                        <th className={style.pricetable__data}>Giá tiền</th>
                    </tr>
                </thead>
                <tbody className={style.pricetable__body}>
                    {priceChart.map((range, index) => (
                        <tr key={`range-${index}`} className={style.pricetable__body__row}>
                            <td className={style.pricetable__data}>
                                Dưới {range.maxValue} {unitType}
                            </td>
                            <td className={style.pricetable__data}>{formatCurrency(range.price)}/kg</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
