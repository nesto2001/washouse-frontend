import React from 'react';
import './CouponTag.scss';

type Props = {
    content: string;
    primary?: boolean;
};

const CouponTag = ({ content, primary }: Props) => {
    return <div className={`coupon__tag ${primary ? 'coupon__tag--primary' : ''}`}>{content}</div>;
};

export default CouponTag;
