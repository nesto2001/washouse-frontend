import { Empty, Pagination, Space, Tag, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { ManagerServiceItem } from '../../models/Manager/ManagerServiceItem';
import { formatCurrency } from '../../utils/FormatUtils';
import { PaginationProps } from 'rc-pagination';
import { Paging } from '../../types/Common/Pagination';
import { ServiceStatusMap } from '../../mapping/OrderStatusMap';
import { Link, useNavigate } from 'react-router-dom';
import StarFull from '../Star/StarFull';
type Props = {
    serviceList: ManagerServiceItem[];
    paging?: Paging;
    updatePage: (page: number) => void;
    isLoading: boolean;
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
        align: 'center',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: 'Định lượng',
        dataIndex: 'priceType',
        key: 'priceType',
        align: 'center',
        render: (value) => (value ? 'Khối lượng' : 'Số lượng'),
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (value, record) => (
            <div className="">
                {record.priceType ? (
                    <Tooltip title="Giá tối thiểu">
                        {formatCurrency(
                            record.minPrice !== null
                                ? record.minPrice
                                : record.prices[0].maxValue * record.prices[0].price,
                        )}
                    </Tooltip>
                ) : (
                    formatCurrency(value ?? 0)
                )}
            </div>
        ),
    },
    {
        title: 'Đánh giá',
        dataIndex: 'rating',
        align: 'center',
        key: 'rating',
        render: (_, record) =>
            record.rating && record.numOfRating > 0 ? (
                <Tooltip title={`★ ${record.rating.toFixed(1)} trên ${record.numOfRating} lượt đánh giá`}>
                    <div className="flex items-center gap-2">
                        <StarFull numOfStar={1} />
                        <span className="font-bold text-xl">{record.rating.toFixed(1)}</span>
                    </div>
                </Tooltip>
            ) : (
                'Chưa có'
            ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (value) => <Tag color="success">{ServiceStatusMap[value.toLowerCase()]}</Tag>,
    },
];
const ServiceList = ({ serviceList, paging, updatePage, isLoading }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="service__list--wrapper my-5 mt-2">
            <div className="service__list">
                <Table
                    columns={columns}
                    dataSource={serviceList}
                    loading={isLoading}
                    pagination={false}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                navigate(`/provider/services/${record.id}`);
                            },
                        };
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_DEFAULT}
                                imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                                description={
                                    <span className="text-xl font-medium text-sub-gray">Chưa có dịch vụ nào</span>
                                }
                            ></Empty>
                        ),
                    }}
                    rowClassName="cursor-pointer"
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
