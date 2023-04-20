import React from 'react';
import { CenterFeedbackModel } from '../../models/Staff/StaffFeedback/CenterFeedbackModel';
import Table, { ColumnsType } from 'antd/es/table';
import RatingStars from '../RatingStars/RatingStars';
import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type Props = {
    feedbacks: CenterFeedbackModel[];
};

const FeedbackList = ({ feedbacks }: Props) => {
    const navigate = useNavigate();

    const columns: ColumnsType<CenterFeedbackModel> = [
        {
            title: 'Nhận xét',
            dataIndex: 'feedback',
            key: 'feedback',
            width: 330,
            render: (_, record) => (
                <div className="center__feedback">
                    <div className="center__feedback--review flex gap-4">
                        <div className="center__feedback--reviewer font-bold">{record.createdBy}</div>
                        <div className="center__feedback--date font-medium text-sub-gray">{record.createdDate}</div>
                    </div>
                    <div className="center__feedback--content mt-1">{record.content}</div>
                </div>
            ),
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'orderId',
            align: 'center',
            width: 160,
            key: 'order',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'serviceName',
            key: 'service',
            align: 'center',
            render: (value) => <>{value ?? '-'}</>,
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
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Button type="default" style={{ background: '#f2f3f3' }}>
                    <EllipsisOutlined />
                </Button>
            ),
        },
    ];

    const handleSelectRow = (record: CenterFeedbackModel, index: number) => {};

    return (
        <div>
            <Table
                columns={columns}
                dataSource={feedbacks}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/provider/orders/${record.orderId}`);
                        },
                    };
                }}
            />
        </div>
    );
};

export default FeedbackList;
