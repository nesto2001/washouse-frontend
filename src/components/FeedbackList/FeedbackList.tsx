import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { CenterFeedbackModel } from '../../models/Staff/StaffFeedback/CenterFeedbackModel';
import StarFull from '../Star/StarFull';

type Props = {
    feedbacks: CenterFeedbackModel[];
};

const FeedbackList = ({ feedbacks }: Props) => {
    const navigate = useNavigate();

    const columns: ColumnsType<CenterFeedbackModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: 60,
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Nhận xét',
            dataIndex: 'feedback',
            key: 'feedback',
            width: 380,
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
            key: 'ratingNum',
            dataIndex: 'rating',
            align: 'center',
            width: 204,
            render: (rating: number) => (
                <div className="flex justify-center gap-2">
                    <StarFull numOfStar={1} />
                    <span className="mr-3 text-xl font-bold">{rating.toFixed(1)}</span>
                </div>
            ),
        },
        // {
        //     title: 'Thao tác',
        //     key: 'action',
        //     align: 'center',
        //     width: 100,
        //     render: (_, record) => (
        //         <Button type="default" style={{ background: '#f2f3f3' }}>
        //             <EllipsisOutlined />
        //         </Button>
        //     ),
        // },
    ];

    return (
        <div>
            <Table
                rowClassName="cursor-pointer"
                columns={columns}
                dataSource={feedbacks}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/provider/orders/${record.orderId}`);
                        },
                    };
                }}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                            description={
                                <span className="text-xl font-medium text-sub-gray">Chưa có đánh giá nào</span>
                            }
                        ></Empty>
                    ),
                }}
            />
        </div>
    );
};

export default FeedbackList;
