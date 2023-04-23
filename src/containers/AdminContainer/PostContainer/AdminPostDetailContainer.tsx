import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Switch, Upload, UploadFile, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TextEditor from '../../../components/Editor/TextEditor';
import { getPostDetail } from '../../../repositories/PostRepository';
import { PostModel } from '../../../models/Post/PostModel';

export type AddPostRequest = {
    title: string;
    content: string;
    savedFileName: string;
    type: string;
    status: string;
    publishTime: string;
};

const AdminPostDetailContainer = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [toggle, setToggle] = useState(false);
    const [post, setPost] = useState<PostModel>();
    const [editorContent, setEditorContent] = useState<string>('');
    const onFinish = () => {};
    const onFinishFailed = () => {};
    const { id } = useParams();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        id &&
            getPostDetail(Number.parseInt(id)).then((res) => {
                setPost(res);
                setFileList([
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: res.thumbnail,
                        thumbUrl: res.thumbnail,
                    },
                ]);
            });
    }, [state]);

    const handleChange = (info: UploadChangeParam) => {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`Tải hình ảnh ${info.file.name} thành công.`);
        } else if (status === 'error') {
            message.error(`Tải hình ảnh ${info.file.name} thất bại.`);
        }
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show the last recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    useEffect(() => {
        console.log(editorContent);
    }, [editorContent]);

    return (
        <div className="text-sub text-base pb-4">
            {post && (
                <Form
                    form={form}
                    name="create"
                    layout="vertical"
                    initialValues={{ serviceCategory: 0 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Hình ảnh thumbnail" valuePropName="fileList">
                        <Upload
                            action={`${process.env.REACT_APP_FIREBASE_API_URL}/api/homeTest/uploadImage`}
                            listType="picture-card"
                            fileList={[...fileList]}
                            onChange={handleChange}
                            multiple={false}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <div className="flex w-full gap-10">
                        <Form.Item
                            className="basis-3/5"
                            label="Tiêu đề bài đăng"
                            name="title"
                            initialValue={post.title}
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài đăng' }]}
                        >
                            <Input placeholder="Nhập tiêu đề bài đăng" />
                        </Form.Item>
                        <Form.Item
                            className="basis-2/5"
                            label="Loại bài đăng"
                            name="type"
                            initialValue={post.type}
                            rules={[{ required: true, message: 'Vui lòng nhập loại bài đăng' }]}
                        >
                            <Input placeholder="Nhập loại bài đăng" />
                        </Form.Item>
                    </div>
                    <TextEditor
                        content={editorContent}
                        initContent={post.content}
                        onChange={(content) => setEditorContent(content)}
                    />
                    <div className="flex w-full gap-10 my-4">
                        <div className="flex gap-4">
                            <div className="">Hẹn giờ đăng</div>
                            <Switch onChange={() => setToggle(!toggle)} />
                        </div>
                        {toggle ? (
                            <Form.Item
                                initialValue={post.createdDate}
                                label="Thời gian đăng"
                                name="publishTime"
                                rules={[{ required: true, message: 'Vui lòng chọn thời gian đăng' }]}
                            >
                                <DatePicker placeholder="Chọn thời gian đăng" showTime />
                            </Form.Item>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="w-full flex gap-4 justify-end">
                        <Link to={'/admin/posts'}>
                            <Button danger className="bg-transparent">
                                Hủy
                            </Button>
                        </Link>
                        <Button type="primary" onClick={() => form.submit()}>
                            Cập nhật bài đăng
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default AdminPostDetailContainer;
