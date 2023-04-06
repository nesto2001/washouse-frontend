import React from 'react';
import './CouponTag.scss';

type Props = {
    discountValue: string;
};

const CouponTag = ({ discountValue }: Props) => {
    return <div className="coupon__tag">Giảm {discountValue}</div>;
};

export default CouponTag;
