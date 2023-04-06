import { Button, DatePicker, Input, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { PromotionModel } from '../../../models/Promotion/PromotionModel';
import { createPromotion, getPromotions } from '../../../repositories/PromotionRepository';
import { formatDateEn } from '../../../utils/TimeUtils';
import { formatPercentage } from '../../../utils/FormatUtils';
import Modal from 'antd/es/modal/Modal';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import CouponTag from '../../../components/CouponTag/CouponTag';

type PromotionFormData = {
    code: string;
    description?: string;
    discount: number;
    startDate: Date;
    expireDate: Date;
    useTimes: number;
};

const CenterPromotionsContainer = () => {
    const [form] = Form.useForm();

    const [promotions, setPromotions] = useState<PromotionModel[]>();
    const [modalVisibility, setModalVisibility] = useState(false);

    const [formData, setFormData] = useState<PromotionFormData>();

    const columns: ColumnsType<PromotionModel> = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
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
                return <CouponTag discountValue={formatPercentage(record.discount)} />;
            },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            align: 'center',
            key: 'startDate',
            render(_, record) {
                return <div>{formatDateEn(record.startDate)}</div>;
            },
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expireDate',
            align: 'center',
            key: 'expireDate',
            render(_, record) {
                return <div>{formatDateEn(record.expireDate)}</div>;
            },
        },
        {
            title: 'Lượt sử dụng',
            dataIndex: 'useTimes',
            align: 'center',
            key: 'useTimes',
        },
        {
            title: 'Thao tác',
            render(_, record) {
                return <div className="text-red cursor-pointer">Hủy mã khuyến mãi</div>;
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
        console.log(values);
        getManagerCenter().then((res) =>
            createPromotion({
                code: values.code,
                description: values.description,
                discount: values.discount / 100,
                expireDate: values.expireDate?.toISOString(),
                startDate: values.startDate?.toISOString(),
                useTimes: values.useTimes,
                centerId: res.id,
            })
                .then(() => {
                    message.success(`Đã tạo thành công.`);
                    setModalVisibility(false);
                })
                .catch((error) => {
                    if (error) {
                        message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                    }
                }),
        );
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
                        <Button className="text-white" onClick={() => setModalVisibility(true)}>
                            Thêm mã khuyến mãi
                        </Button>
                    </div>
                }
                dataSource={promotions}
                columns={columns}
                loading={promotions == null}
            ></Table>

            <Modal
                width={600}
                title="Thêm mới mã khuyến mãi"
                open={modalVisibility}
                onCancel={() => setModalVisibility(false)}
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
                    form={form}
                    name="createPromotion"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="columns-2">
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
                            ]}
                            validateTrigger={'onBlur'}
                        >
                            <Input type="number" title="Giảm giá" addonAfter="%" placeholder="Nhập mức giảm giá" />
                        </Form.Item>
                    </div>
                    <div className="columns-2">
                        <Form.Item
                            label="Ngày hiệu lực"
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng thêm ngày hiệu lực' }]}
                        >
                            <DatePicker
                                placeholder="Nhập ngày hiệu lực"
                                defaultValue={dayjs()}
                                onChange={(e) => {
                                    console.log(e);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hạn sử dụng"
                            name="expireDate"
                            rules={[{ required: true, message: 'Vui lòng thêm hạn sử dụng' }]}
                        >
                            <DatePicker placeholder="Nhập hạn sử dụng" />
                        </Form.Item>
                    </div>
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
                </Form>
            </Modal>
        </div>
    );
};

export default CenterPromotionsContainer;
