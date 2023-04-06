import { Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CenterModel } from '../../../models/Center/CenterModel';
import { getAllCenter } from '../../../repositories/CenterRepository';

type Props = {};

const AdminCentersContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [centers, setCenters] = useState<CenterModel[]>();
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const columns: ColumnsType<CenterModel> = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render(_, record) {
                return <img className="w-40 h-24 object-cover" src={record.thumbnail}></img>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    useEffect(() => {
        console.log(activeKey);
        const fetchData = async () => {
            return await getAllCenter({ sort: 'id' });
        };
        fetchData().then((res) => {
            setCenters(res);
        });
    }, [activeKey]);

    const centerTab: TabsProps['items'] = [
        {
            key: '1',
            label: `Tất cả`,
        },
        {
            key: '2',
            label: `Đang hoạt động`,
        },
        {
            key: '4',
            label: `Tạm ngưng`,
        },
        {
            key: '5',
            label: `Vi phạm`,
        },
    ];
    useEffect(() => {
        const keyTab = pathname === '/admin/centers/' ? '1' : '3';
        setActiveKey(keyTab);
    }, [pathname]);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    return (
        <div>
            <Tabs activeKey={activeKey} items={centerTab} onChange={onChange} />
            <Table dataSource={centers} columns={columns} loading={centers == null}></Table>
        </div>
    );
};

export default AdminCentersContainer;
