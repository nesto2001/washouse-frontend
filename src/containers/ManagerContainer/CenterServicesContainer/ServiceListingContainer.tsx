import { Button, Col, Form, Input, Row, Select, Space, Tabs, TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useState, useEffect } from 'react';
import ServiceList from '../../../components/ServiceList/ServiceList';
import { getCategoryOptions } from '../../../repositories/ServiceCategoryRepository';
import { CategoryOptionsModel } from '../../../models/Category/CategoryOptionsModel';
import { useNavigate } from 'react-router-dom';
import { ManagerServiceItem } from '../../../models/Manager/ManagerServiceItem';
import { getManagerServices } from '../../../repositories/StaffRepository';
import { Paging } from '../../../types/Common/Pagination';

type Props = {};

const searchType = [
    { value: 'name', label: 'Tên dịch vụ' },
    { value: 'id', label: 'Mã dịch vụ' },
];

const searchPriceType = [
    { value: null, label: 'Chọn định lượng' },
    { value: true, label: 'Khối lượng' },
    { value: false, label: 'Số lượng' },
];

export type ServiceSearchParamsData = {
    searchString: string | null;
    searchType: string | null;
    categoryId: number | null;
    priceRange: {
        min: number;
        max: number;
    } | null;
    priceType: boolean | null;
    page: number;
};

const ServiceListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [serviceList, setServiceList] = useState<ManagerServiceItem[]>([]);
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<ServiceSearchParamsData>({
        searchString: '',
        searchType: 'name',
        categoryId: 0,
        priceRange: { min: 0, max: 0 },
        priceType: null,
        page: 1,
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [categoryOptions, setCategoryOptions] = useState<CategoryOptionsModel[]>([
        { id: 0, name: 'Chọn loại dịch vụ' },
    ]);

    useEffect(() => {
        getManagerServices({
            ...searchParams,
            page: currentPage,
        }).then((res) => {
            setServiceList(res.items);
            setPaging({
                itemsPerPage: res.itemsPerPage,
                pageNumber: res.pageNumber,
                totalItems: res.totalItems,
                totalPages: res.totalPages,
            });
        });
    }, [searchParams, currentPage]);

    const serviceTab: TabsProps['items'] = [
        {
            key: 'All',
            label: `Tất cả`,
        },
        {
            key: 'active',
            label: `Đang hoạt động`,
        },
        {
            key: 'inactive',
            label: `Tạm ngưng`,
        },
        {
            key: 'suspended',
            label: `Vi phạm`,
        },
        {
            key: 'hidden',
            label: `Đã ẩn`,
        },
    ];

    const onChange = (key: string) => {
        if (key !== 'All') {
            setSearchParams((prev) => ({ ...prev, status: key }));
        }
    };

    useEffect(() => {
        getCategoryOptions().then((res) => {
            setCategoryOptions((prev) => [...prev, ...res]);
        });
    }, []);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      .ant-tabs-nav-list {
          display: flex;
          align-items: center;
          justify-content: start !important;
          width: 100%;
      }
      .ant-tabs-tab {
          width: 50%;
          justify-content: center;
      }
      ant-tabs-nav{
          display: flex;
      }    
      .ant-tabs .ant-tabs-tab {
          flex-grow: 0;
          margin-right: 0px;
          margin-left: 0px !important;
          padding: 12px 20px;
          width: unset;
          text-align: center;
          
      }
      .ant-tabs .ant-tabs-tab:first-of-type {
          margin-left: 0px !important;
      }
      `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleAddService = () => {
        navigate('/provider/services/create');
    };

    return (
        <>
            <div className="provider__services--filter">
                <Form
                    form={form}
                    name="service"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 1200 }}
                    initialValues={{
                        category: { value: 0, label: 'Chọn phân loại' },
                        price_type: searchParams.priceType,
                        price_range: {
                            min: searchParams.priceRange?.min ?? 0 > 0 ? searchParams.priceRange?.min : '',
                            max: searchParams.priceRange?.max ?? 0 > 0 ? searchParams.priceRange?.max : '',
                        },
                    }}
                    autoComplete="off"
                    size="large"
                >
                    <div className="flex flex-wrap justify-between">
                        <Form.Item className="basis-1/2 mb-1">
                            <Space.Compact size="large">
                                <Form.Item name={['search', 'type']} style={{ width: 130 }}>
                                    <Select defaultValue="name" options={searchType} />
                                </Form.Item>
                                <Form.Item
                                    name={['search', 'string']}
                                    rules={[{ min: 2, message: 'Vui lòng nhập tối thiểu 2 ký tự' }]}
                                    style={{ width: 260, flexGrow: 1 }}
                                >
                                    <Input
                                        defaultValue=""
                                        placeholder="Vui lòng nhập tối thiểu 2 ký tự"
                                        onChange={(e) => {
                                            console.log(categoryOptions);
                                            setSearchParams((prevData) => ({
                                                ...prevData,
                                                searchString: e.target.value ?? null,
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item className="basis-1/2" label="Phân loại" name="category">
                            <Select
                                options={categoryOptions.map((option) => {
                                    return {
                                        value: option.id,
                                        label: option.name,
                                    };
                                })}
                            ></Select>
                        </Form.Item>
                        <Form.Item className="basis-1/2 mb-1" label="Định lượng" name="price_type">
                            <Select options={searchPriceType} style={{ width: 308 }}></Select>
                        </Form.Item>
                        <Form.Item
                            className="basis-1/2 mb-1"
                            label="Khoảng giá"
                            name="price"
                            dependencies={['price_range']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const { min, max } = getFieldValue('price_range');
                                        if (max && min && max <= min) {
                                            return Promise.reject(new Error('Giá tối đa phải lớn hơn giá tối thiểu'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Row>
                                <Col span={10}>
                                    <Form.Item name={['price_range', 'min']}>
                                        <Input type="number" addonAfter="₫" placeholder="Tối thiểu" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <div className="h-[2px] bg-wh-gray mx-5 my-5"></div>
                                </Col>
                                <Col span={10}>
                                    <Form.Item name={['price_range', 'max']}>
                                        <Input type="number" addonAfter="₫" placeholder="Tối đa" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div className="provider__services mt-12 mb-72">
                <Tabs
                    defaultActiveKey="1"
                    items={serviceTab}
                    onChange={onChange}
                    tabBarExtraContent={
                        <Button type="primary" onClick={handleAddService}>
                            Thêm dịch vụ
                        </Button>
                    }
                />
                <ServiceList serviceList={serviceList} paging={paging} updatePage={(page) => setCurrentPage(page)} />
            </div>
        </>
    );
};
export default ServiceListingContainer;
