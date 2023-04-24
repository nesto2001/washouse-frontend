import { useState } from 'react';

import { Button, Form, Input, Modal, Tag, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { CenterStaffModel } from '../../models/Staff/CenterStaffModel';
import dayjs from 'dayjs';
import { activateStaff, assignStaff, deactivateStaff } from '../../repositories/StaffRepository';
import { FaPowerOff } from 'react-icons/fa';

type Props = {
    centerStaff?: CenterStaffModel[];
    forceUpdate: () => void;
};

type StaffFormData = {
    phone: string;
    email: string;
};

const Stafflist = ({ centerStaff, forceUpdate }: Props) => {
    const [form] = Form.useForm();

    const [modalVisibility, setModalVisibility] = useState(false);
    const [staffDetail, setStaffDetail] = useState<CenterStaffModel>();

    const columns: ColumnsType<CenterStaffModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            align: 'center',
            key: 'dob',
            render: (dob: dayjs.Dayjs) => <>{dob ? dob.format('DD-MM-YYYY') : '-'}</>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            align: 'center',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Chức vụ',
            align: 'center',
            dataIndex: 'isManager',
            key: 'isManager',
            render: (isManager: boolean) => <div className="font-bold">{isManager ? 'Quản lý' : 'Nhân viên'}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            render: (status: boolean) =>
                status ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Tạm nghỉ</Tag>,
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'action',
            align: 'center',
            // render: (_, record) =>
            //     record.isManager ? (
            //         ''
            //     ) : !record.status ? (
            //         <div
            //             className="text-ws-red cursor-pointer"
            //             onClick={() =>
            //                 activateStaff(record.id).then((res) => {
            //                     forceUpdate();
            //                     message.success('Cập nhật trạng thái nhân viên thành công.');
            //                 })
            //             }
            //         >
            //             Activate
            //         </div>
            //     ) : (
            //         <div
            //             className="text-ws-red cursor-pointer"
            //             onClick={() =>
            //                 deactivateStaff(record.id).then((res) => {
            //                     forceUpdate();
            //                     message.success('Cập nhật trạng thái nhân viên thành công.');
            //                 })
            //             }
            //         >
            //             Deactivate
            //         </div>
            //     ),
            render(_, record) {
                return (
                    <div className="text-primary cursor-pointer" onClick={() => setStaffDetail(record)}>
                        Xem chi tiết
                    </div>
                );
            },
        },
    ];

    const onFinish = (values: StaffFormData) => {
        assignStaff(values.email, values.phone).then((res) => console.log(res));
    };

    const handleCancel = () => {
        setModalVisibility(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="staff__list--wrapper my-5 mt-2">
                <div className="staff__list">
                    <Button className="float-right mb-4" type="primary" onClick={() => setModalVisibility(true)}>
                        Thêm nhân viên
                    </Button>
                    <Table columns={columns} dataSource={centerStaff} loading={centerStaff == null} />
                </div>
            </div>
            <Modal
                width={400}
                title="Thêm nhân viên mới"
                open={modalVisibility}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={
                    <>
                        <Button key="key" onClick={handleCancel} danger className="bg-transparent">
                            Hủy
                        </Button>
                        <Button key="next" type="primary" htmlType="submit" onClick={() => form.submit()}>
                            Xác nhận
                        </Button>
                    </>
                }
            >
                <Form
                    form={form}
                    name="createPromotion"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    {
                        <div className="columns-1">
                            <Form.Item
                                label="Số điện thoại nhân viên"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại nhân viên' }]}
                                validateTrigger={'onBlur'}
                            >
                                <Input type="text" title="Số điện thoại" placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                label="Email nhân viên"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email nhân viên' }]}
                                validateTrigger={'onBlur'}
                            >
                                <Input type="text" title="Email" placeholder="Nhập email" />
                            </Form.Item>
                        </div>
                    }
                    {/* {step === 1 && (
                        <div className="columns-1 mt-3 flex flex-col items-center ">
                            <div className="header text-xl my-2 font-bold text-center">Nhập mã OTP để xác nhận</div>
                            <div className="header text-center mt-1 mb-4">
                                Một mã OTP đã được gửi đến email nhân viên ({formData?.email})
                            </div>
                            <div className="h-10 w-64 flex justify-center mb-4">
                                <OtpInput value={otp} valueLength={4} onChange={onOtpChange} />
                            </div>
                        </div>
                    )} */}
                </Form>
            </Modal>
            <Modal
                width={400}
                title={
                    <div className="flex gap-4">
                        <div>Chi tiết nhân viên</div>
                        {staffDetail?.status ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Tạm nghỉ</Tag>}
                    </div>
                }
                open={staffDetail != undefined}
                onCancel={() => setStaffDetail(undefined)}
                destroyOnClose={true}
                footer={
                    <>
                        <Button
                            key="key"
                            type="default"
                            onClick={() => setStaffDetail(undefined)}
                            className="bg-transparent"
                        >
                            Đóng
                        </Button>
                        {staffDetail &&
                            (staffDetail.isManager ? (
                                ''
                            ) : !staffDetail.status ? (
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        activateStaff(staffDetail.id).then((res) => {
                                            setStaffDetail(undefined);
                                            forceUpdate();
                                            message.success('Cập nhật trạng thái nhân viên thành công.');
                                        })
                                    }
                                >
                                    Activate
                                </Button>
                            ) : (
                                <Button
                                    className="bg-ws-red text-white"
                                    danger
                                    onClick={() =>
                                        deactivateStaff(staffDetail.id).then((res) => {
                                            setStaffDetail(undefined);
                                            forceUpdate();
                                            message.success('Cập nhật trạng thái nhân viên thành công.');
                                        })
                                    }
                                >
                                    <div className="text-white">Deactivate</div>
                                </Button>
                            ))}
                    </>
                }
            >
                <div className="flex flex-col gap-2 mt-4">
                    <div>
                        Họ và tên: <span className="font-bold">{staffDetail?.fullname}</span>
                    </div>
                    {staffDetail?.dob && (
                        <div>
                            Ngày tháng năm sinh:{' '}
                            <span className="font-bold">{staffDetail.dob.format('DD-MM-YYYY')}</span>
                        </div>
                    )}
                    {staffDetail?.phone && (
                        <div>
                            Số điện thoại: <span className="font-bold">{staffDetail?.phone}</span>
                        </div>
                    )}
                    {staffDetail?.email && (
                        <div>
                            Email: <span className="font-bold">{staffDetail?.email}</span>
                        </div>
                    )}
                    {staffDetail?.email && (
                        <div>
                            Vị trí làm việc:{' '}
                            <span className="font-bold">
                                {staffDetail?.isManager ? 'Quản lý trung tâm' : 'Nhân viên'}
                            </span>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Stafflist;
