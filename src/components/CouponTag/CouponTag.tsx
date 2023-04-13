import React from 'react';
import './CouponTag.scss';
import { Tooltip } from 'antd';
import { formatPercentage } from '../../utils/FormatUtils';

type Props = {
    content: string;
    discountValue?: number;
    primary?: boolean;
};

const CouponTag = ({ content, primary, discountValue }: Props) => {
    return discountValue ? (
        <Tooltip title={`Giảm ${formatPercentage(discountValue)}`}>
            <div className={`coupon__tag ${primary ? 'coupon__tag--primary' : ''}`}>{content}</div>
        </Tooltip>
    ) : (
        <div className={`coupon__tag ${primary ? 'coupon__tag--primary' : ''}`}>{content}</div>
    );
};

export default CouponTag;
