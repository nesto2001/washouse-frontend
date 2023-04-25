import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceCategoryDetailModel } from '../../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories } from '../../../repositories/ServiceCategoryRepository';

type Props = {};

const AdminServicesContainer = (props: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const [services, setServices] = useState<ServiceCategoryDetailModel[]>();
    const [activeKey, setActiveKey] = useState<string>(location.state?.keyTab ?? '1');
    const columns: ColumnsType<ServiceCategoryDetailModel> = [
        {
            title: 'Mã',
            dataIndex: 'categoryId',
            key: 'categoryId',
            align: 'center',
            render: (_, text, index) => <strong>{index + 1}</strong>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            width: 200,
            render(_, record) {
                return <img className="w-full h-24 object-cover rounded-lg" src={record.image}></img>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render(_, record) {
                return <div className=""> {record.categoryName}</div>;
            },
        },
        {
            title: 'Thao tác',
            align: 'center',
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

    return (
        <div className="provider__services--filter">
            <Link to={'/admin/posts/create'}>
                <Button className="float-right mb-4" type="primary">
                    Thêm phân loại
                </Button>
            </Link>
            <Table dataSource={services} columns={columns} loading={services == null}></Table>
        </div>
    );
};

export default AdminServicesContainer;
