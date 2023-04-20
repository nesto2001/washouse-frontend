import * as React from 'react';
import { useState, useEffect } from 'react';
import Sleep from '../../../assets/images/sleep.png';
import { Avatar, List, Modal, Popconfirm, Switch } from 'antd';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import { useNavigate } from 'react-router-dom';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';

type Props = {};

interface SettingsType {
    thumbnail: string;
    title: string;
    description: string;
}

const settings: SettingsType[] = [
    {
        title: 'Chế độ Tạm nghỉ',
        description:
            'Kích hoạt Chế độ Tạm nghỉ để ngăn khách hàng đặt đơn hàng mới. Những đơn hàng đang tiến hành vẫn phải được xử lý.',
        thumbnail: Sleep,
    },
];

const CenterSettingsContainer = (props: Props) => {
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popupLoading, setPopupLoading] = useState<boolean>(false);
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        setIsLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
                setIsLoading(false);
                setSwitchOn(
                    res.status.toLowerCase() === 'active'
                        ? false
                        : res.status.toLowerCase() === 'inactive'
                        ? true
                        : true,
                );
            })
            .catch();
    }, []);

    const handleDeactivate = () => {
        setPopupLoading(true);
    };
    const handleCancel = () => {
        setSwitchOn(switchOn);
    };

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
                className="settings-list text-base"
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

export default CenterSettingsContainer;
