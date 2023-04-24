import { Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { AccountModel } from '../../../models/Account/AccountModel';
import { getAllAccounts } from '../../../repositories/AccountRepository';
import { ColumnsType } from 'antd/es/table';
import { FaPowerOff } from 'react-icons/fa';

type Props = {};

const columns: ColumnsType<AccountModel> = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        align: 'center',
        render: (_, text, index) => <strong>{index + 1}</strong>,
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        key: 'fullName',
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
        title: 'Ngày sinh',
        dataIndex: 'dob',
        key: 'dob',
        width: 120,
        render: (_, record) => {
            return <div className="">{record.dob?.format('DD-MM-YYYY')}</div>;
        },
    },
    {
        title: 'Vai trò',
        dataIndex: 'isAdmin',
        key: 'role',
        align: 'center',
        render: (value) => {
            return <div className="">{value ? <div className="font-bold">Quản trị viên</div> : 'Người dùng'}</div>;
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (value: boolean) => {
            return <Tag color={value ? 'success' : 'error'}>{value ? 'Hoạt động' : 'Không hoạt động'}</Tag>;
        },
    },
    {
        title: 'Thao tác',
        dataIndex: '',
        key: 'action',
        align: 'center',
        render: (_, record) => {
            return !record.isAdmin ? (
                record.status ? (
                    <Tooltip title="Hủy kích hoạt" className="text-red hover:opacity-70 cursor-pointer text-center">
                        <FaPowerOff className="inline-block" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Kích hoạt" className="text-green hover:opacity-70 cursor-pointer text-center">
                        <FaPowerOff className="inline-block" />
                    </Tooltip>
                )
            ) : (
                <></>
            );
        },
    },
];

const AccountsContainer = (props: Props) => {
    const [accounts, setAccounts] = useState<AccountModel[]>();

    useEffect(() => {
        const fetchData = async () => {
            return await getAllAccounts();
        };
        fetchData().then((res) => {
            setAccounts(res);
        });
    }, []);

    return (
        <>
            <div className="provider__services--filter">
                <Table dataSource={accounts} columns={columns} loading={accounts == null}></Table>
            </div>
        </>
    );
};
export default AccountsContainer;
