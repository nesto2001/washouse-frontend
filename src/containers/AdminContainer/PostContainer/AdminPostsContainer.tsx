import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ServiceCategoryDetailModel } from '../../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories } from '../../../repositories/ServiceCategoryRepository';

type Props = {};

const AdminPostsContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [services, setServices] = useState<ServiceCategoryDetailModel[]>();
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const columns: ColumnsType<ServiceCategoryDetailModel> = [
        {
            title: 'Mã',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render(_, record) {
                return <img className="w-40 h-24 object-cover" src={record.image}></img>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Thao tác',
            render(_, record) {
                return record.homeFlag ? (
                    <div className="cursor-pointer text-red">Hủy ghim dịch vụ</div>
                ) : (
                    <div className="cursor-pointer text-primary">Ghim dịch vụ</div>
                );
            },
        },
    ];

    useEffect(() => {
        console.log(activeKey);
        const fetchData = async () => {
            return await getServiceCategories();
        };
        fetchData().then((res) => {
            setServices(res);
        });
    }, [activeKey]);

    useEffect(() => {
        const keyTab = pathname === '/admin/centers/' ? '1' : '3';
        setActiveKey(keyTab);
    }, [pathname]);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    return (
        <div className="provider__services--filter">
            <Table dataSource={services} columns={columns} loading={services == null}></Table>
        </div>
    );
};

export default AdminPostsContainer;
