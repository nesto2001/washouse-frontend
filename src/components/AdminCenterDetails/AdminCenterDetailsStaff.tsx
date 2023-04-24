import React from 'react';
import { AdminCenterStaffModel } from '../../models/Admin/AdminCenterDetails/AdminCenterStaffModel';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import Table, { ColumnsType } from 'antd/es/table';

type Props = {
    centerStaffs: AdminCenterStaffModel[];
};

const AdminCenterDetailsStaff = ({ centerStaffs }: Props) => {
    const columns: ColumnsType<AdminCenterStaffModel> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullName',
            key: 'fullName',
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
    ];
    return (
        <div className="pt-3">
            <Table columns={columns} dataSource={centerStaffs} />
        </div>
    );
};

export default AdminCenterDetailsStaff;
