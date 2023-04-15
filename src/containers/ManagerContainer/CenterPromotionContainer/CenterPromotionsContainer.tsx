import { Button, DatePicker, Input, Table, Tag, Tooltip, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { PromotionModel } from '../../../models/Promotion/PromotionModel';
import { createPromotion, deactivatePromotion, getPromotions } from '../../../repositories/PromotionRepository';
import { formatDateEn } from '../../../utils/TimeUtils';
import { formatPercentage } from '../../../utils/FormatUtils';
import Modal from 'antd/es/modal/Modal';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import CouponTag from '../../../components/CouponTag/CouponTag';
import { EditOutlined, StopOutlined, PoweroffOutlined } from '@ant-design/icons';

type PromotionFormData = {
    code: string;
    description?: string;
    discount: number;
    startDate: string;
    expireDate: string;
    useTimes: number;
};

const CenterPromotionsContainer = () => {
    const [form] = Form.useForm();

    const [promotions, setPromotions] = useState<PromotionModel[]>();
    const [modalVisibility, setModalVisibility] = useState(false);

    const [formData, setFormData] = useState<PromotionFormData>();

    const columns: ColumnsType<PromotionModel> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return index + 1;
            },
        },
        {
            title: 'Mã Code',
            dataIndex: 'code',
            key: 'code',
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
            render(_, record) {
                return (
                    <div className="flex gap-6">
                        <div className="text-primary cursor-pointer">
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined style={{ fontSize: 18 }} />
                            </Tooltip>
                        </div>
                        {record.available ? (
                            <div className="text-red cursor-pointer" onClick={() => deactivatePromotion(record.id)}>
                                <Tooltip title="Ngưng mã">
                                    <PoweroffOutlined style={{ fontSize: 18 }} />
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="text-green cursor-pointer">
                                <Tooltip title="Kích hoạt mã">
                                    <PoweroffOutlined style={{ fontSize: 18 }} />
                                </Tooltip>
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        if (!modalVisibility) {
            const fetchData = async () => {
                return await getPromotions();
            };
            fetchData().then((res) => {
                setPromotions(res);
            });
        }
    }, [modalVisibility]);

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
                                getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode as HTMLElement;
                                }}
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
                                getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode as HTMLElement;
                                }}
                                placeholder="Nhập hạn sử dụng"
                                className="w-full"
                                dropdownClassName="absolute"
                                popupStyle={{ position: 'absolute' }}
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
