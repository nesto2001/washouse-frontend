import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { formatDateString } from '../../utils/TimeUtils';
import { CenterCustomerModel } from '../../models/Staff/CenterCustomerModel';
import dayjs from 'dayjs';
import { Empty } from 'antd';

type Props = { customers: CenterCustomerModel[]; isLoading: boolean };

// const customers: CenterCustomerModel[] = [
//     {
//         id: 2,
//         fullname: 'Đoàn Kim Trọng',
//         phone: '0328104356',
//         address: '123 Phạm Văn Đồng, Phường 3, Quận Gò Vấp, TP. HCM',
//         email: 'tester01@gmail.com',
//         avatar: 'abc.png',
//         dob: '12/05/2001',
//     },
//     {
//         id: 3,
//         fullname: 'Đoàn Huy Tân',
//         phone: '0328171821',
//         address: '159 Lý Chính Thắng, Phường 14, Quận 3, TP. HCM',
//         email: 'huytan@gmail.com',
//         avatar: 'abcdef.png',
//         dob: '12/12/2001',
//     },
//     {
//         id: 4,
//         fullname: '0123456788',
//         phone: '0123456788',
//         address: '23 Bình Tây, Phường 3, Quận 6, TP. HCM',
//         email: '',
//     },
// ];

// id: item.id,
// address: item.addressString,
// email: item.email,
// fullname: item.fullname,
// phone: item.phone,
// dob: item.dateOfBirth ?? '',
// gender: genderText,
const columns: ColumnsType<CenterCustomerModel> = [
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
        title: 'Tên khách hàng',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        align: 'center',
        key: 'gender',
    },
    {
        title: 'Sinh nhật',
        dataIndex: 'dob',
        key: 'dob',
        align: 'center',
        width: 120,
        render: (date: string) => (date ? dayjs(date, 'DD-MM-YYYY').format('DD-MM-YYYY') : '-'),
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
        width: 240,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        width: 300,
        render: (value) => {
            return value ?? '-';
        },
    },
];

const CustomerList = ({ customers, isLoading }: Props) => {
    return (
        <div className="customer__list--wrapper my-5 mt-2">
            <div className="customer__list">
                <Table
                    columns={columns}
                    dataSource={customers}
                    rowClassName="cursor-pointer"
                    loading={isLoading}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_DEFAULT}
                                imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                                description={
                                    <span className="text-xl font-medium text-sub-gray">Chưa có khách hàng nào</span>
                                }
                            ></Empty>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default CustomerList;
