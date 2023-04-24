import React from 'react';
import { AdminCenterFeedbackModel } from '../../models/Admin/AdminCenterDetails/AdminCenterFeedbackModel';
import RatingStars from '../RatingStars/RatingStars';
import Table, { ColumnsType } from 'antd/es/table';
import StarFull from '../Star/StarFull';
import { BsReplyFill } from 'react-icons/bs';
import { Tooltip } from 'antd';

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
                    {record.replyMessage && (
                        <div className="flex w-full justify-between bg-ws-light-gray rounded-lg p-2 pr-4 mt-2">
                            <div className="flex gap-3">
                                <BsReplyFill className="text-lg" />
                                <div>
                                    <div className="font-semibold">{record.replyBy}</div>
                                    <div>{record.replyMessage}</div>
                                </div>
                            </div>
                            <div>{record.replyDate.format('DD-MM-YYYY HH:mm')}</div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Dịch vụ',
            key: 'services',
            align: 'left',
            width: 204,
            render: (_, record) => (
                <Tooltip
                    title={
                        <ul>
                            {record.services.map((sv) => (
                                <li>{sv.name}</li>
                            ))}
                        </ul>
                    }
                    placement="topLeft"
                >
                    <div className="gap-2 cursor-pointer">
                        <div>{record.services[0].name} </div>
                        <div className="font-bold">
                            {record.services.length > 1 && `và ${record.services.length - 1} dịch vụ khác`}
                        </div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Đánh giá',
            key: 'rating',
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
