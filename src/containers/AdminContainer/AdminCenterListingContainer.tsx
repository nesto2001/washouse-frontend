import { Button, Tabs, TabsProps } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CenterList from '../../components/CenterList/CenterList';
import { CenterModel } from '../../models/Center/CenterModel';
import { getCenterRequests } from '../../repositories/RequestRepository';

type Props = {};

const AdminCenterListingContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [centerRequests, setCenterRequests] = useState<CenterModel[]>([]);
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');

    useEffect(() => {
        const fetchData = async () => {
            return await getCenterRequests({});
        };
        fetchData().then((res) => {
            setCenterRequests(res);
        });
    }, []);

    const centerTab: TabsProps['items'] = [
        {
            key: '1',
            label: `Tất cả`,
            children: 'Tất cả',
        },
        {
            key: '2',
            label: `Đang hoạt động`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Chờ duyệt`,
            children: <CenterList centerRequests={centerRequests} />,
        },
        {
            key: '4',
            label: `Tạm ngưng`,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '5',
            label: `Vi phạm`,
            children: `Content of Tab Pane 3`,
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
        </div>
    );
};

export default AdminCenterListingContainer;
