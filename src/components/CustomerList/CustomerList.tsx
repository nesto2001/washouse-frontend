import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { formatDateString } from '../../utils/TimeUtils';

type Props = {};

type CustomerType = {
    id: number;
    fullname: string;
    phone: string;
    address: string;
    email: string;
    avatar?: string;
    dob?: string;
};

const customers: CustomerType[] = [
    {
        id: 2,
        fullname: 'Đoàn Kim Trọng',
        phone: '0328104356',
        address: '123 Phạm Văn Đồng, Phường 3, Quận Gò Vấp, TP. HCM',
        email: 'tester01@gmail.com',
        avatar: 'abc.png',
        dob: '12/05/2001',
    },
    {
        id: 3,
        fullname: 'Đoàn Huy Tân',
        phone: '0328171821',
        address: '159 Lý Chính Thắng, Phường 14, Quận 3, TP. HCM',
        email: 'huytan@gmail.com',
        avatar: 'abcdef.png',
        dob: '12/12/2001',
    },
    {
        id: 4,
        fullname: '0123456788',
        phone: '0123456788',
        address: '23 Bình Tây, Phường 3, Quận 6, TP. HCM',
        email: '',
    },
];

const columns: ColumnsType<CustomerType> = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Ảnh đại diện',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Sinh nhật',
        dataIndex: 'dob',
        key: 'dob',
        render: (date: string) => (date ? formatDateString(date) : ''),
    },
];

const CustomerList = (props: Props) => {
    return (
        <div className="customer__list--wrapper my-5 mt-2">
            <div className="customer__list">
                <Table columns={columns} dataSource={customers} />
            </div>
        </div>
    );
};

export default CustomerList;
