import { Empty, Pagination, PaginationProps, Table, Tabs, TabsProps, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CenterBadgeStatusMap } from '../../../mapping/CenterBadgeStatusMap';
import { CenterStatusMap } from '../../../mapping/CenterStatusMap';
import { AdminCenterModel } from '../../../models/Admin/AdminCenterModel';
import { getCenterList } from '../../../repositories/AdminRepository';
import { Paging } from '../../../types/Common/Pagination';

type Props = {};

export type SearchParamsData = {
    page?: number;
    pageSize?: number;
    status?: string;
    searchString: string | null;
};

const AdminCentersContainer = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [centers, setCenters] = useState<AdminCenterModel[]>();
    const [activeKey, setActiveKey] = useState<string>('All');
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [pageNum, setPageNum] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: null,
        status: '',
        pageSize: 500,
    });

    const columns: ColumnsType<AdminCenterModel> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            align: 'center',
            render(value, record, index) {
                return <div className="font-bold">{index + 1}</div>;
            },
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 200,
            render(_, record) {
                return <img className="w-40 h-24 max-w-40 object-cover rounded-lg" src={record.thumbnail}></img>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            width: 200,
            key: 'title',
            render(_, record) {
                return <div className="font-bold">{record.title}</div>;
            },
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 320,
            render: (value) => value + ', TP. Hồ Chí Minh',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: 120,
            key: 'phone',
        },
        {
            title: 'Quản lý',
            dataIndex: 'managerName',
            key: 'managerName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (value: string) => (
                <Tag color={CenterBadgeStatusMap[value.toLowerCase()]}>{CenterStatusMap[value.toLowerCase()]}</Tag>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        getCenterList({ page: pageNum, searchString: searchParams.searchString, status: searchParams.status })
            .then((res) => {
                setCenters(res.items);
                setPaging({
                    itemsPerPage: res.itemsPerPage,
                    pageNumber: res.pageNumber,
                    totalItems: res.totalItems,
                    totalPages: res.totalPages,
                });
            })
            .catch(() => {
                setCenters([]);
            })
            .finally(() => setLoading(false));
    }, [activeKey, pageNum]);

    const centerTab: TabsProps['items'] = [
        {
            key: 'All',
            label: `Tất cả`,
        },
        {
            key: 'Active',
            label: `Đang hoạt động`,
        },
        {
            key: 'Inactive',
            label: `Tạm ngưng`,
        },
        {
            key: 'Updating',
            label: `Đang cập nhật`,
        },
        {
            key: 'Closed',
            label: `Đóng cửa`,
        },
        {
            key: 'Rejected',
            label: `Từ chối`,
        },
        {
            key: 'Suspended',
            label: `Vi phạm`,
        },
    ];

    const onChange = (key: string) => {
        setActiveKey(key);
        if (key !== 'All') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        } else {
            setSearchParams((prev) => ({ ...prev, status: undefined }));
        }
    };

    return (
        <div>
            <Tabs activeKey={activeKey} items={centerTab} onChange={onChange} />
            <Table
                dataSource={centers}
                columns={columns}
                loading={loading}
                pagination={false}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                            description={
                                <span className="text-xl font-medium text-sub-gray">Chưa có trung tâm nào</span>
                            }
                        ></Empty>
                    ),
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/admin/centers/${record.id}`);
                        },
                    };
                }}
                rowClassName="cursor-pointer"
            ></Table>
            <Pagination
                className="float-right mt-4 mb-10"
                showTotal={((total) => `Có tất cả ${total} trung tâm`) as PaginationProps['showTotal']}
                defaultCurrent={1}
                current={pageNum ?? paging?.pageNumber ?? 1}
                total={paging?.totalItems}
                onChange={(page) => {
                    setPageNum(page);
                }}
                pageSize={paging?.itemsPerPage}
                showSizeChanger={false}
            />
        </div>
    );
};

export default AdminCentersContainer;
