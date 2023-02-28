import React from 'react';
import { PriceRange } from '../../types/PriceRange';
import style from './PriceTable.module.scss';

type Props = {
    priceChart: PriceRange[];
    unitType: string;
};

const PriceTable = ({ priceChart, unitType }: Props) => {
    return (
        <div className={style.pricetable__wrapper}>
            <table className={style.pricetable}>
                <thead className={style.pricetable__header}>
                    <tr>
                        <th className={style.pricetable__data}>Khối lượng</th>
                        <th className={style.pricetable__data}>Giá tiền</th>
                    </tr>
                </thead>
                <tbody className={style.pricetable__body}>
                    {priceChart.map((range) => (
                        <tr className={style.pricetable__body__row}>
                            <td className={style.pricetable__data}>
                                Dưới {range.maxValue} {unitType}
                            </td>
                            <td className={style.pricetable__data}>{range.price}đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
