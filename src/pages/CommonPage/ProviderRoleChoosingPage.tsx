import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffImage from '../../assets/images/staff.png';
import ManagerImage from '../../assets/images/manager.png';
type Props = {};

const ProviderRoleChoosingPage = () => {
    const [option, setOption] = useState(0);
    const [modalVisibility, setModalVisibility] = useState(false);
    const navigate = useNavigate();
    const handleNext = () => {
        if (option === 1) {
            navigate('/provider/registration');
        } else {
            setModalVisibility(true);
        }
    };
    return (
        <Space align="center" direction="vertical" className="w-full h-full justify-center" size={40}>
            <div className="text-3xl font-bold">Vui lòng chọn vai trò của bạn</div>

            <Space align="center" direction="horizontal" className="w-full h-full justify-center" size={36}>
                <Card
                    size="default"
                    className={`w-96 cursor-pointer hover:shadow-[0_0_14px_2px] hover:shadow-primary/70 transition-all ${
                        option === 1 ? 'shadow-[0_0_14px_2px] shadow-primary/70' : ''
                    }`}
                    onClick={() => {
                        if (option !== 1) {
                            setOption(1);
                        } else {
                            setOption(0);
                        }
                    }}
                >
                    <div className="flex flex-col gap-10">
                        <img src={ManagerImage} />
                        <div className="text-center font-bold text-2xl">Quản lý trung tâm</div>
                    </div>
                </Card>
                <Card
                    size="default"
                    className={`w-96 cursor-pointer hover:shadow-[0_0_14px_2px] hover:shadow-primary/70 transition-all ${
                        option === 2 ? 'shadow-[0_0_14px_2px] shadow-primary/70' : ''
                    }`}
                    onClick={() => {
                        if (option !== 2) {
                            setOption(2);
                        } else {
                            setOption(0);
                        }
                    }}
                >
                    <div className="flex flex-col gap-10">
                        <img src={StaffImage} />
                        <div className="text-center font-bold text-2xl">Nhân viên trung tâm</div>
                    </div>
                </Card>
            </Space>
            <Button
                type="primary"
                disabled={!(option === 1 || option === 2)}
                size="large"
                shape="round"
                onClick={handleNext}
            >
                <div className="flex gap-3">
                    Tiếp tục
                    <ArrowRightOutlined />
                </div>
            </Button>
            <Modal
                width={400}
                open={modalVisibility}
                onCancel={() => setModalVisibility(false)}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            //TODO: handle redirect staff
                            navigate('/');
                        }}
                    >
                        Đồng ý
                    </Button>,
                ]}
            >
                Bạn vui lòng đợi quản lý thêm vào
            </Modal>
        </Space>
    );
};

export default ProviderRoleChoosingPage;
