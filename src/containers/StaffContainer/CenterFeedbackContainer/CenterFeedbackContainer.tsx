import * as React from 'react';
import { useState, useEffect } from 'react';
import { CenterFeedbackModel } from '../../../models/Staff/StaffFeedback/CenterFeedbackModel';
import { getCenterFeedbacks } from '../../../repositories/StaffRepository';
import FeedbackList from '../../../components/FeedbackList/FeedbackList';

type Props = {};

const CenterFeedbackContainer = (props: Props) => {
    const [feedbacks, setFeedbacks] = useState<CenterFeedbackModel[]>();

    useEffect(() => {
        getCenterFeedbacks().then((res) => {
            setFeedbacks(res);
        });
    }, []);

    return (
        <div>
            <div className="">{feedbacks && <FeedbackList feedbacks={feedbacks} />}</div>
        </div>
    );
};

export default CenterFeedbackContainer;
