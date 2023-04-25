import { Popconfirm, Table, Tag, Tooltip, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { AccountModel } from '../../../models/Account/AccountModel';
import { activateAccount, deactivateAccount, getAllAccounts } from '../../../repositories/AccountRepository';

const AccountsContainer = () => {
    const [accounts, setAccounts] = useState<AccountModel[]>();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
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
                        <Popconfirm
                            placement="topRight"
                            title="Vô hiệu hóa người dùng"
                            description="Xác nhận vô hiệu hóa người dùng này?"
                            cancelButtonProps={{ style: { background: 'white' } }}
                            okText="Vô hiệu hóa"
                            onConfirm={() => deactivate(record.id)}
                            okButtonProps={{ danger: true }}
                            cancelText="Hủy"
                        >
                            <Tooltip
                                title="Vô hiệu hóa"
                                className="text-red hover:opacity-70 cursor-pointer text-center"
                            >
                                <FaPowerOff className="inline-block" />
                            </Tooltip>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            placement="topRight"
                            title="Kích hoạt người dùng"
                            description="Xác nhận kích hoạt người dùng này?"
                            cancelButtonProps={{ style: { background: 'white' } }}
                            okText="Kích hoạt"
                            onConfirm={() => activate(record.id)}
                            cancelText="Hủy"
                        >
                            <Tooltip
                                title="Kích hoạt"
                                className="text-green hover:opacity-70 cursor-pointer text-center"
                            >
                                <FaPowerOff className="inline-block" />
                            </Tooltip>
                        </Popconfirm>
                    )
                ) : (
                    <></>
                );
            },
        },
    ];
    useEffect(() => {
        getAllAccounts().then((res) => {
            setAccounts(res);
        });
    }, [state]);

    const deactivate = (id: number) => {
        deactivateAccount(id)
            .then(() => {
                message.success('Cập nhật trạng thái thành công!');
            })
            .catch(() => {
                message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            })
            .finally(() => {
                forceUpdate();
            });
    };
    const activate = (id: number) => {
        activateAccount(id)
            .then(() => {
                message.success('Cập nhật trạng thái thành công!');
            })
            .catch(() => {
                message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            })
            .finally(() => {
                forceUpdate();
            });
    };
    return (
        <>
            <div className="provider__services--filter">
                <Table dataSource={accounts} columns={columns} loading={accounts == null}></Table>
            </div>
        </>
    );
};
export default AccountsContainer;
