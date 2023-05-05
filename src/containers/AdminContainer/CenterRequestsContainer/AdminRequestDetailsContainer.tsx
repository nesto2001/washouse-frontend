import { EllipsisOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Result, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminCenterDetailsBasics from '../../../components/AdminCenterDetails/AdminCenterDetailsBasics';
import AdminCenterDetailsFeedback from '../../../components/AdminCenterDetails/AdminCenterDetailsFeedback';
import AdminCenterDetailsService from '../../../components/AdminCenterDetails/AdminCenterDetailsService';
import AdminCenterDetailsStaff from '../../../components/AdminCenterDetails/AdminCenterDetailsStaff';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import { AdminCenterDetailsModel } from '../../../models/Admin/AdminCenterDetails/AdminCenterDetailsModel';
import { getCenterDetails, getCenterRequestDetails } from '../../../repositories/AdminRepository';
import { Paging } from '../../../types/Common/Pagination';
import { AdminCenterModel } from '../../../models/Admin/AdminCenterModel';

type Props = {
    center: AdminCenterModel;
    type: 'create' | 'update';
};

const AdminRequestDetailsContainer = ({ center, type }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('basics');
    const [centerDetails, setCenterDetails] = useState<AdminCenterDetailsModel>();

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        if (type === 'create') {
            getCenterDetails(center.id)
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
        } else if (type === 'update') {
            getCenterRequestDetails(center.id)
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
            <Result status="404" title="404" subTitle="Xin lỗi, không thể tìm thấy thông tin trung tâm bạn muốn xem" />
        );
    }

    return (
        <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
            <div className="provider__page--content px-6">
                <div className="provider__services--wrapper">
                    <AdminCenterDetailsBasics centerDetails={centerDetails.center} request />
                </div>
            </div>
        </div>
    );
};

export default AdminRequestDetailsContainer;
