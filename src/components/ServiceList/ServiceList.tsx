import { Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import { formatCurrency } from '../../utils/FormatUtils';
import RatingStars from '../RatingStars/RatingStars';
import { ManagerServiceItem } from '../../models/Manager/ManagerServiceItem';
type Props = {
    serviceList: ManagerServiceItem[];
    layout: 'grid' | 'list' | 'table';
};

type servicesType = {
    id: number;
    name: string;
    category: string;
    image: string | null;
    priceType: boolean;
    price: number;
    isAvailable: boolean;
    status: string;
    rating: number;
    numOfRating: number;
};

// const services: servicesType[] = [
//     {
//         id: 1,
//         name: 'Giặt sấy quần áo tổng hợp',
//         category: 'Dịch vụ giặt sấy',
//         priceType: false,
//         image: 'download-20230317075207.png',
//         price: 35000,
//         isAvailable: true,
//         status: 'Approved',
//         rating: 4.5,
//         numOfRating: 15,
//     },
//     {
//         id: 7,
//         name: 'Giặt sấy quần áo trắng',
//         category: 'Dịch vụ giặt sấy',
//         priceType: false,
//         image: null,
//         price: 40000,
//         isAvailable: true,
//         status: 'Approved',
//         rating: 4.8,
//         numOfRating: 12,
//     },
//     {
//         id: 9,
//         name: 'Giặt hấp áo len',
//         category: 'Dịch vụ giặt hấp',
//         priceType: false,
//         image: 'download-20230317075207.png',
//         price: 45000,
//         isAvailable: false,
//         status: 'Approved',
//         rating: 4.9,
//         numOfRating: 48,
//     },
// ];

const columns: ColumnsType<ManagerServiceItem> = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Phân loại',
        dataIndex: 'categoryId',
        key: 'category',
    },
    {
        title: 'Định lượng',
        dataIndex: 'pricetype',
        key: 'pricetype',
        render: (value) => (value ? 'Khối lượng' : 'Số lượng'),
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        render: (value) => formatCurrency(value ?? 0),
    },
    {
        title: 'Đánh giá',
        dataIndex: 'rating',
        key: 'rating',
        render: (_, record) =>
            record.rating && record.numOfRating > 0 ? record.rating + '/' + record.numOfRating : 'Chưa có',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Chỉnh sửa</a>
                <a>Xóa</a>
            </Space>
        ),
    },
];

const ServiceList = ({ serviceList, layout }: Props) => {
    return (
        <div className="service__list--wrapper my-5 mt-2">
            <div className="service__list">
                <Table columns={columns} dataSource={serviceList} loading={serviceList.length <= 0} />
            </div>
        </div>
    );
};
// };

export default ServiceList;
