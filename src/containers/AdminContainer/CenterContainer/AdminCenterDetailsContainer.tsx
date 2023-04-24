import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { getCenter } from '../../../repositories/CenterRepository';
import { getCenterDetails } from '../../../repositories/AdminRepository';
import { AdminCenterDetailsModel } from '../../../models/Admin/AdminCenterDetails/AdminCenterDetailsModel';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import { Button, Result, Tabs, TabsProps } from 'antd';
import AdminCenterDetailsBasics from '../../../components/AdminCenterDetails/AdminCenterDetailsBasics';
import AdminCenterDetailsService from '../../../components/AdminCenterDetails/AdminCenterDetailsService';
import AdminCenterDetailsStaff from '../../../components/AdminCenterDetails/AdminCenterDetailsStaff';
import AdminCenterDetailsFeedback from '../../../components/AdminCenterDetails/AdminCenterDetailsFeedback';
import { Paging } from '../../../types/Common/Pagination';

type Props = {};

const AdminCenterDetailsContainer = (props: Props) => {
    let { state } = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('basics');
    const [centerDetails, setCenterDetails] = useState<AdminCenterDetailsModel>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });

    const id = parseInt(state.id ?? 0);

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        if (id && id !== 0) {
            getCenterDetails(id)
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

    return (
        <div>
            <Tabs items={items} activeKey={activeTab} onChange={onTabChange} />
        </div>
    );
};

export default AdminCenterDetailsContainer;
