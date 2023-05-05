import { Button, Empty, Modal, Pagination, PaginationProps, Tabs, TabsProps, message } from 'antd';
import { useEffect, useState } from 'react';
import CenterList from '../../../components/CenterList/CenterList';
import { AdminCenterModel } from '../../../models/Admin/AdminCenterModel';
import { getCenterRequestList } from '../../../repositories/AdminRepository';
import {
    approveCenter,
    approveCenterUpdate,
    rejectCenter,
    rejectCenterUpdate,
} from '../../../repositories/RequestRepository';
import { Paging } from '../../../types/Common/Pagination';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import AdminRequestDetailsContainer from './AdminRequestDetailsContainer';

const AdminCenterUpdateRequestsContainer = () => {
    const [centerRequests, setCenterRequests] = useState<AdminCenterModel[]>([]);
    const [center, setCenter] = useState<AdminCenterModel>();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    const [isLoading, setIsLoading] = useState(true);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [pageNum, setPageNum] = useState<number>(1);
    const openDetail = (center: AdminCenterModel) => {
        setCenter(center);
        setModalVisibility(true);
    };

    const closeDetail = () => {
        setCenter(undefined);
        setModalVisibility(false);
    };

    const handleApprove = (id: number) => {
        approveCenterUpdate(id)
            .then((res) => {
                if (res) {
                    message.success(`Đã chấp thuận yêu cầu duyệt trung tâm`);
                }
            })
            .catch((error) => {
                if (error) {
                    message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                }
            })
            .finally(() => setModalVisibility(false));
    };

    const handleReject = (id: number) => {
        rejectCenterUpdate(id)
            .then((res) => {
                if (res) {
                    message.success(`Đã từ chối yêu cầu duyệt trung tâm`);
                }
            })
            .catch((error) => {
                if (error) {
                    message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                }
            })
            .finally(() => setModalVisibility(false));
    };

    useEffect(() => {
        setIsLoading(true);
        setPaging({ itemsPerPage: 10, pageNumber: 1 });
        setCenterRequests([]);
        if (!modalVisibility) {
            switch (activeTab.toLowerCase()) {
                case 'all':
                    getCenterRequestList({ page: pageNum })
                        .then((res) => {
                            setCenterRequests(res.items);
                            setPaging({
                                itemsPerPage: res.itemsPerPage,
                                pageNumber: res.pageNumber,
                                totalItems: res.totalItems,
                                totalPages: res.totalPages,
                            });
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                    break;
                case 'pending':
                    getCenterRequestList({ page: pageNum, status: true })
                        .then((res) => {
                            setCenterRequests(res.items);
                            setPaging({
                                itemsPerPage: res.itemsPerPage,
                                pageNumber: res.pageNumber,
                                totalItems: res.totalItems,
                                totalPages: res.totalPages,
                            });
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                    break;
                case 'reviewed':
                    getCenterRequestList({ page: pageNum, status: false })
                        .then((res) => {
                            setCenterRequests(res.items);
                            setPaging({
                                itemsPerPage: res.itemsPerPage,
                                pageNumber: res.pageNumber,
                                totalItems: res.totalItems,
                                totalPages: res.totalPages,
                            });
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                    break;
            }
        }
    }, [modalVisibility, pageNum]);

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `Tất cả`,
        },
        {
            key: 'pending',
            label: `Đang chờ`,
        },
        {
            key: 'reviewed',
            label: `Đã duyệt`,
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        setPaging({ itemsPerPage: 10, pageNumber: 1 });
        setCenterRequests([]);
        switch (activeTab.toLowerCase()) {
            case 'all':
                getCenterRequestList({ page: pageNum })
                    .then((res) => {
                        setCenterRequests(res.items);
                        setPaging({
                            itemsPerPage: res.itemsPerPage,
                            pageNumber: res.pageNumber,
                            totalItems: res.totalItems,
                            totalPages: res.totalPages,
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                break;
            case 'pending':
                getCenterRequestList({ page: pageNum, status: true })
                    .then((res) => {
                        setCenterRequests(res.items);
                        setPaging({
                            itemsPerPage: res.itemsPerPage,
                            pageNumber: res.pageNumber,
                            totalItems: res.totalItems,
                            totalPages: res.totalPages,
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                break;
            case 'reviewed':
                getCenterRequestList({ page: pageNum, status: false })
                    .then((res) => {
                        setCenterRequests(res.items);
                        setPaging({
                            itemsPerPage: res.itemsPerPage,
                            pageNumber: res.pageNumber,
                            totalItems: res.totalItems,
                            totalPages: res.totalPages,
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                break;
        }
    }, [activeTab, pageNum]);

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <div>
            <Tabs items={items} defaultActiveKey={activeTab} onChange={onChange} />
            {!isLoading && centerRequests?.length > 0 ? (
                <>
                    <CenterList centerRequests={centerRequests} openDetail={openDetail} />
                    <Pagination
                        className="float-right mt-4 mb-10"
                        showTotal={((total) => `Có tất cả ${total} trung tâm`) as PaginationProps['showTotal']}
                        defaultCurrent={1}
                        current={pageNum ?? paging?.pageNumber ?? 1}
                        total={paging?.totalItems}
                        onChange={(page) => {
                            setPageNum(page);
                        }}
                        pageSize={paging?.itemsPerPage}
                        showSizeChanger={false}
                    />
                </>
            ) : isLoading ? (
                <OthersSpin />
            ) : (
                <Empty
                    className="mb-10"
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                    description={<span className="text-xl font-medium text-sub-gray">Chưa có trung tâm nào</span>}
                ></Empty>
            )}
            {center && (
                <Modal
                    width={850}
                    title="Thông tin trung tâm"
                    open={modalVisibility}
                    onCancel={closeDetail}
                    footer={[
                        <Button key="key" onClick={() => handleReject(center.id)} danger className="bg-transparent">
                            Từ chối
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => handleApprove(center.id)}>
                            Chấp thuận
                        </Button>,
                    ]}
                >
                    <AdminRequestDetailsContainer center={center} type="update" />
                    {/* <img src={center.thumbnail} alt="" />
                    <div className="centerrq__item--content ml-4 w-full basis-3/5 flex flex-col justify-start">
                        <div className="centerrq__item--title text-primary font-bold text-lg">{center.title}</div>
                        <div className="centerrq__item--address flex gap-2 text-base">
                            {center.address}, TP. Hồ Chí Minh
                        </div>
                        <div className="flex items-center">
                            <div className="centerrq__item--centerrqId text-base font-medium text-sub-gray">
                                ID: {center.id}
                            </div>
                            <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
                            <div className="centerrq__item--category text-base font-medium text-sub-gray">
                                {center.phone}
                            </div>
                        </div>
                        <div className="centerrq__item--address flex gap-2 text-base"></div>
                    </div> */}
                </Modal>
            )}
        </div>
    );
};

export default AdminCenterUpdateRequestsContainer;
