import { Button, Empty, Modal, Pagination, PaginationProps, message } from 'antd';
import { useEffect, useState } from 'react';
import CenterList from '../../../components/CenterList/CenterList';
import { AdminCenterModel } from '../../../models/Admin/AdminCenterModel';
import { getCenterList } from '../../../repositories/AdminRepository';
import { approveCenter, rejectCenter } from '../../../repositories/RequestRepository';
import { Paging } from '../../../types/Common/Pagination';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import AdminRequestDetailsContainer from './AdminRequestDetailsContainer';

const AdminCenterRequestsContainer = () => {
    const [centerRequests, setCenterRequests] = useState<AdminCenterModel[]>([]);
    const [center, setCenter] = useState<AdminCenterModel>();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [paging, setPaging] = useState<Paging>({
        itemsPerPage: 10,
        pageNumber: 1,
    });
    const [pageNum, setPageNum] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const openDetail = (center: AdminCenterModel) => {
        setCenter(center);
        setModalVisibility(true);
    };

    const closeDetail = () => {
        setCenter(undefined);
        setModalVisibility(false);
    };

    const handleApprove = (id: number) => {
        approveCenter(id)
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
        rejectCenter(id)
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
        if (!modalVisibility) {
            const fetchData = async () => {
                return await getCenterList({ page: pageNum, status: 'Pending' });
            };
            fetchData()
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
        }
    }, [modalVisibility, pageNum]);

    return (
        <div>
            {!isLoading && centerRequests?.length > 0 ? (
                <>
                    <CenterList centerRequests={centerRequests} openDetail={openDetail} />
                    <Pagination
                        className="float-right mt-4 mb-10"
                        showTotal={
                            ((total) => `Có tất cả ${total} trung tâm chờ kiểm duyệt`) as PaginationProps['showTotal']
                        }
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
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                    description={<span className="text-xl font-medium text-sub-gray">Chưa có trung tâm nào</span>}
                ></Empty>
            )}
            {center && (
                <Modal
                    width={1000}
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
                    <AdminRequestDetailsContainer center={center} type="create" />
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

export default AdminCenterRequestsContainer;
