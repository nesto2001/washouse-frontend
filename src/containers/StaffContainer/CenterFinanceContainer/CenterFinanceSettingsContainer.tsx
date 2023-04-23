import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { Avatar, ButtonProps, List, Modal, Switch } from 'antd';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import Wallet from '../../../assets/images/wallet.png';

type Props = {};

interface SettingsType {
    thumbnail: string;
    title: string;
    description: string;
}

const settings: SettingsType[] = [
    {
        title: 'Thanh toán trực tuyến',
        description: 'Bật thanh toán trực tuyến để cho phép khách hàng thanh toán bằng Ví Washouse.',
        thumbnail: Wallet,
    },
];

const CenterFinanceSettingsContainer = (props: Props) => {
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popupLoading, setPopupLoading] = useState<boolean>(false);
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        setIsLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
                setIsLoading(false);
                setSwitchOn(res.hasOnlinePayment ?? false);
            })
            .catch();
    }, []);

    const handleDeactivate = () => {
        setPopupLoading(true);
    };
    const handleCancel = () => {
        setSwitchOn(switchOn);
    };

    const cancelProps: ButtonProps = { style: { background: 'white' } };

    const handleSwitchToggle = () => {
        setSwitchOn(!switchOn);
        const content = {
            title: '',
            content: (
                <>
                    Khách hàng sẽ không thể đặt dịch vụ trong khi trung tâm bạn tạm ngưng hoạt động. Bạn chắc chắn muốn
                    bật tạm nghỉ chứ?
                </>
            ),
            icon: ' ',
            okText: 'Tiếp tục',
            cancelText: 'Hủy',
            maskClosable: true,
            onOk: handleDeactivate,
            onCancel: handleCancel,
            cancelButtonProps: cancelProps,
            confirmLoading: popupLoading,
        };
        modal.confirm(content);
    };

    if (isLoading) {
        return <OthersSpin />;
    }

    if (!myCenter) {
        return <ErrorScreen />;
    }

    return (
        <>
            {contextHolder}
            <List
                className="settings-list text-base mb-3"
                itemLayout="horizontal"
                dataSource={settings}
                renderItem={(item) => (
                    <List.Item actions={[<Switch checked={switchOn} onChange={handleSwitchToggle} />]}>
                        <List.Item.Meta
                            avatar={<Avatar size={50} src={item.thumbnail} />}
                            title={<div className="text-base font-medium">{item.title}</div>}
                            description={<div className="text-sm">{item.description}</div>}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default CenterFinanceSettingsContainer;
