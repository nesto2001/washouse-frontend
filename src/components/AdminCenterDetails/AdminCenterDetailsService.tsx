import React from 'react';
import { AdminCenterServiceModel } from '../../models/Admin/AdminCenterDetails/AdminCenterServiceModel';
import ServiceList from '../ServiceList/ServiceList';
import { Link } from 'react-router-dom';
import { ServiceStatusMap } from '../../mapping/OrderStatusMap';
import { Pagination, PaginationProps, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { formatCurrency } from '../../utils/FormatUtils';
import { Paging } from '../../types/Common/Pagination';

type Props = {
    centerServices: AdminCenterServiceModel[];
    paging?: Paging;
    updatePage: (page: number) => void;
};

const AdminCenterDetailsService = ({ centerServices, paging, updatePage }: Props) => {
    const columns: ColumnsType<AdminCenterServiceModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Phân loại',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Định lượng',
            dataIndex: 'priceType',
            key: 'priceType',
            render: (value) => (value ? 'Khối lượng' : 'Số lượng'),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (value, record) =>
                record.priceType ? formatCurrency(record.minPrice ?? 0) : formatCurrency(value ?? 0),
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
            align: 'center',
            render: (value) => <Tag color="success">{ServiceStatusMap[value.toLowerCase()]}</Tag>,
        },
    ];

    return (
        <div className="pt-3">
            <Table
                columns={columns}
                dataSource={centerServices}
                loading={centerServices.length <= 0}
                pagination={false}
            />
            <Pagination
                className="float-right mt-4"
                showTotal={((total) => `Có tất cả ${total} dịch vụ`) as PaginationProps['showTotal']}
                defaultCurrent={paging?.pageNumber}
                total={paging?.totalItems}
                onChange={(page) => updatePage(page)}
                pageSize={paging?.itemsPerPage}
                showSizeChanger={false}
            />
        </div>
    );
};

export default AdminCenterDetailsService;
