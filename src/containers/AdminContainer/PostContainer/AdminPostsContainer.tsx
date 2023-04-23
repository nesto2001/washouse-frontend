import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PostModel } from '../../../models/Post/PostModel';
import { getAdminPosts } from '../../../repositories/PostRepository';
import Placeholder from '../../../assets/images/placeholder.png';

type Props = {};

const AdminPostsContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [posts, setPosts] = useState<PostModel[]>();
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const columns: ColumnsType<PostModel> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render(_, record, index) {
                return <div className="">{index + 1}</div>;
            },
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render(_, record) {
                return <img className="w-40 h-24 object-cover" src={record.thumbnail ?? Placeholder}></img>;
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 180,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: 220,
            render(value) {
                return <div className="line-clamp-1">{value}</div>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Giờ tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Giờ cập nhật',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Thao tác',
            render(_) {
                return (
                    <>
                        <div className="cursor-pointer text-primary">Hủy đăng</div>
                        <div className="cursor-pointer text-red">Hủy ghim dịch vụ</div>
                    </>
                );
            },
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
            <Table dataSource={posts} columns={columns} loading={posts == null}></Table>
        </div>
    );
};

export default AdminPostsContainer;
