import { Button, Empty, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import CenterList from '../../../components/CenterList/CenterList';
import { AdminCenterModel } from '../../../models/Admin/AdminCenterModel';
import { getCenterRequestList } from '../../../repositories/AdminRepository';
import { approveCenter, rejectCenter } from '../../../repositories/RequestRepository';

const AdminCenterUpdateRequestsContainer = () => {
    const [centerRequests, setCenterRequests] = useState<AdminCenterModel[]>([]);
    const [center, setCenter] = useState<AdminCenterModel>();
    const [modalVisibility, setModalVisibility] = useState(false);

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
                    message.success(`Đã chấp thuận yêu cầu duyệt trung tâm ${res.title}`);
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
                    message.success(`Đã từ chối yêu cầu duyệt trung tâm ${res.title}`);
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
        if (!modalVisibility) {
            getCenterRequestList({}).then((res) => {
                setCenterRequests(res);
            });
        }
    }, [modalVisibility]);

    return (
        <div>
            {centerRequests?.length > 0 ? (
                <CenterList centerRequests={centerRequests} openDetail={openDetail} />
            ) : (
                <Empty description="Không có trung tâm nào cần kiểm duyệt" className="mb-10 mt-5" />
            )}
            {center && (
                <Modal
                    width={600}
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
                    <img src={center.thumbnail} alt="" />
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
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminCenterUpdateRequestsContainer;