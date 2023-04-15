import { EditOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Popconfirm, Table, Tag, Tooltip, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Modal from 'antd/es/modal/Modal';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState, useCallback } from 'react';
import CouponTag from '../../../components/CouponTag/CouponTag';
import { PromotionModel } from '../../../models/Promotion/PromotionModel';
import {
    activatePromotion,
    createPromotion,
    deactivatePromotion,
    getPromotions,
    updatePromotion,
} from '../../../repositories/PromotionRepository';
import { formatPercentage } from '../../../utils/FormatUtils';
import { FaQuestionCircle } from 'react-icons/fa';

type PromotionFormData = {
    code: string;
    description?: string;
    discount: number;
    startDate: string;
    expireDate: string;
    useTimes: number;
};

export type ActivatePromotionFormData = {
    id?: number;
    expireDate?: dayjs.Dayjs;
    useTimes?: number;
};

export type UpdatePromotionFormData = {
    id?: number;
    expireDate?: dayjs.Dayjs;
    startDate?: dayjs.Dayjs;
    useTimes?: number;
};

const CenterPromotionsContainer = () => {
    const [form] = Form.useForm();
    const [promotions, setPromotions] = useState<PromotionModel[]>();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState<PromotionFormData>();
    const [activateFormData, setActivateFormData] = useState<ActivatePromotionFormData>({});
    const [updateFormData, setUpdateFormData] = useState<UpdatePromotionFormData>({});

    const columns: ColumnsType<PromotionModel> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            align: 'center',
            render: (_, record, index) => {
                return index + 1;
            },
        },
        {
            title: 'Mã Code',
            dataIndex: 'code',
            key: 'code',
            width: 200,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            align: 'center',
            key: 'discount',
            render(_, record) {
                return <CouponTag content={`Giảm ${formatPercentage(record.discount)}`} />;
            },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            align: 'center',
            key: 'startDate',
            render(_, record) {
                return <div>{dayjs(record.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY') ?? ''}</div>;
            },
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expireDate',
            align: 'center',
            key: 'expireDate',
            render(_, record) {
                return <div>{dayjs(record.expireDate, 'DD-MM-YYYY').format('DD-MM-YYYY') ?? ''}</div>;
            },
        },
        {
            title: 'Lượt sử dụng',
            dataIndex: 'useTimes',
            align: 'center',
            key: 'useTimes',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'available',
            align: 'center',
            key: 'available',
            render: (value: boolean) => {
                return value ? <Tag color="success">Đang hoạt động</Tag> : <Tag color="error">Chưa hoạt động</Tag>;
            },
        },
        {
            title: 'Thao tác',
            align: 'center',
            render(_, record) {
                return (
                    <div className="flex gap-6">
                        <Popconfirm
                            placement="topRight"
                            title={'Vui lòng nhập thông tin mã khuyến mãi'}
                            description={
                                <>
                                    <div className="columns-1 p-2 flex flex-col gap-4">
                                        <div>
                                            <div>Ngày bắt đầu</div>
                                            <DatePicker
                                                format={'DD-MM-YYYY'}
                                                className="w-full"
                                                placement="bottomRight"
                                                showToday={false}
                                                placeholder="Nhập ngày bắt đầu"
                                                value={updateFormData.startDate}
                                                onChange={(value) => {
                                                    if (value) {
                                                        setUpdateFormData((prev) => ({
                                                            ...prev,
                                                            startDate: value,
                                                        }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div>Hạn sử dụng</div>
                                            <DatePicker
                                                format={'DD-MM-YYYY'}
                                                className="w-full"
                                                placement="bottomRight"
                                                placeholder="Nhập hạn sử dụng"
                                                showToday={false}
                                                value={updateFormData.expireDate}
                                                onChange={(value) => {
                                                    if (value) {
                                                        setUpdateFormData((prev) => ({
                                                            ...prev,
                                                            expireDate: value,
                                                        }));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div>Lượt sử dụng</div>
                                            <Input
                                                type="number"
                                                title="Lượt sử dụng"
                                                placeholder="Nhập lượt sử dụng"
                                                value={updateFormData.useTimes}
                                                onChange={(value) => {
                                                    value.target.value &&
                                                        setUpdateFormData((prev) => ({
                                                            ...prev,
                                                            useTimes: +value.target.value,
                                                        }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            }
                            icon={false}
                            onOpenChange={() => setUpdateFormData({})}
                            onConfirm={() => {
                                if (updateFormData.expireDate || updateFormData.useTimes || updateFormData.startDate) {
                                    updatePromotion({
                                        ...updateFormData,
                                        id: record.id,
                                    })
                                        .then(() => {
                                            message.success(`Cập nhật thành công mã khuyến mãi.`);
                                            forceUpdate();
                                        })
                                        .catch(() => message.error(`Đã xảy ra lỗi xảy ra, vui lòng thử lại sau.`));
                                }
                            }}
                            okText="Cập nhật mã"
                            showCancel={false}
                        >
                            <div className="text-primary cursor-pointer">
                                <Tooltip title="Chỉnh sửa">
                                    <EditOutlined style={{ fontSize: 18 }} />
                                </Tooltip>
                            </div>
                        </Popconfirm>
                        {record.available ? (
                            <Popconfirm
                                placement="topRight"
                                title={'Bạn có chắc chắn sẽ hủy mã khuyến mãi này?'}
                                okText={'Chắc chắn'}
                                showCancel={false}
                                onConfirm={() => {
                                    deactivatePromotion(record.id).then(() => {
                                        message.success(`Hủy thành công mã khuyến mãi.`);
                                        forceUpdate();
                                    });
                                }}
                            >
                                <div className="text-red cursor-pointer">
                                    <Tooltip title="Ngưng mã">
                                        <PoweroffOutlined style={{ fontSize: 18 }} />
                                    </Tooltip>
                                </div>
                            </Popconfirm>
                        ) : (
                            <Popconfirm
                                placement="topRight"
                                title={'Vui lòng nhập thông tin mã khuyến mãi'}
                                description={
                                    <>
                                        <div className="columns-1 p-2 flex flex-col gap-4">
                                            <div>
                                                <div>Hạn sử dụng</div>
                                                <DatePicker
                                                    format={'DD-MM-YYYY'}
                                                    className="w-full"
                                                    placement="bottomRight"
                                                    showToday={false}
                                                    placeholder="Nhập hạn sử dụng"
                                                    value={activateFormData.expireDate}
                                                    onChange={(value) => {
                                                        if (value) {
                                                            setActivateFormData((prev) => ({
                                                                ...prev,
                                                                expireDate: value,
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <div>Lượt sử dụng</div>
                                                <Input
                                                    type="number"
                                                    title="Lượt sử dụng"
                                                    placeholder="Nhập lượt sử dụng"
                                                    value={activateFormData.useTimes}
                                                    onChange={(value) => {
                                                        value.target.value &&
                                                            setActivateFormData((prev) => ({
                                                                ...prev,
                                                                useTimes: +value.target.value,
                                                            }));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                }
                                icon={false}
                                onOpenChange={() => setActivateFormData({})}
                                onConfirm={() => {
                                    if (activateFormData.expireDate || activateFormData.useTimes) {
                                        activatePromotion({
                                            ...activateFormData,
                                            id: record.id,
                                        }).then(() => {
                                            message.success(`Kích hoạt thành công mã khuyến mãi.`);
                                            forceUpdate();
                                        });
                                    }
                                }}
                                okText="Kích hoạt mã"
                                showCancel={false}
                            >
                                <div className="text-green cursor-pointer">
                                    <Tooltip title="Kích hoạt mã">
                                        <PoweroffOutlined style={{ fontSize: 18 }} />
                                    </Tooltip>
                                </div>
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        if (!modalVisibility) {
            getPromotions().then((res) => {
                setPromotions(res);
            });
        }
    }, [modalVisibility, state]);

    const onFinish = (values: PromotionFormData) => {
        createPromotion({
            code: values.code.toUpperCase(),
            description: values.description,
            discount: values.discount / 100,
            expireDate: dayjs(values.expireDate).format('DD-MM-YYYY'),
            startDate: dayjs(values.startDate).format('DD-MM-YYYY'),
            useTimes: values.useTimes,
        })
            .then(() => {
                message.success(`Đã tạo thành công.`);
                setModalVisibility(false);
            })
            .catch((error) => {
                if (error) {
                    message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                }
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleCreatePromotion = () => {
        console.log(form);
    };
    return (
        <div className="provider__promotions--filter">
            <Table
                caption={
                    <div className="flex justify-end">
                        <Button type="primary" onClick={() => setModalVisibility(true)}>
                            Thêm mã khuyến mãi
                        </Button>
                    </div>
                }
                pagination={{
                    pageSize: 5,
                }}
                dataSource={promotions}
                columns={columns}
                loading={promotions == null}
            ></Table>

            <Modal
                width={480}
                title="Thêm mới mã khuyến mãi"
                zIndex={9998}
                open={modalVisibility}
                onCancel={() => setModalVisibility(false)}
                destroyOnClose
                footer={[
                    <Button key="key" onClick={() => setModalVisibility(false)} danger className="bg-transparent">
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        Lưu
                    </Button>,
                ]}
            >
                <Form
                    className="pt-4"
                    form={form}
                    name="createPromotion"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelWrap
                >
                    <div className="columns-1">
                        <Form.Item
                            label="Mã khuyến mãi"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã khuyến mãi' }]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="text" title="Mã khuyến mãi" placeholder="Nhập mã khuyến mãi" />
                        </Form.Item>
                        <Form.Item
                            label="Mức giảm giá"
                            name="discount"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mức giảm giá' },
                                { max: 100, message: 'Mức giảm giá không được vượt quá 100(%)' },
                                { min: 1, message: 'Mức giảm giá không được thấp hơn 1(%)' },
                            ]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="number" title="Giảm giá" addonAfter="%" placeholder="Nhập mức giảm giá" />
                        </Form.Item>
                    </div>
                    <div className="columns-1">
                        <Form.Item
                            label="Ngày hiệu lực"
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng thêm ngày hiệu lực' }]}
                            initialValue={dayjs(dayjs(), 'DD-MM-YYYY')}
                        >
                            <DatePicker
                                format={'DD-MM-YYYY'}
                                className="w-full"
                                placeholder="Nhập ngày hiệu lực"
                                onChange={(e) => {
                                    console.log(e);
                                }}
                                disabledDate={(current) => {
                                    // Disable dates before today
                                    return current && current < dayjs().startOf('day');
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hạn sử dụng"
                            name="expireDate"
                            rules={[{ required: true, message: 'Vui lòng thêm hạn sử dụng' }]}
                        >
                            <DatePicker
                                format={'DD-MM-YYYY'}
                                placeholder="Nhập hạn sử dụng"
                                className="w-full"
                                style={{ zIndex: 9999 }}
                            />
                        </Form.Item>
                    </div>
                    <div className="columns-1">
                        <Form.Item
                            label="Lượt sử dụng"
                            name="useTimes"
                            rules={[{ required: true, message: 'Vui lòng nhập lượt sử dụng' }]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="number" title="Lượt sử dụng" placeholder="Nhập lượt sử dụng" />
                        </Form.Item>
                        <Form.Item label="Mô tả" name={'description'}>
                            <TextArea placeholder="Nhập mô tả" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CenterPromotionsContainer;
