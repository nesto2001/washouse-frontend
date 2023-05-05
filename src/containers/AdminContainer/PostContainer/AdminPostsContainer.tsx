import { Button, Pagination, PaginationProps, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Placeholder from '../../../assets/images/placeholder.png';
import { PostBadgeStatusMap, PostStatusMap, PostTypeMap } from '../../../mapping/PostStatusMap';
import { PostModel } from '../../../models/Post/PostModel';
import { getAdminPosts } from '../../../repositories/PostRepository';
import { Paging } from '../../../types/Common/Pagination';

type Props = {};

const AdminPostsContainer = (props: Props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostModel[]>();
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [pageNum, setPageNum] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const columns: ColumnsType<PostModel> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            align: 'center',
            render(_, record, index) {
                return <div className="font-bold">{index + 1}</div>;
            },
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            align: 'center',
            width: 180,
            render(_, record) {
                return (
                    <img className="w-full h-24 object-cover rounded-xl" src={record.thumbnail ?? Placeholder}></img>
                );
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 180,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 220,
            render(value) {
                return <div className="line-clamp-1">{value}</div>;
            },
        },
        {
            title: 'Thể loại',
            dataIndex: 'type',
            key: 'type',
            render(value) {
                return <div className="line-clamp-1">{PostTypeMap[value]}</div>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render(_, record) {
                return (
                    <Tag color={PostBadgeStatusMap[record.status.toLowerCase()]}>
                        {PostStatusMap[record.status.toLowerCase()]}
                    </Tag>
                );
            },
        },
        {
            title: 'Giờ tạo',
            dataIndex: 'createdDate',
            align: 'center',
            key: 'createdDate',
            render(_, record) {
                return <>{record.createdDate.format('DD-MM-YYYY HH:mm:ss')}</>;
            },
        },
    ];

    useEffect(() => {
        setLoading(true);
        getAdminPosts({ page: pageNum })
            .then((res) => {
                setPosts(res.items);
                setPaging({
                    itemsPerPage: res.itemsPerPage,
                    pageNumber: res.pageNumber,
                    totalItems: res.totalItems,
                    totalPages: res.totalPages,
                });
            })
            .finally(() => setLoading(false));
    }, [pageNum]);

    return (
        <div className="provider__services--filter">
            <Link to={'/admin/posts/create'}>
                <Button className="float-right mb-4" type="primary">
                    Tạo bài đăng
                </Button>
            </Link>
            <Table
                rowClassName="cursor-pointer"
                dataSource={posts}
                columns={columns}
                pagination={false}
                loading={loading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/admin/posts/${record.id}`);
                        },
                    };
                }}
            ></Table>
            <Pagination
                className="float-right mt-4 mb-10"
                showTotal={((total) => `Có tất cả ${total} bài đăng`) as PaginationProps['showTotal']}
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

export default AdminPostsContainer;
