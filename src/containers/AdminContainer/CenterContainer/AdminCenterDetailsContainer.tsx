import React, { useState, useEffect } from 'react';
import { EllipsisOutlined, StopOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import { getCenter } from '../../../repositories/CenterRepository';
import { getCenterDetails } from '../../../repositories/AdminRepository';
import { AdminCenterDetailsModel } from '../../../models/Admin/AdminCenterDetails/AdminCenterDetailsModel';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import AdminCenterDetailsBasics from '../../../components/AdminCenterDetails/AdminCenterDetailsBasics';
import AdminCenterDetailsService from '../../../components/AdminCenterDetails/AdminCenterDetailsService';
import AdminCenterDetailsStaff from '../../../components/AdminCenterDetails/AdminCenterDetailsStaff';
import AdminCenterDetailsFeedback from '../../../components/AdminCenterDetails/AdminCenterDetailsFeedback';
import { Paging } from '../../../types/Common/Pagination';
import { Button, Dropdown, MenuProps, Result, Tabs, TabsProps } from 'antd';

type Props = {};

const AdminCenterDetailsContainer = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('basics');
    const [centerDetails, setCenterDetails] = useState<AdminCenterDetailsModel>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        if (id && parseInt(id) !== 0) {
            getCenterDetails(parseInt(id))
                .then((res) => {
                    setCenterDetails(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    if (isLoading) {
        return <OthersSpin />;
    }

    if (isError || !centerDetails) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, không thể tìm thấy trang bạn muốn truy cập"
                extra={
                    <Button type="primary" href="/admin/dashboard">
                        Về trang chủ
                    </Button>
                }
            />
        );
    }

    const onTabChange = (key: string) => {
        setActiveTab(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'basics',
            label: `Thông tin cơ bản`,
            children: <AdminCenterDetailsBasics centerDetails={centerDetails.center} />,
        },
        {
            key: 'services',
            label: `Dịch vụ`,
            children: (
                <AdminCenterDetailsService
                    centerServices={centerDetails.services}
                    paging={paging}
                    updatePage={(page) => setCurrentPage(page)}
                />
            ),
        },
        {
            key: 'staffs',
            label: `Nhân viên`,
            children: <AdminCenterDetailsStaff centerStaffs={centerDetails.staffs} />,
        },

        {
            key: 'feedbacks',
            label: `Đánh giá`,
            children: <AdminCenterDetailsFeedback centerFeedbacks={centerDetails.feedbacks} />,
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            label: (
                <div className={`ml-1 text-left`}>
                    {centerDetails.center.status.toLowerCase() !== 'suspended' ? 'Đình chỉ hoạt động' : 'Hủy đình chỉ'}
                </div>
            ),
            key: 'suspend',
            danger: centerDetails.center.status.toLowerCase() !== 'suspended' ? true : false,
            icon: <StopOutlined />,
            className: `${
                centerDetails.center.status.toLowerCase() !== 'suspended'
                    ? ''
                    : 'hover:!bg-ws-green hover:!text-white !text-green'
            }`,
        },
    ];

    return (
        <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
            <div className="flex justify-between pt-4 px-6">
                <div className="provider__page--title font-semibold text-2xl">Chi tiết trung tâm</div>
                <div className="relative">
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                        placement="bottomRight"
                        getPopupContainer={(trigger) => {
                            return trigger.parentNode as HTMLElement;
                        }}
                    >
                        <Button type="default" style={{ background: 'white', padding: '0 4px' }}>
                            <EllipsisOutlined style={{ fontSize: 24, fontWeight: 'bold' }} />
                        </Button>
                    </Dropdown>
                </div>
            </div>
            {/* <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base"></div> */}
            <div className="provider__page--content px-6 mt-8">
                <div className="provider__services--wrapper">
                    <Tabs items={items} activeKey={activeTab} onChange={onTabChange} />
                </div>
            </div>
        </div>
    );
};

export default AdminCenterDetailsContainer;
