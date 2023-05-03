import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { Avatar, ButtonProps, List, Modal, Switch, message } from 'antd';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import Wallet from '../../../assets/images/wallet.png';
import { activateWallet } from '../../../repositories/WalletRepository';

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
        setSwitchOn(true);
        message.error('Tồn tại số dư trong ví, không thể vô hiệu hóa thanh toán trực tuyến!');
        setPopupLoading(false);
    };

    const handleActivate = () => {
        setPopupLoading(true);
        setSwitchOn(true);
        activateWallet()
            .then((res) => {
                console.log(res);
                message.success('Kích hoạt thanh toán trực tuyến thành công');
                setPopupLoading(false);
            })
            .catch((err) => {
                message.error('Xảy ra lỗi trong lúc kích hoạt thanh toán trực tuyến, vui lòng thử lại sau!');
            });
    };

    const handleCancel = () => {
        setSwitchOn(switchOn);
    };

    const cancelProps: ButtonProps = { style: { background: 'white' } };

    const handleSwitchToggle = () => {
        setSwitchOn(!switchOn);
        const content = {
            title: switchOn ? 'Vô hiệu hóa thanh toán trực tuyến' : 'Kích hoạt thanh toán trực tuyến',
            content: switchOn ? (
                <>
                    Khách hàng sẽ không thể đặt thanh toán bằng ví Washouse nếu trung tâm vô hiệu hóa thanh toán trực
                    tuyên. Bạn chắc chắn muốn vô hiệu hóa thanh toán trực tuyến chứ?
                </>
            ) : (
                <>
                    Khách hàng sẽ có thể chọn thanh toán bằng ví Washouse nếu trung tâm kích hoạt thanh toán trực tuyến.
                    Bạn có chắc chắn muốn kích hoạt thanh toán trực tuyến chứ?
                </>
            ),
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            maskClosable: true,
            onOk: switchOn ? handleDeactivate : handleActivate,
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
