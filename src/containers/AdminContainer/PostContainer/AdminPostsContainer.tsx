import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Placeholder from '../../../assets/images/placeholder.png';
import { PostBadgeStatusMap, PostStatusMap } from '../../../mapping/PostStatusMap';
import { PostModel } from '../../../models/Post/PostModel';
import { getAdminPosts } from '../../../repositories/PostRepository';

type Props = {};

const AdminPostsContainer = (props: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostModel[]>();
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
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
        },
    ];

    useEffect(() => {
        console.log(activeKey);
        getAdminPosts({}).then((res) => {
            setPosts(res);
        });
    }, [activeKey]);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

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
                loading={posts == null}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/admin/posts/${record.id}`);
                        },
                    };
                }}
            ></Table>
        </div>
    );
};

export default AdminPostsContainer;
