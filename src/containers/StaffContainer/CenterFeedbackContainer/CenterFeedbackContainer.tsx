import * as React from 'react';
import { useState, useEffect } from 'react';
import { CenterFeedbackModel } from '../../../models/Staff/StaffFeedback/CenterFeedbackModel';
import { getCenterFeedbacks } from '../../../repositories/StaffRepository';
import FeedbackList from '../../../components/FeedbackList/FeedbackList';
import { message } from 'antd';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';

type Props = {};

const CenterFeedbackContainer = (props: Props) => {
    const [feedbacks, setFeedbacks] = useState<CenterFeedbackModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCenterFeedbacks()
            .then((res) => {
                setFeedbacks(res);
                setIsLoading(false);
            })
            .catch(() => {
                setFeedbacks([]);
                message.error('Không tìm thấy đánh giá nào, vui lòng thử lại sau.');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <OthersSpin />;
    }

    return (
        <div>
            <div className="">{feedbacks && <FeedbackList feedbacks={feedbacks} />}</div>
        </div>
    );
};

export default CenterFeedbackContainer;
