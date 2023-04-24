import React from 'react';
import { AdminCenterFeedbackModel } from '../../models/Admin/AdminCenterDetails/AdminCenterFeedbackModel';
import RatingStars from '../RatingStars/RatingStars';
import Table, { ColumnsType } from 'antd/es/table';

type Props = {
    centerFeedbacks: AdminCenterFeedbackModel[];
};

const AdminCenterDetailsFeedback = ({ centerFeedbacks }: Props) => {
    const columns: ColumnsType<AdminCenterFeedbackModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: 50,
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Nhận xét',
            dataIndex: 'feedback',
            key: 'feedback',
            width: 330,
            render: (_, record) => (
                <div className="center__feedback">
                    <div className="center__feedback--review flex gap-4">
                        <div className="center__feedback--reviewer font-bold">{record.createdBy}</div>
                        <div className="center__feedback--date font-medium text-sub-gray">
                            {record.createdDate.format('DD-MM-YYYY HH:mm')}
                        </div>
                    </div>
                    <div className="center__feedback--content mt-1">{record.content}</div>
                </div>
            ),
        },

        {
            title: 'Đánh giá',
            key: 'rating',
            dataIndex: 'rating',
            align: 'center',
            width: 204,
            render: (rating: number) => (
                <div className="flex justify-center">
                    <span className="mr-3 text-xl font-bold">{rating.toFixed(1)}</span>
                    <RatingStars rating={rating} />
                </div>
            ),
        },
        {
            title: 'Trả lời',
            dataIndex: 'reply',
            key: 'reply',
            width: 330,
            render: (_, record) =>
                record.replyMessage ? (
                    <div className="center__feedback">
                        <div className="center__feedback--review flex gap-4">
                            <div className="center__feedback--reviewer font-bold">{record.replyBy}</div>
                            <div className="center__feedback--date font-medium text-sub-gray">
                                {record.replyDate.format('DD-MM-YYYY HH:mm')}
                            </div>
                        </div>
                        <div className="center__feedback--content mt-1">{record.replyMessage}</div>
                    </div>
                ) : (
                    '-'
                ),
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={centerFeedbacks.sort((a, b) => (b.createdDate.isAfter(a.createdDate) ? 1 : -1))}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default AdminCenterDetailsFeedback;
