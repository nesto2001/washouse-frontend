import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { AccountModel } from '../../../models/Account/AccountModel';
import { getAllAccounts } from '../../../repositories/AccountRepository';
import { ColumnsType } from 'antd/es/table';

type Props = {};

const columns: ColumnsType<AccountModel> = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
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
        title: 'Thao tác',
        dataIndex: '',
        key: 'x',
        render: (_, record) => {
            return record.status ? <a className="text-red">Deactivate</a> : <a className="text-primary">Activate</a>;
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
