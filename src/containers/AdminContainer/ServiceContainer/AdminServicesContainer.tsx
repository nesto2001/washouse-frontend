import { Button, Checkbox, Form, Input, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceCategoryDetailModel } from '../../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories, pinCategory, unpinCategory } from '../../../repositories/ServiceCategoryRepository';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TbPin, TbPinnedOff } from 'react-icons/tb';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam } from 'antd/es/upload';
import { uploadSingle } from '../../../repositories/MediaRepository';
import { CategoryRequest } from '../../../models/Category/CategoryRequest';
import { createCategory } from '../../../repositories/AdminRepository';

type Props = {};

type CreateCategoryFormData = {
    cateImg: string;
    cateName: string;
    cateDescription: string;
    homeFlag: boolean;
};

const AdminServicesContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<ServiceCategoryDetailModel[]>();
    const [openCreate, setOpenCreate] = useState(false);
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const [state, updateState] = useState({});
    const [form] = Form.useForm();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange = (info: UploadChangeParam) => {
        setFileList([...info.fileList]);
    };

    const columns: ColumnsType<ServiceCategoryDetailModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            width: 180,
            render(_, record) {
                return <img className="w-full h-24 object-cover rounded-lg" src={record.image}></img>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: 150,
            align: 'center',
            render(_, record) {
                return <div className=""> {record.categoryName}</div>;
            },
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
            key: 'description',
            width: 500,
            render: (value) => <div className="line-clamp-4">{value}</div>,
        },
        {
            title: 'Thao tác',
            align: 'center',
            render(_, record) {
                return record.homeFlag ? (
                    <Button
                        className="cursor-pointer"
                        danger
                        style={{ padding: '0px 8px', background: 'white' }}
                        type="default"
                        onClick={() => handleUnpinCategory(record.categoryId)}
                    >
                        <TbPinnedOff fontSize={22} />
                    </Button>
                ) : (
                    <Button
                        className="cursor-pointer text-white"
                        style={{ padding: '0px 8px' }}
                        type="primary"
                        onClick={() => handlePinCategory(record.categoryId)}
                    >
                        <TbPin fontSize={22} />
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        getServiceCategories().then((res) => {
            setServices(res);
        });
    }, [state]);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Chọn hình ảnh</div>
        </div>
    );

    const handlePinCategory = (id: number) => {
        pinCategory(id)
            .then((res) => {
                message.success('Ghim phân loại lên trang chủ thành công');
                forceUpdate();
            })
            .catch(() => {
                message.error('Gặp sự cố trong quá trình ghim phân loại, vui lòng thử lại sau');
            });
    };

    const handleUnpinCategory = (id: number) => {
        unpinCategory(id)
            .then((res) => {
                message.success('Hủy ghim phân loại khỏi trang chủ thành công');
                forceUpdate();
            })
            .catch(() => {
                message.error('Gặp sự cố trong quá trình hủy ghim phân loại, vui lòng thử lại sau');
            });
    };

    const onFinish = (values: CreateCategoryFormData) => {
        const file = fileList[0]?.originFileObj;
        if (file) {
            uploadSingle(file).then((res) => {
                const req: CategoryRequest = {
                    categoryName: values.cateName,
                    description: values.cateDescription,
                    homeFlag: values.homeFlag ?? false,
                    savedFileName: res.data.data.savedFileName,
                    status: true,
                };
                createCategory(req)
                    .then((res) => {
                        message.success('Tạo phân loại thành công');
                    })
                    .catch((err) => {
                        message.error('Gặp sự cố trong quá trình tạo phân loại, vui lòng thử lại sau');
                    });
            });
        } else {
            const req: CategoryRequest = {
                categoryName: values.cateName,
                description: values.cateDescription,
                homeFlag: values.homeFlag ?? false,
                status: true,
            };
            createCategory(req)
                .then((res) => {
                    message.success('Tạo phân loại thành công');
                })
                .catch((err) => {
                    message.error('Gặp sự cố trong quá trình tạo phân loại, vui lòng thử lại sau');
                });
        }
    };

    const onFinishFailed = (error: any) => {
        message.error('Vui lòng điền đầy đủ thông tin');
    };

    return (
        <>
            <div className="provider__services--filter">
                <Button
                    className="float-right mb-4"
                    type="primary"
                    onClick={() => {
                        setOpenCreate(true);
                    }}
                >
                    Thêm phân loại
                </Button>
                <Table
                    dataSource={services}
                    columns={columns}
                    loading={services == null}
                    pagination={{ pageSize: 4 }}
                ></Table>
            </div>
            <Modal
                open={openCreate}
                closable
                maskClosable
                destroyOnClose
                okText="Tạo phân loại"
                cancelText="Hủy"
                onCancel={() => {
                    setOpenCreate(false);
                }}
                cancelButtonProps={{ style: { background: 'white' } }}
                title="Tạo mới phân loại"
                width={500}
                onOk={() => form.submit()}
                centered
            >
                <Form
                    wrapperCol={{ span: 16 }}
                    labelCol={{ span: 8 }}
                    layout="horizontal"
                    labelWrap
                    className="mt-3"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    preserve={false}
                >
                    <Form.Item label="Hình ảnh" name="cateImg">
                        <Upload
                            type="select"
                            listType="picture-card"
                            onChange={handleChange}
                            beforeUpload={() => {
                                return false;
                            }}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Tên phân loại"
                        name="cateName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phân loại' }]}
                    >
                        <Input style={{ width: 280 }} placeholder="Nhập tên phân loại" />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="cateDescription"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <TextArea style={{ width: 280 }} placeholder="Nhập nội dung" />
                    </Form.Item>
                    <Form.Item label="Ghim trang chủ" name="homeFlag" valuePropName="checked" initialValue={false}>
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AdminServicesContainer;
