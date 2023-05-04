import { Button, Checkbox, Form, Input, Modal, Table, Upload, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceCategoryDetailModel } from '../../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories, pinCategory, unpinCategory } from '../../../repositories/ServiceCategoryRepository';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TbPin, TbPinnedOff } from 'react-icons/tb';

type Props = {};

const AdminServicesContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<ServiceCategoryDetailModel[]>();
    const [openCreate, setOpenCreate] = useState(false);
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
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
            render(_, record) {
                return <div className=""> {record.categoryName}</div>;
            },
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
    }, [activeKey]);

    useEffect(() => {
        const keyTab = pathname === '/admin/centers/' ? '1' : '3';
        setActiveKey(keyTab);
    }, [pathname]);

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
                width={400}
                centered
            >
                <Form wrapperCol={{ span: 16 }} labelCol={{ span: 8 }} layout="horizontal" labelWrap>
                    <Form.Item label="Hình ảnh">
                        <Upload type="select" listType="picture-card">
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Tên phân loại">
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item label="Ghim trang chủ">
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AdminServicesContainer;
