import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Switch, Upload, UploadFile, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextEditor from '../../../components/Editor/TextEditor';

export type AddPostRequest = {
    title: string;
    content: string;
    savedFileName: string;
    type: string;
    status: string;
    publishTime: string;
};

const AdminCreatePostContainer = () => {
    const location = useLocation();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [toggle, setToggle] = useState(false);
    const [editorContent, setEditorContent] = useState<string>('');
    const onFinish = () => {};
    const onFinishFailed = () => {};
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
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài đăng' }]}
                    >
                        <Input placeholder="Nhập tiêu đề bài đăng" />
                    </Form.Item>
                    <Form.Item
                        className="basis-2/5"
                        label="Loại bài đăng"
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng nhập loại bài đăng' }]}
                    >
                        <Input placeholder="Nhập loại bài đăng" />
                    </Form.Item>
                </div>
                {/* <Form.Item
                    label="Nội dung bài đăng"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung bài đăng' }]}
                >
                    <TextArea rows={4} placeholder="Nhập nội dung bài đăng" />
                </Form.Item> */}
                <TextEditor content={editorContent} onChange={(content) => setEditorContent(content)} />
                <div className="flex w-full gap-10 my-4">
                    <div className="flex gap-4">
                        <div className="">Hẹn giờ đăng</div>
                        <Switch onChange={() => setToggle(!toggle)} />
                    </div>
                    {toggle ? (
                        <Form.Item
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
                        Tạo bài đăng
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AdminCreatePostContainer;
