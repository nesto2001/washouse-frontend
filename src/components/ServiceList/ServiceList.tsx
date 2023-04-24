import { Pagination, Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { ManagerServiceItem } from '../../models/Manager/ManagerServiceItem';
import { formatCurrency } from '../../utils/FormatUtils';
import { PaginationProps } from 'rc-pagination';
import { Paging } from '../../types/Common/Pagination';
import { ServiceStatusMap } from '../../mapping/OrderStatusMap';
import { Link } from 'react-router-dom';
type Props = {
    serviceList: ManagerServiceItem[];
    paging?: Paging;
    updatePage: (page: number) => void;
};

const columns: ColumnsType<ManagerServiceItem> = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        align: 'center',
        render: (_, text, index) => <strong>{index + 1}</strong>,
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Phân loại',
        dataIndex: 'categoryName',
        key: 'categoryName',
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
        align: 'right',
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
        align: 'center',
        render: (value) => <Tag color="success">{ServiceStatusMap[value.toLowerCase()]}</Tag>,
    },
    {
        title: 'Thao tác',
        key: 'action',
        align: 'center',

        render: (_, record) => (
            <Link to={`/provider/services/${record.id}`}>
                <div className="text-primary cursor-pointer font-bold">Xem chi tiết</div>
            </Link>
        ),
    },
];
const ServiceList = ({ serviceList, paging, updatePage }: Props) => {
    return (
        <div className="service__list--wrapper my-5 mt-2">
            <div className="service__list">
                <Table
                    columns={columns}
                    dataSource={serviceList}
                    loading={serviceList.length <= 0}
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
        </div>
    );
};
// };

export default ServiceList;
